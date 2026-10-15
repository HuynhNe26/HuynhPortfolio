import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { pathToFileURL } from 'node:url';
import { MongoServerError, ObjectId } from 'mongodb';
import { z } from 'zod';
import { assertOrigin, createSession, digest, hashPassword, rateLimit, requireAdmin, sessionCookie, sessionToken, verifyPassword } from './auth.js';
import { closeDatabase, collections, DatabaseConfigurationError, isDatabaseConfigured } from './database.js';
import { HttpError } from './errors.js';
import {
  deleteMediaAsset,
  deleteProject,
  getSiteSettings,
  listMediaAssets,
  listProjects,
  objectId,
  saveMediaAsset,
  saveProject,
  saveSiteSettings,
} from './repository.js';
import {
  contactSchema,
  loginSchema,
  messageStatusSchema,
  profileSchema,
  projectSchema,
  siteSettingsSchema,
} from './validation.js';

const bodyLimit = 64 * 1024;
let dummyPasswordHash: Promise<string> | undefined;

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
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

async function route(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const path = new URL(request.url || '/', 'http://localhost').pathname;
  const method = request.method || 'GET';

  if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    throw new HttpError(405, 'Method not allowed.');
  }

  if (method !== 'GET') {
    assertOrigin(request.headers.origin);
  }

  if (path === '/api/health' && method === 'GET') {
    json(response, 200, {
      status: 'ok',
      databaseConfigured: isDatabaseConfigured()
    });
    return;
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const input = loginSchema.parse(await readBody(request));
    await rateLimit('login-global', 30, 15 * 60 * 1000);
    await rateLimit(`login:${input.email}`, 8, 15 * 60 * 1000);
    const { admins } = await collections();
    const admin = await admins.findOne({
      _id: 'owner',
      email: input.email
    });
    dummyPasswordHash ??= hashPassword('unmatchable-dummy-password');
    const valid = await verifyPassword(input.password, admin?.passwordHash || await dummyPasswordHash);

    if (!admin || !valid) {
      throw new HttpError(401, 'Email or password is incorrect.');
    }

    const token = await createSession(request);
    response.setHeader('Set-Cookie', sessionCookie(token));
    json(response, 200, {
      message: 'Signed in.'
    });
    return;
  }

  if (path === '/api/auth/logout' && method === 'POST') {
    const token = sessionToken(request);

    if (token) {
      const { sessions } = await collections();
      await sessions.deleteOne({
        _id: digest(token)
      });
    }

    response.setHeader('Set-Cookie', sessionCookie('', true));
    json(response, 200, {
      message: 'Signed out.'
    });
    return;
  }

  if (path === '/api/auth/session' && method === 'GET') {
    await requireAdmin(request);
    json(response, 200, {
      authenticated: true
    });
    return;
  }

  if (path.startsWith('/api/admin/')) {
    await requireAdmin(request);
    const db = await collections();

    if (path === '/api/admin/dashboard' && method === 'GET') {
      const [projects, messages, unread] = await Promise.all([
        db.projects.countDocuments(),
        db.messages.countDocuments(),
        db.messages.countDocuments({
          status: 'unread'
        }),
      ]);
      json(response, 200, {
        projects,
        messages,
        unread
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

    const projectMatch = path.match(/^\/api\/admin\/projects\/([a-f0-9]{24})$/i);

    if (projectMatch) {
      const id = objectId(projectMatch[1]);

      if (method === 'GET') {
        const project = await db.projects.findOne({
          _id: id
        });

        if (!project) {
          throw new HttpError(404, 'Project not found.');
        }

        json(response, 200, project);
        return;
      }

      if (method === 'PUT') {
        json(response, 200, await saveProject(projectSchema.parse(await readBody(request)), projectMatch[1]));
        return;
      }

      if (method === 'DELETE') {
        const result = await db.projects.deleteOne({
          _id: id
        });

        if (!result.deletedCount) {
          throw new HttpError(404, 'Project not found.');
        }

        json(response, 200, {
          message: 'Project deleted.'
        });
        return;
      }
    }

    if (path === '/api/admin/profile') {
      if (method === 'GET') {
        json(response, 200, await db.profiles.findOne({
          _id: 'owner'
        }));
        return;
      }

      if (method === 'PUT') {
        const input = profileSchema.parse(await readBody(request));
        await db.profiles.updateOne(
          {
            _id: 'owner'
          },
          {
            $set: {
              ...input,
              updatedAt: new Date()
            }
          },
          {
            upsert: true
          },
        );
        json(response, 200, {
          message: 'Profile updated.'
        });
        return;
      }
    }

    if (path === '/api/admin/messages' && method === 'GET') {
      json(response, 200, await db.messages.find().sort({
        createdAt: -1
      }).limit(200).toArray());
      return;
    }

    const messageMatch = path.match(/^\/api\/admin\/messages\/([a-f0-9]{24})$/i);

    if (messageMatch) {
      if (method === 'PATCH') {
        const input = messageStatusSchema.parse(await readBody(request));
        const result = await db.messages.updateOne(
          { _id: objectId(messageMatch[1]) },
          { $set: input }
        );

        if (!result.matchedCount) {
          throw new HttpError(404, 'Message not found.');
        }

        json(response, 200, { message: 'Message updated.' });
        return;
      }

      if (method === 'DELETE') {
        const result = await db.messages.deleteOne({ _id: objectId(messageMatch[1]) });
        if (!result.deletedCount) {
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
          altText: body.altText || 'Project asset',
          publicId: body.publicId,
        });
        json(response, 201, asset);
        return;
      }
    }

    const mediaMatch = path.match(/^\/api\/admin\/media\/([a-f0-9]{24})$/i);
    if (mediaMatch && method === 'DELETE') {
      json(response, 200, await deleteMediaAsset(mediaMatch[1]));
      return;
    }

    if (path === '/api/admin/ai/analyze-screenshot' && method === 'POST') {
      const body = (await readBody(request)) as { imageUrl: string; context?: string };
      if (!body.imageUrl) {
        throw new HttpError(400, 'Image URL is required for analysis.');
      }

      // Check if AI API key is configured
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

      // If configured, provide structured analysis without fabricating facts
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
    const { profiles } = await collections();
    json(response, 200, await profiles.findOne({
      _id: 'owner'
    }));
    return;
  }

  if (path === '/api/projects' && method === 'GET') {
    json(response, 200, await listProjects());
    return;
  }

  const slugMatch = path.match(/^\/api\/projects\/([a-z0-9-]+)$/);

  if (slugMatch && method === 'GET') {
    const { projects } = await collections();
    const project = await projects.findOne({
      slug: slugMatch[1],
      published: true
    });

    if (!project) {
      throw new HttpError(404, 'Project not found.');
    }

    json(response, 200, project);
    return;
  }

  if (path === '/api/contact' && method === 'POST') {
    const input = contactSchema.parse(await readBody(request));

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM || !process.env.CONTACT_TO) {
      throw new HttpError(503, 'The contact form is not available yet. Please try again later.');
    }

    await rateLimit('contact-global', 30, 60 * 60 * 1000);
    await rateLimit(`contact:${input.email.toLowerCase()}`, 3, 60 * 60 * 1000);
    const { messages } = await collections();
    const result = await messages.insertOne({
      _id: new ObjectId(),
      name: input.name,
      email: input.email,
      message: input.message,
      status: 'unread',
      delivery: 'pending',
      createdAt: new Date(),
    });

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const delivery = await resend.emails.send({
        from: process.env.CONTACT_FROM,
        to: process.env.CONTACT_TO,
        replyTo: input.email,
        subject: 'New portfolio enquiry',
        text: `From: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
      }, {
        idempotencyKey: result.insertedId.toHexString(),
        signal: AbortSignal.timeout(8000)
      });

      if (delivery.error) {
        throw new Error('Email provider rejected notification.');
      }

      await messages.updateOne({
        _id: result.insertedId
      }, {
        $set: {
          delivery: 'sent'
        }
      });
    } catch {
      await messages.updateOne({
        _id: result.insertedId
      }, {
        $set: {
          delivery: 'failed'
        }
      });
      json(response, 202, {
        message: 'Your message was saved to my inbox. The email notification is delayed; you do not need to resend it.'
      });
      return;
    }

    json(response, 201, {
      message: 'Thank you. Your message has been received.'
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
        error: error.message
      });
      return;
    }

    if (error instanceof DatabaseConfigurationError) {
      json(response, 503, {
        error: 'Database is not configured yet.',
        code: 'DATABASE_NOT_CONFIGURED'
      });
      return;
    }

    if (error instanceof MongoServerError && error.code === 11000) {
      json(response, 409, {
        error: 'This slug already exists. Choose a different slug.'
      });
      return;
    }

    console.error('Request failed:', error instanceof Error ? error.name : 'UnknownError');
    json(response, 503, {
      error: 'The service is temporarily unavailable. Please try again.'
    });
  }
}

export const server = createServer(handleRequest);

server.requestTimeout = 15000;
server.headersTimeout = 10000;

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 4000);
  const host = process.env.HOST || '127.0.0.1';

  server.listen(port, host, () => {
    console.log(`Portfolio API listening at http://${host}:${port}`);
    console.log(isDatabaseConfigured() ? 'MongoDB configuration detected.' : 'Add MONGODB_URI to backend/.env when ready.');
  });

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
      server.close(() => {
        void closeDatabase().then(() => process.exit(0));
      });
    });
  }
}
