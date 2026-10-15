import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import type { IncomingMessage } from 'node:http';
import { query } from './database.js';
import { HttpError } from './errors.js';

const deriveKey = promisify(scrypt);
const sessionLifetime = 8 * 60 * 60;
export const cookieName = 'nh_admin_session';

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const key = (await deriveKey(password, salt, 64)) as Buffer;
  return `${salt}:${key.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, encoded] = stored.split(':');

  if (!salt || !encoded || !/^[a-f0-9]{128}$/.test(encoded)) {
    return false;
  }

  const expected = Buffer.from(encoded, 'hex');
  const actual = (await deriveKey(password, salt, 64)) as Buffer;
  return timingSafeEqual(expected, actual);
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

export async function createSession(request: IncomingMessage): Promise<string> {
  const previous = sessionToken(request);

  if (previous) {
    await query('DELETE FROM sessions WHERE token_hash = $1', [digest(previous)]);
  }

  const token = randomBytes(32).toString('hex');
  const tokenHash = digest(token);
  const expiresAt = new Date(Date.now() + sessionLifetime * 1000);

  await query(
    'INSERT INTO sessions (token_hash, admin_id, expires_at) VALUES ($1, $2, $3)',
    [tokenHash, 'owner', expiresAt]
  );

  return token;
}

export async function requireAdmin(request: IncomingMessage): Promise<void> {
  const token = sessionToken(request);

  if (!token) {
    throw new HttpError(401, 'Please sign in to continue.');
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

export function assertOrigin(origin: string | undefined): void {
  const configured = process.env.APP_URL || (process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '');

  if (!configured || origin !== new URL(configured).origin) {
    throw new HttpError(403, 'This request origin is not allowed.');
  }
}

export async function rateLimit(scope: string, maximum: number, windowMs: number): Promise<void> {
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
