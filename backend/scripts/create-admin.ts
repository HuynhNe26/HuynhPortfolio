import { z } from 'zod';
import { hashPassword } from '../src/auth.js';
import { closeDatabase, query } from '../src/database.js';

try {
  const email = z.string().email().parse(process.env.ADMIN_EMAIL).toLowerCase();
  const password = z.string().min(14).max(256).parse(process.env.ADMIN_PASSWORD);

  const passwordHash = await hashPassword(password);
  await query(
    `INSERT INTO admins (id, email, password_hash, created_at)
     VALUES ('owner', $1, $2, NOW())
     ON CONFLICT (id) DO UPDATE SET
       email = EXCLUDED.email,
       password_hash = EXCLUDED.password_hash,
       created_at = NOW()`,
    [email, passwordHash]
  );

  console.log(`✓ Administrator account (${email}) successfully provisioned on PostgreSQL (Neon).`);
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
  process.exit(process.exitCode || 0);
}
