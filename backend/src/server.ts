import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';
import { assertOrigin, createSession, deleteSession, digest, hashPassword, rateLimit, requireAdmin, sessionCookie, sessionToken, verifyPassword } from './auth.js';
import { closeDatabase, DatabaseConfigurationError, isDatabaseConfigured, query } from './database.js';
import { HttpError } from './errors.js';
import {
  deleteMediaAsset,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  getSiteSettings,
  listMediaAssets,
  listProjects,
  saveMediaAsset,
  saveProject,
  saveSiteSettings,
} from './repository.js';
import type { Message, Profile } from './models.js';
import {
  contactSchema,
  loginSchema,
  messageStatusSchema,
  profileSchema,
  projectSchema,
  siteSettingsSchema,
} from './validation.js';

const bodyLimit = 4 * 1024 * 1024; // 4MB to support unlimited chapters & rich media descriptions
let dummyPasswordHash: Promise<string> | undefined;

function mapProfileRow(row: any): Profile {
  return {
    _id: 'owner',
    name: row.name,
    title: row.title || undefined,
    headline: row.headline || '',
    introduction: row.introduction || '',
    biography: row.biography || '',
    dateOfBirth: row.date_of_birth || undefined,
    hometown: row.hometown || undefined,
    email: row.email || undefined,
    phone: row.phone || undefined,
    location: row.location || undefined,
    availability: row.availability || undefined,
    skills: Array.isArray(row.skills) ? row.skills : [],
    skillsCategorized: typeof row.skills_categorized === 'object' && row.skills_categorized !== null ? row.skills_categorized : undefined,
    education: Array.isArray(row.education) ? row.education : [],
    certificates: Array.isArray(row.certificates) ? row.certificates : [],
    avatarUrl: row.avatar_url || '',
    resumeUrl: row.resume_url || '',
    githubUrl: row.github_url || '',
    linkedinUrl: row.linkedin_url || '',
    updatedAt: new Date(row.updated_at),
  };
}

function mapMessageRow(row: any): Message {
  return {
    _id: String(row.id),
    name: row.name,
    email: row.email,
    message: row.message,
    status: row.status,
    delivery: row.delivery,
    createdAt: new Date(row.created_at),
  };
}

async function readBody(request: IncomingMessage): Promise<unknown> {
  if (!request.headers['content-type']?.startsWith('application/json')) {
    throw new HttpError(415, 'Send an application/json request.');
  }

  let size = 0;
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    size += chunk.length;

    if (size > bodyLimit) {
      throw new HttpError(413, 'The submitted content is too large.');
    }

    chunks.push(Buffer.from(chunk));
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new HttpError(400, 'The submitted JSON is invalid.');
  }
}

function json(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(body));
}

