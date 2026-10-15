import { z } from 'zod';
import { hashPassword } from '../src/auth.js';
import { closeDatabase, collections } from '../src/database.js';

try {
  const email = z.email().parse(process.env.ADMIN_EMAIL).toLowerCase();
  const password = z.string().min(14).max(256).parse(process.env.ADMIN_PASSWORD);
  const { admins } = await collections();

  if (await admins.findOne({
    _id: 'owner'
  })) {
    throw new Error('An administrator already exists. No existing account was changed.');
  }

  await admins.insertOne({
    _id: 'owner',
    email,
    passwordHash: await hashPassword(password),
    createdAt: new Date(),
  });

  console.log('Administrator created. Remove ADMIN_PASSWORD from backend/.env now.');
} catch (error) {
  console.error(error instanceof z.ZodError ? 'Set a valid ADMIN_EMAIL and ADMIN_PASSWORD of at least 14 characters.' : error instanceof Error ? error.message : 'Provisioning failed.');
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
