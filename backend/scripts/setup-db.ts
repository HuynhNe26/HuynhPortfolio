import { closeDatabase, getDatabase } from '../src/database.js';

try {
  const database = await getDatabase();
  await database.command({
    ping: 1
  });
  console.log('MongoDB connected. Collections and indexes are ready.');
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Database setup failed.');
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