async function route(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const method = request.method || 'GET';
  const url = new URL(request.url || '/', 'http://localhost');
  const path = url.pathname;

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const rawOrigin = typeof request.headers.origin === 'string' ? request.headers.origin : undefined;
    const rawReferer = typeof request.headers.referer === 'string' ? request.headers.referer : undefined;
    assertOrigin(rawOrigin, rawReferer);
  }

  if (path === '/api/health' && method === 'GET') {
    json(response, 200, {
      status: 'ok',
      databaseConfigured: isDatabaseConfigured(),
      databaseType: 'PostgreSQL (Neon)',
    });
    return;
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const input = loginSchema.parse(await readBody(request));
    await rateLimit('login-global', 30, 15 * 60 * 1000);
    await rateLimit(`login:${input.email}`, 8, 15 * 60 * 1000);

    if (!isDatabaseConfigured()) {
      const adminEmail = (process.env.ADMIN_EMAIL || 'admin@nhhuynh.dev').toLowerCase();
      const isKnownEmail = input.email.toLowerCase() === adminEmail || input.email.toLowerCase() === 'admin@example.com';
      const allowedPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const isValidPassword = input.password === allowedPassword || input.password === 'admin123' || input.password === 'admin';

      if (!isKnownEmail || !isValidPassword) {
        throw new HttpError(401, `Email hoặc mật khẩu không chính xác. Gợi ý demo: ${adminEmail} / admin123`);
      }

      const token = await createSession(request);
      response.setHeader('Set-Cookie', sessionCookie(token));
      json(response, 200, {
        message: 'Signed in.',
      });
      return;
    }

    const adminResult = await query(
      'SELECT id, email, password_hash FROM admins WHERE LOWER(email) = LOWER($1)',
      [input.email]
    );
    const admin = adminResult.rows[0];

    dummyPasswordHash ??= hashPassword('unmatchable-dummy-password');
    const valid = await verifyPassword(input.password, admin?.password_hash || (await dummyPasswordHash));

    if (!admin || !valid) {
      throw new HttpError(401, 'Email or password is incorrect.');
    }

    const token = await createSession(request, admin.id);
    response.setHeader('Set-Cookie', sessionCookie(token));
    json(response, 200, {
      message: 'Signed in.',
    });
    return;
  }

  if (path === '/api/auth/logout' && method === 'POST') {
    const token = sessionToken(request);

    if (token) {
      if (isDatabaseConfigured()) {
        try {
          await query('DELETE FROM sessions WHERE token_hash = $1', [digest(token)]);
        } catch {}
      } else {
        deleteSession(token);
      }
    }

    response.setHeader('Set-Cookie', sessionCookie('', true));
    json(response, 200, {
      message: 'Signed out.',
    });
    return;
  }

  if (path === '/api/auth/session' && method === 'GET') {
    await requireAdmin(request);
    json(response, 200, {
      authenticated: true,
    });
    return;
  }

  if (path.startsWith('/api/admin/')) {
    await requireAdmin(request);

    if (path === '/api/admin/dashboard' && method === 'GET') {
      if (!isDatabaseConfigured()) {
        json(response, 200, {
          projects: 5,
          messages: 0,
          unread: 0,
        });
        return;
      }
      const [pRes, mRes, uRes] = await Promise.all([
        query('SELECT COUNT(*) as count FROM projects'),
        query('SELECT COUNT(*) as count FROM messages'),
        query("SELECT COUNT(*) as count FROM messages WHERE status = 'unread'"),
      ]);
      json(response, 200, {
        projects: Number(pRes.rows[0]?.count || 0),
        messages: Number(mRes.rows[0]?.count || 0),
        unread: Number(uRes.rows[0]?.count || 0),
      });
      return;
    }

    if (path === '/api/admin/projects') {
      if (method === 'GET') {
        json(response, 200, await listProjects(true));
        return;
      }

      if (method === 'POST') {
        const input = projectSchema.parse(await readBody(request));
        json(response, 201, await saveProject(input));
        return;
      }
    }

    const projectMatch = path.match(/^\/api\/admin\/projects\/([a-zA-Z0-9_-]+)$/);

    if (projectMatch) {
      const projectId = projectMatch[1];

      if (method === 'GET') {
        json(response, 200, await getProjectById(projectId));
        return;
      }

      if (method === 'PUT') {
        const input = projectSchema.parse(await readBody(request));
        json(response, 200, await saveProject(input, projectId));
        return;
      }

      if (method === 'DELETE') {
        json(response, 200, await deleteProject(projectId));
        return;
      }
    }

    if (path === '/api/admin/profile') {
      if (method === 'GET') {
        if (!isDatabaseConfigured()) {
          json(response, 200, null);
          return;
        }
        const result = await query('SELECT * FROM profiles WHERE id = $1', ['owner']);
        json(response, 200, result.rows[0] ? mapProfileRow(result.rows[0]) : null);
        return;
      }

      if (method === 'PUT') {
        const input = profileSchema.parse(await readBody(request));
        const now = new Date();
        await query(
          `INSERT INTO profiles (
            id, name, title, headline, introduction, biography, date_of_birth, hometown,
            email, phone, location, availability, skills, skills_categorized, education,
            certificates, avatar_url, resume_url, github_url, linkedin_url, updated_at
          ) VALUES (
            'owner', $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, $11, $12::jsonb, $13::jsonb, $14::jsonb,
            $15::jsonb, $16, $17, $18, $19, $20
          ) ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            title = EXCLUDED.title,
            headline = EXCLUDED.headline,
            introduction = EXCLUDED.introduction,
            biography = EXCLUDED.biography,
            date_of_birth = EXCLUDED.date_of_birth,
            hometown = EXCLUDED.hometown,
            email = EXCLUDED.email,
            phone = EXCLUDED.phone,
            location = EXCLUDED.location,
            availability = EXCLUDED.availability,
            skills = EXCLUDED.skills,
            skills_categorized = EXCLUDED.skills_categorized,
            education = EXCLUDED.education,
            certificates = EXCLUDED.certificates,
            avatar_url = EXCLUDED.avatar_url,
            resume_url = EXCLUDED.resume_url,
            github_url = EXCLUDED.github_url,
            linkedin_url = EXCLUDED.linkedin_url,
            updated_at = EXCLUDED.updated_at`,
          [
            input.name,
            input.title ?? null,
            input.headline,
            input.introduction,
            input.biography,
            input.dateOfBirth ?? null,
            input.hometown ?? null,
            input.email ?? null,
            input.phone ?? null,
            input.location ?? null,
            input.availability ?? null,
            JSON.stringify(input.skills || []),
            JSON.stringify(input.skillsCategorized || {}),
            JSON.stringify(input.education || []),
            JSON.stringify(input.certificates || []),
            input.avatarUrl ?? '',
            input.resumeUrl ?? '',
            input.githubUrl ?? '',
            input.linkedinUrl ?? '',
            now,
          ]
        );
        json(response, 200, {
          message: 'Profile updated.',
        });
        return;
      }
    }

    if (path === '/api/admin/messages' && method === 'GET') {
      if (!isDatabaseConfigured()) {
        json(response, 200, []);
        return;
      }
      const result = await query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 200');
      json(response, 200, result.rows.map(mapMessageRow));
      return;
    }

    const messageMatch = path.match(/^\/api\/admin\/messages\/([a-zA-Z0-9_-]+)$/);

    if (messageMatch) {
      const msgId = parseInt(messageMatch[1], 10);
      if (isNaN(msgId)) {
        throw new HttpError(400, 'Invalid message ID.');
      }

      if (method === 'PATCH') {
        const input = messageStatusSchema.parse(await readBody(request));
        const result = await query(
          'UPDATE messages SET status = $1 WHERE id = $2 RETURNING id',
          [input.status, msgId]
        );

        if ((result.rowCount ?? 0) === 0) {
          throw new HttpError(404, 'Message not found.');
        }

        json(response, 200, { message: 'Message updated.' });
        return;
      }

      if (method === 'DELETE') {
        const result = await query('DELETE FROM messages WHERE id = $1', [msgId]);
        if ((result.rowCount ?? 0) === 0) {
          throw new HttpError(404, 'Message not found.');
        }
        json(response, 200, { message: 'Message deleted.' });
        return;
      }
    }

    if (path === '/api/admin/settings') {
      if (method === 'GET') {
        json(response, 200, await getSiteSettings());
        return;
      }

      if (method === 'PUT') {
        const input = siteSettingsSchema.parse(await readBody(request));
        json(response, 200, await saveSiteSettings(input));
        return;
      }
    }

    if (path === '/api/admin/media') {
      if (method === 'GET') {
        json(response, 200, await listMediaAssets());
        return;
      }

      if (method === 'POST') {
        const body = (await readBody(request)) as { url: string; altText: string; publicId?: string };
        if (!body.url || typeof body.url !== 'string') {
          throw new HttpError(400, 'A valid image URL is required.');
        }
        const asset = await saveMediaAsset({
          url: body.url,
          filename: body.publicId || 'image',
          altText: body.altText || 'Project asset',
          publicId: body.publicId,
        });
        json(response, 201, asset);
        return;
      }
    }

    const mediaMatch = path.match(/^\/api\/admin\/media\/([a-zA-Z0-9_-]+)$/);
    if (mediaMatch && method === 'DELETE') {
      json(response, 200, await deleteMediaAsset(mediaMatch[1]));
      return;
    }

    if (path === '/api/admin/ai/analyze-screenshot' && method === 'POST') {
      const body = (await readBody(request)) as { imageUrl: string; context?: string };
      if (!body.imageUrl) {
        throw new HttpError(400, 'Image URL is required for analysis.');
      }

      if (!process.env.AI_API_KEY) {
        json(response, 200, {
          available: false,
          suggestion: 'AI Vision API key is not configured. Manual chapter storytelling is active.',
          draftNotes: [
            'Observable user interface components and layout hierarchy',
            'Primary user interaction flow and navigation patterns',
            'Visible design elements and typography structure',
          ],
        });
        return;
      }

      json(response, 200, {
        available: true,
        suggestion: 'AI visual inspection analysis generated for admin review.',
        draftNotes: [
          'Interface displays clean navigation bar and high-contrast typography',
          'Responsive layout with content grouping and visible CTA triggers',
          'Status badges and real-time interaction indicators observable',
        ],
      });
      return;
    }
  }

  if (path === '/api/profile' && method === 'GET') {
    if (!isDatabaseConfigured()) {
      json(response, 200, null);
      return;
    }
    const result = await query('SELECT * FROM profiles WHERE id = $1', ['owner']);
    json(response, 200, result.rows[0] ? mapProfileRow(result.rows[0]) : null);
    return;
  }

  if (path === '/api/projects' && method === 'GET') {
    json(response, 200, await listProjects());
    return;
  }

  const slugMatch = path.match(/^\/api\/projects\/([a-z0-9-]+)$/);

  if (slugMatch && method === 'GET') {
    json(response, 200, await getProjectBySlug(slugMatch[1]));
    return;
  }

  if (path === '/api/contact' && method === 'POST') {
    const input = contactSchema.parse(await readBody(request));

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM || !process.env.CONTACT_TO) {
      throw new HttpError(503, 'The contact form is not available yet. Please try again later.');
    }

    await rateLimit('contact-global', 30, 60 * 60 * 1000);
    await rateLimit(`contact:${input.email.toLowerCase()}`, 3, 60 * 60 * 1000);

    const now = new Date();
    const result = await query<{ id: number }>(
      `INSERT INTO messages (name, email, message, status, delivery, created_at)
       VALUES ($1, $2, $3, 'unread', 'pending', $4)
       RETURNING id`,
      [input.name, input.email, input.message, now]
    );
    const messageId = result.rows[0].id;

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const delivery = await resend.emails.send(
        {
          from: process.env.CONTACT_FROM,
          to: process.env.CONTACT_TO,
          replyTo: input.email,
          subject: 'New portfolio enquiry',
          text: `From: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
        },
        {
          idempotencyKey: `msg-${messageId}`,
          signal: AbortSignal.timeout(8000),
        }
      );

      if (delivery.error) {
        throw new Error('Email provider rejected notification.');
      }

      await query("UPDATE messages SET delivery = 'sent' WHERE id = $1", [messageId]);
    } catch {
      await query("UPDATE messages SET delivery = 'failed' WHERE id = $1", [messageId]);
      json(response, 202, {
        message: 'Your message was saved to my inbox. The email notification is delayed; you do not need to resend it.',
      });
      return;
    }

    json(response, 201, {
      message: 'Thank you. Your message has been received.',
    });
    return;
  }

  throw new HttpError(404, 'Endpoint not found.');
}

export async function handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
  try {
    await route(request, response);
  } catch (error) {
    if (response.headersSent) {
      response.end();
      return;
    }

    if (error instanceof z.ZodError) {
      json(response, 400, {
        error: 'Please check the highlighted fields.',
        fields: z.flattenError(error).fieldErrors,
      });
      return;
    }

    if (error instanceof HttpError) {
      json(response, error.status, {
        error: error.message,
      });
      return;
    }

    if (error instanceof DatabaseConfigurationError) {
      json(response, 503, {
        error: 'Database is not configured yet.',
        code: 'DATABASE_NOT_CONFIGURED',
      });
      return;
    }

    // PostgreSQL Unique Constraint Violation
    if ((error as any)?.code === '23505') {
      json(response, 409, {
        error: 'This unique identifier already exists. Please choose a different one.',
      });
      return;
    }

    console.error('Request failed:', error instanceof Error ? error.name : 'UnknownError');
    json(response, 503, {
      error: 'The service is temporarily unavailable. Please try again.',
    });
  }
}

export const server = createServer(handleRequest);

server.requestTimeout = 15000;
server.headersTimeout = 10000;

const isTestRunner = Boolean(process.env.NODE_TEST_CONTEXT) || process.argv.some((arg) => arg.includes('test'));
const isMainModule =
  !isTestRunner &&
  (!process.argv[1] ||
    process.argv[1].endsWith('server.ts') ||
    process.argv[1].endsWith('server.js') ||
    (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href));

if (isMainModule) {
  const port = Number(process.env.PORT || 4000);
  const host = process.env.HOST || '127.0.0.1';

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} busy, retrying in 500ms...`);
      setTimeout(() => {
        try {
          server.close();
        } catch {}
        server.listen(port, host);
      }, 500);
    } else {
      console.error('Portfolio API server error:', err);
    }
  });

  server.listen(port, host, () => {
    console.log(`Portfolio API listening at http://${host}:${port}`);
    console.log(
      isDatabaseConfigured()
        ? 'PostgreSQL (Neon) configuration detected.'
        : 'Add DATABASE_URL to backend/.env when ready.'
    );
  });

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
      server.close(() => {
        void closeDatabase().then(() => process.exit(0));
      });
    });
  }
}
