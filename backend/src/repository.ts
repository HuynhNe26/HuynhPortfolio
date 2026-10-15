import { query } from './database.js';
import { HttpError } from './errors.js';
import type { MediaAsset, Project, ProjectInput, SiteSettings, SiteSettingsInput } from './models.js';

function parseId(value: string): number {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed <= 0) {
    throw new HttpError(400, 'Invalid record identifier.');
  }
  return parsed;
}

function mapProjectRow(row: any): Project {
  return {
    _id: String(row.id),
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    category: row.category,
    role: row.role,
    teamSize: row.team_size ? Number(row.team_size) : undefined,
    timeline: row.timeline || undefined,
    status: row.status || undefined,
    year: Number(row.year),
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    themeColor: row.theme_color || undefined,
    themeBg: row.theme_bg || undefined,
    problem: row.problem,
    approach: row.approach,
    outcome: row.outcome,
    coverUrl: row.cover_url || '',
    liveUrl: row.live_url || '',
    sourceUrl: row.source_url || '',
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    order: row.display_order !== null && row.display_order !== undefined ? Number(row.display_order) : 0,
    chapters: Array.isArray(row.chapters) ? row.chapters : [],
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export async function listProjects(includeDrafts = false): Promise<Project[]> {
  const sql = includeDrafts
    ? `SELECT * FROM projects ORDER BY featured DESC, display_order ASC, created_at DESC LIMIT 200`
    : `SELECT * FROM projects WHERE published = true ORDER BY featured DESC, display_order ASC, created_at DESC LIMIT 200`;

  const result = await query(sql);
  return result.rows.map(mapProjectRow);
}

export async function getProjectById(id: string): Promise<Project> {
  const numId = parseId(id);
  const result = await query('SELECT * FROM projects WHERE id = $1', [numId]);
  if (result.rows.length === 0) {
    throw new HttpError(404, 'Project not found.');
  }
  return mapProjectRow(result.rows[0]);
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const result = await query(
    'SELECT * FROM projects WHERE slug = $1 AND published = true',
    [slug]
  );
  if (result.rows.length === 0) {
    throw new HttpError(404, 'Project not found.');
  }
  return mapProjectRow(result.rows[0]);
}

export async function saveProject(input: ProjectInput, id?: string): Promise<Project> {
  const now = new Date();

  if (id) {
    const numId = parseId(id);
    const result = await query(
      `UPDATE projects SET
        title = $1,
        slug = $2,
        summary = $3,
        category = $4,
        role = $5,
        team_size = $6,
        timeline = $7,
        status = $8,
        year = $9,
        technologies = $10::jsonb,
        theme_color = $11,
        theme_bg = $12,
        problem = $13,
        approach = $14,
        outcome = $15,
        cover_url = $16,
        live_url = $17,
        source_url = $18,
        featured = $19,
        published = $20,
        display_order = $21,
        chapters = $22::jsonb,
        updated_at = $23
       WHERE id = $24
       RETURNING *`,
      [
        input.title,
        input.slug,
        input.summary,
        input.category,
        input.role,
        input.teamSize ?? null,
        input.timeline ?? null,
        input.status ?? 'Completed',
        input.year,
        JSON.stringify(input.technologies || []),
        input.themeColor ?? null,
        input.themeBg ?? null,
        input.problem,
        input.approach,
        input.outcome,
        input.coverUrl ?? '',
        input.liveUrl ?? '',
        input.sourceUrl ?? '',
        Boolean(input.featured),
        Boolean(input.published),
        input.order ?? 0,
        JSON.stringify(input.chapters || []),
        now,
        numId,
      ]
    );

    if (result.rows.length === 0) {
      throw new HttpError(404, 'Project not found.');
    }

    return mapProjectRow(result.rows[0]);
  }

  const result = await query(
    `INSERT INTO projects (
      title, slug, summary, category, role, team_size, timeline, status, year,
      technologies, theme_color, theme_bg, problem, approach, outcome,
      cover_url, live_url, source_url, featured, published, display_order, chapters,
      created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9,
      $10::jsonb, $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20, $21, $22::jsonb,
      $23, $24
    ) RETURNING *`,
    [
      input.title,
      input.slug,
      input.summary,
      input.category,
      input.role,
      input.teamSize ?? null,
      input.timeline ?? null,
      input.status ?? 'Completed',
      input.year,
      JSON.stringify(input.technologies || []),
      input.themeColor ?? null,
      input.themeBg ?? null,
      input.problem,
      input.approach,
      input.outcome,
      input.coverUrl ?? '',
      input.liveUrl ?? '',
      input.sourceUrl ?? '',
      Boolean(input.featured),
      Boolean(input.published),
      input.order ?? 0,
      JSON.stringify(input.chapters || []),
      now,
      now,
    ]
  );

  return mapProjectRow(result.rows[0]);
}

export async function deleteProject(id: string): Promise<{ message: string }> {
  const numId = parseId(id);
  const result = await query('DELETE FROM projects WHERE id = $1', [numId]);
  if ((result.rowCount ?? 0) === 0) {
    throw new HttpError(404, 'Project not found.');
  }
  return { message: 'Project deleted successfully.' };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await query('SELECT * FROM site_settings WHERE id = $1', ['settings']);
  if (result.rows.length === 0) {
    return {
      _id: 'settings',
      siteTitle: 'Nguyễn Hoàng Huynh — Full-Stack Developer Portfolio',
      seoDescription: 'Personal developer portfolio and interactive project case studies of Nguyễn Hoàng Huynh.',
      canonicalUrl: 'https://huynhportfolio.com',
      contactEmail: 'nguyenhoanghuynh.vn@gmail.com',
      publicVisibility: true,
      updatedAt: new Date(),
    };
  }

  const row = result.rows[0];
  return {
    _id: 'settings',
    siteTitle: row.site_title,
    seoDescription: row.seo_description,
    canonicalUrl: row.canonical_url || '',
    contactEmail: row.contact_email || '',
    publicVisibility: Boolean(row.public_visibility),
    updatedAt: new Date(row.updated_at),
  };
}

export async function saveSiteSettings(input: SiteSettingsInput): Promise<{ message: string }> {
  const now = new Date();
  await query(
    `INSERT INTO site_settings (id, site_title, seo_description, canonical_url, contact_email, public_visibility, updated_at)
     VALUES ('settings', $1, $2, $3, $4, $5, $6)
     ON CONFLICT (id) DO UPDATE SET
       site_title = EXCLUDED.site_title,
       seo_description = EXCLUDED.seo_description,
       canonical_url = EXCLUDED.canonical_url,
       contact_email = EXCLUDED.contact_email,
       public_visibility = EXCLUDED.public_visibility,
       updated_at = EXCLUDED.updated_at`,
    [
      input.siteTitle,
      input.seoDescription,
      input.canonicalUrl ?? '',
      input.contactEmail ?? '',
      Boolean(input.publicVisibility),
      now,
    ]
  );
  return { message: 'Site settings updated successfully.' };
}

export async function listMediaAssets(): Promise<MediaAsset[]> {
  const result = await query('SELECT * FROM media_assets ORDER BY created_at DESC LIMIT 100');
  return result.rows.map((row) => ({
    _id: String(row.id),
    url: row.url,
    filename: row.filename,
    altText: row.alt || '',
    format: row.format || undefined,
    bytes: row.bytes ? Number(row.bytes) : undefined,
    createdAt: new Date(row.created_at),
  }));
}

export async function saveMediaAsset(input: Omit<MediaAsset, '_id' | 'createdAt'>): Promise<MediaAsset> {
  const now = new Date();
  const result = await query(
    `INSERT INTO media_assets (url, filename, format, bytes, alt, created_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      input.url,
      input.filename,
      input.format ?? null,
      input.bytes ?? null,
      input.altText ?? '',
      now,
    ]
  );

  const row = result.rows[0];
  return {
    _id: String(row.id),
    url: row.url,
    filename: row.filename,
    altText: row.alt || '',
    format: row.format || undefined,
    bytes: row.bytes ? Number(row.bytes) : undefined,
    createdAt: new Date(row.created_at),
  };
}

export async function deleteMediaAsset(id: string): Promise<{ message: string }> {
  const numId = parseId(id);
  const result = await query('DELETE FROM media_assets WHERE id = $1', [numId]);
  if ((result.rowCount ?? 0) === 0) {
    throw new HttpError(404, 'Media asset not found.');
  }
  return { message: 'Media asset deleted successfully.' };
}
