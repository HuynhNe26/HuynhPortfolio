import pg from 'pg';
import type { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

const { Pool: PgPool } = pg;

let pool: Pool | undefined;
let initialized: Promise<void> | undefined;

export class DatabaseConfigurationError extends Error {
  constructor() {
    super('Add DATABASE_URL to backend/.env to enable PostgreSQL (Neon).');
    this.name = 'DatabaseConfigurationError';
  }
}

export function isDatabaseConfigured(): boolean {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  return Boolean(connectionString?.trim());
}

export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url?.trim()) {
    throw new DatabaseConfigurationError();
  }
  return url.trim();
}

export async function getPool(): Promise<Pool> {
  if (!isDatabaseConfigured()) {
    throw new DatabaseConfigurationError();
  }

  if (!pool) {
    const connectionString = getDatabaseUrl();
    const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

    pool = new PgPool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
    });
  }

  if (!initialized) {
    initialized = initializeSchema(pool).catch((err) => {
      initialized = undefined;
      throw err;
    });
  }

  await initialized;
  return pool;
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const currentPool = await getPool();
  return currentPool.query<T>(text, params);
}

export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const currentPool = await getPool();
  const client = await currentPool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function initializeSchema(activePool: Pool): Promise<void> {
  await activePool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id VARCHAR(64) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token_hash VARCHAR(64) PRIMARY KEY,
      admin_id VARCHAR(64) NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

    CREATE TABLE IF NOT EXISTS profiles (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      title VARCHAR(255),
      headline VARCHAR(500),
      introduction TEXT,
      biography TEXT,
      date_of_birth VARCHAR(100),
      hometown VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(100),
      location VARCHAR(255),
      availability VARCHAR(255),
      skills JSONB NOT NULL DEFAULT '[]'::jsonb,
      skills_categorized JSONB NOT NULL DEFAULT '{}'::jsonb,
      education JSONB NOT NULL DEFAULT '[]'::jsonb,
      certificates JSONB NOT NULL DEFAULT '[]'::jsonb,
      avatar_url TEXT,
      resume_url TEXT,
      github_url TEXT,
      linkedin_url TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      summary TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      role VARCHAR(100) NOT NULL,
      team_size INT,
      timeline VARCHAR(100),
      status VARCHAR(50) DEFAULT 'Completed',
      year INT NOT NULL,
      technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
      theme_color VARCHAR(50),
      theme_bg VARCHAR(50),
      problem TEXT NOT NULL,
      approach TEXT NOT NULL,
      outcome TEXT NOT NULL,
      cover_url TEXT,
      live_url TEXT,
      source_url TEXT,
      featured BOOLEAN NOT NULL DEFAULT false,
      published BOOLEAN NOT NULL DEFAULT true,
      display_order INT NOT NULL DEFAULT 0,
      chapters JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
    CREATE INDEX IF NOT EXISTS idx_projects_published_featured ON projects(published, featured, display_order, created_at DESC);

    CREATE TABLE IF NOT EXISTS rate_limits (
      id VARCHAR(128) PRIMARY KEY,
      count INT NOT NULL DEFAULT 1,
      expires_at TIMESTAMPTZ NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_rate_limits_expires_at ON rate_limits(expires_at);

    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'unread',
      delivery VARCHAR(50) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);

    CREATE TABLE IF NOT EXISTS media_assets (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL,
      filename VARCHAR(255) NOT NULL,
      format VARCHAR(50),
      bytes INT,
      alt TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_media_assets_created_at ON media_assets(created_at DESC);

    CREATE TABLE IF NOT EXISTS site_settings (
      id VARCHAR(64) PRIMARY KEY,
      site_title VARCHAR(255) NOT NULL,
      seo_description TEXT NOT NULL,
      canonical_url TEXT,
      contact_email VARCHAR(255),
      public_visibility BOOLEAN NOT NULL DEFAULT true,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
    initialized = undefined;
  }
}
