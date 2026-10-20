import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import type { IncomingMessage } from 'node:http';
import bcrypt from 'bcryptjs';
import { isDatabaseConfigured, query } from './database.js';
import { HttpError } from './errors.js';

const deriveKey = promisify(scrypt);
const sessionLifetime = 8 * 60 * 60;
export const cookieName = 'nh_admin_session';

// In-memory sessions store for development/preview when PostgreSQL (Neon) is not linked yet
const inMemorySessions = new Set<string>();

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (!stored) return false;

  // 1. Primary check: standard bcrypt hash ($2a$, $2b$, $2y$)
  if (stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$')) {
    return bcrypt.compare(password, stored);
  }

  // 2. Backward-compatible fallback for legacy scrypt hashes (salt:hex)
  const [salt, encoded] = stored.split(':');
  if (salt && encoded && /^[a-f0-9]{128}$/.test(encoded)) {
    const expected = Buffer.from(encoded, 'hex');
    const actual = (await deriveKey(password, salt, 64)) as Buffer;
    return timingSafeEqual(expected, actual);
  }

  return false;
}

export function digest(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function sessionToken(request: IncomingMessage): string | undefined {
  const cookie = request.headers.cookie?.split(';').map((item) => item.trim());
  const value = cookie?.find((item) => item.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  return value && /^[a-f0-9]{64}$/.test(value) ? value : undefined;
}

export function sessionCookie(token: string, clear = false): string {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${clear ? 0 : sessionLifetime}${secure}`;
}

export async function createSession(request: IncomingMessage, adminId = 'owner'): Promise<string> {
  const previous = sessionToken(request);

  if (previous) {
    if (isDatabaseConfigured()) {
      try {
        await query('DELETE FROM sessions WHERE token_hash = $1', [digest(previous)]);
      } catch {}
    } else {
      inMemorySessions.delete(digest(previous));
    }
  }

  const token = randomBytes(32).toString('hex');
  const tokenHash = digest(token);

  if (isDatabaseConfigured()) {
    const expiresAt = new Date(Date.now() + sessionLifetime * 1000);
    await query(
      'INSERT INTO sessions (token_hash, admin_id, expires_at) VALUES ($1, $2, $3)',
      [tokenHash, adminId, expiresAt]
    );
  } else {
    inMemorySessions.add(tokenHash);
  }

  return token;
}

export function deleteSession(token: string): void {
  inMemorySessions.delete(digest(token));
}

export async function requireAdmin(request: IncomingMessage): Promise<void> {
  const token = sessionToken(request);

  if (!token) {
    throw new HttpError(401, 'Please sign in to continue.');
  }

  if (!isDatabaseConfigured()) {
    if (!inMemorySessions.has(digest(token))) {
      throw new HttpError(401, 'Your session has expired. Please sign in again.');
    }
    return;
  }

  const result = await query<{ token_hash: string }>(
    `SELECT s.token_hash
     FROM sessions s
     JOIN admins a ON s.admin_id = a.id
     WHERE s.token_hash = $1 AND s.expires_at > NOW()`,
    [digest(token)]
  );

  if (result.rows.length === 0) {
    throw new HttpError(401, 'Your session has expired. Please sign in again.');
  }
}

export function assertOrigin(origin: string | undefined, referer?: string): void {
  // Extract candidate origin from origin header or fallback to referer
  let candidate = origin;
  if (!candidate && referer) {
    try {
      candidate = new URL(referer).origin;
    } catch {
      // ignore invalid referer URL
    }
  }

  if (!candidate) {
    throw new HttpError(403, 'This request origin is not allowed.');
  }

  const isDev = process.env.NODE_ENV !== 'production';

  // In development, permit all loopback and local development hosts
  if (isDev) {
    try {
      const parsed = new URL(candidate);
      if (
        parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname === '0.0.0.0' ||
        parsed.hostname.endsWith('.localhost')
      ) {
        return;
      }
    } catch {
      // ignore
    }
  }

  // Parse allowed origins from configured APP_URL (supports comma-separated list)
  const configuredRaw = process.env.APP_URL || (isDev ? 'http://localhost:3000' : '');
  const allowedOrigins = configuredRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      try {
        return new URL(item).origin;
      } catch {
        return '';
      }
    })
    .filter(Boolean);

  if (isDev) {
    allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001');
  }

  if (!allowedOrigins.includes(candidate)) {
    throw new HttpError(403, 'This request origin is not allowed.');
  }
}

export async function rateLimit(scope: string, maximum: number, windowMs: number): Promise<void> {
  if (!isDatabaseConfigured()) {
    return;
  }

  const window = Math.floor(Date.now() / windowMs);
  const id = digest(`${scope}:${window}`);
  const expiresAt = new Date((window + 2) * windowMs);

  const result = await query<{ count: number }>(
    `INSERT INTO rate_limits (id, count, expires_at)
     VALUES ($1, 1, $2)
     ON CONFLICT (id) DO UPDATE SET count = rate_limits.count + 1
     RETURNING count`,
    [id, expiresAt]
  );

  const currentCount = result.rows[0]?.count ?? 1;

  if (currentCount > maximum) {
    throw new HttpError(429, 'Too many attempts. Please try again later.');
  }
}
