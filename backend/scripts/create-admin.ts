import { z } from 'zod';
import { hashPassword } from '../src/auth.js';
import { closeDatabase, query } from '../src/database.js';

try {
  const email = z.string().email().parse(process.env.ADMIN_EMAIL).toLowerCase();
  const password = z.string().min(14).max(256).parse(process.env.ADMIN_PASSWORD);

  const existing = await query('SELECT id FROM admins WHERE id = $1', ['owner']);
  if (existing.rows.length > 0) {
    throw new Error('An administrator already exists. No existing account was changed.');
  }

  const passwordHash = await hashPassword(password);
  await query(
    'INSERT INTO admins (id, email, password_hash, created_at) VALUES ($1, $2, $3, NOW())',
    ['owner', email, passwordHash]
  );

  console.log('Administrator created. Remove ADMIN_PASSWORD from backend/.env now.');
} catch (error) {
  console.error(
    error instanceof z.ZodError
      ? 'Set a valid ADMIN_EMAIL and ADMIN_PASSWORD of at least 14 characters.'
      : error instanceof Error
        ? error.message
        : 'Provisioning failed.'
  );
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
