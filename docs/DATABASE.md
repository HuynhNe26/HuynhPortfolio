# Database Architecture & Schemas — PostgreSQL (Neon)

## 1. Connection & Serverless Architecture

The application interfaces with PostgreSQL via connection pooling with `pg.Pool` in `backend/src/database.ts`, fully optimized for **Neon Serverless PostgreSQL**.

### Schema DDL File
- The complete production SQL schema is available at: [`database/schema.sql`](file:///Users/annie/Documents/HuynhPortfolio/database/schema.sql)
- To initialize or verify tables on Neon, run:
  ```bash
  npm run db:setup
  ```
- To seed the 5 real projects and owner profile, run:
  ```bash
  npm run db:seed
  ```

---

## 2. Relational Tables & Performance Indexes

### `admins` Table
Stores administrative credentials with salted scrypt password hashing.
```sql
CREATE TABLE admins (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### `sessions` Table
Cryptographically secure session tokens for HttpOnly cookie authentication.
```sql
CREATE TABLE sessions (
    token_hash VARCHAR(64) PRIMARY KEY,
    admin_id VARCHAR(64) NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
```

### `profiles` Table
Owner profile information, education, TOEIC certificates, and categorized skills stored with JSONB flexibility.
```sql
CREATE TABLE profiles (
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
```

### `projects` Table
Real projects with full 7-chapter storytelling case study data.
```sql
CREATE TABLE projects (
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

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_published_featured ON projects(published, featured, display_order, created_at DESC);
```

### `rate_limits` Table
Atomic distributed request throttling buckets across processes.
```sql
CREATE TABLE rate_limits (
    id VARCHAR(128) PRIMARY KEY,
    count INT NOT NULL DEFAULT 1,
    expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX idx_rate_limits_expires_at ON rate_limits(expires_at);
```

### `messages` Table
Contact form submissions with delivery tracking.
```sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unread',
    delivery VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_status ON messages(status);
```

### `media_assets` Table
Cloudinary media assets metadata and dimensions.
```sql
CREATE TABLE media_assets (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    format VARCHAR(50),
    bytes INT,
    alt TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_media_assets_created_at ON media_assets(created_at DESC);
```

### `site_settings` Table
SEO metadata and site-wide configuration.
```sql
CREATE TABLE site_settings (
    id VARCHAR(64) PRIMARY KEY,
    site_title VARCHAR(255) NOT NULL,
    seo_description TEXT NOT NULL,
    canonical_url TEXT,
    contact_email VARCHAR(255),
    public_visibility BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```
