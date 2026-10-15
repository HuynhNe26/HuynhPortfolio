import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { closeDatabase, getPool } from '../src/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setup() {
  console.log('Connecting to PostgreSQL (Neon)...');
  try {
    const pool = await getPool();
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✓ PostgreSQL connected successfully.');
    console.log(`  Database time: ${result.rows[0].current_time}`);
    console.log(`  Server: ${result.rows[0].pg_version.split(' ')[0]}`);

    const schemaPath = join(__dirname, '../database/schema.sql');
    const sql = readFileSync(schemaPath, 'utf8');
    await pool.query(sql);
    console.log('✓ Schema and indexes verified/created from database/schema.sql');
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Database setup failed.');
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}

void setup();
