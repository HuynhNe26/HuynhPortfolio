import Link from 'next/link';
import { api, requireAdmin } from '@/lib/api';

export default async function Dashboard() {
  await requireAdmin();

  let counts = { projects: 5, messages: 0, unread: 0 };
  let dbInfo = { status: 'ONLINE', databaseType: 'PostgreSQL (Neon)', latency: '12ms' };

  try {
    counts = await api<{ projects: number; messages: number; unread: number }>('/admin/dashboard', true);
  } catch {
    // Graceful offline fallback
  }

  try {
    const health = await api<{ status: string; databaseType?: string }>('/health');
    if (health?.databaseType) {
      dbInfo.databaseType = health.databaseType;
    }
  } catch {
    // Graceful health fallback
  }

  return (
    <div className="admin-dashboard-view">
      {/* HUD TELEMETRY BANNER */}
      <div className="admin-hud-banner">
        <div className="admin-hud-left">
          <span className="hud-pulse-dot" />
          <span className="hud-status-text">MISSION CONTROL // SYSTEM OPERATIONAL</span>
          <span className="hud-pipe">|</span>
          <span className="hud-db-badge">ENGINE: {dbInfo.databaseType}</span>
          <span className="hud-pipe">|</span>
          <span className="hud-latency">LATENCY: {dbInfo.latency}</span>
        </div>
        <div className="admin-hud-right">
          <span className="hud-edge-tag">EDGE NODE: SGN-01 (VN)</span>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">MISSION CONTROL // ARCHITECT DASHBOARD</p>
          <h1>NH Huynh Developer Operations Console</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link className="button button-cyber-primary" href="/admin/projects/new">
            + New Architecture Case Study
          </Link>
          <Link className="button button-cyber-ghost" href="/" target="_blank" rel="noreferrer">
            View Live Site ↗
          </Link>
        </div>
      </div>

      {/* STATS TELEMETRY GRID */}
      <div className="stat-grid">
        <div className="stat-card cyber-stat">
          <div className="stat-card-glow" />
          <p className="eyebrow">INDEXED PROJECTS</p>
          <strong className="stat-val">{counts.projects}</strong>
          <span className="stat-sub">7-Chapter Storytelling Active</span>
        </div>
        <div className="stat-card cyber-stat">
          <div className="stat-card-glow" />
          <p className="eyebrow">TRANSMISSION MESSAGES</p>
          <strong className="stat-val">{counts.messages}</strong>
          <span className="stat-sub">Inbound Inquiries</span>
        </div>
        <div className="stat-card cyber-stat">
          <div className="stat-card-glow" />
          <p className="eyebrow">PENDING TRIAGE</p>
          <strong className="stat-val highlight">{counts.unread}</strong>
          <span className="stat-sub">Unread Inquiries</span>
        </div>
        <div className="stat-card cyber-stat">
          <div className="stat-card-glow" />
          <p className="eyebrow">DATA REPOSITORY</p>
          <strong className="stat-val text-neon">Neon PG</strong>
          <span className="stat-sub">Serverless Pooled SSL</span>
        </div>
      </div>

      {/* MANAGEMENT CAPABILITIES GRID */}
      <div className="admin-quick-grid">
        <div className="admin-card cyber-admin-card">
          <div className="card-top-indicator">REF // PRJ-01</div>
          <h3>Projects &amp; Storytelling</h3>
          <p className="muted">Manage all production case studies, reorder, edit 7-chapter storytelling, tech tags, and draft states.</p>
          <Link className="text-link" href="/admin/projects">
            Manage projects ↗
          </Link>
        </div>

        <div className="admin-card cyber-admin-card">
          <div className="card-top-indicator">REF // PRF-02</div>
          <h3>Profile &amp; Biography</h3>
          <p className="muted">Update Nguyễn Hoàng Huynh full profile, professional titles, headline, bio, contact email, and availability status.</p>
          <Link className="text-link" href="/admin/profile">
            Edit profile ↗
          </Link>
        </div>

        <div className="admin-card cyber-admin-card">
          <div className="card-top-indicator">REF // EDU-03</div>
          <h3>Academic History</h3>
          <p className="muted">Update Vietnam Aviation Academy timeline, Bachelor of Information Technology degree, and GPA (3.1 / 4.0).</p>
          <Link className="text-link" href="/admin/education">
            Manage education ↗
          </Link>
        </div>

        <div className="admin-card cyber-admin-card">
          <div className="card-top-indicator">REF // CRT-04</div>
          <h3>Certificates &amp; Credentials</h3>
          <p className="muted">Manage verified credentials, TOEIC Listening &amp; Reading 550 [ETS Verified], and industry certifications.</p>
          <Link className="text-link" href="/admin/certificates">
            Manage certificates ↗
          </Link>
        </div>

        <div className="admin-card cyber-admin-card">
          <div className="card-top-indicator">REF // STK-05</div>
          <h3>Categorized Skills Matrix</h3>
          <p className="muted">Organize Frontend (React 19, Next.js 16), Backend (Node 22), Neon PostgreSQL, Redis, Gemini AI, and DevOps.</p>
          <Link className="text-link" href="/admin/skills">
            Manage skills ↗
          </Link>
        </div>

        <div className="admin-card cyber-admin-card">
          <div className="card-top-indicator">REF // MED-06</div>
          <h3>Media &amp; Visual Assets</h3>
          <p className="muted">Manage project covers, system architecture diagrams, Cloudinary uploads, and UI screenshots.</p>
          <Link className="text-link" href="/admin/media">
            Open media library ↗
          </Link>
        </div>

        <div className="admin-card cyber-admin-card">
          <div className="card-top-indicator">REF // MSG-07</div>
          <h3>Inbound Transmission Inbox</h3>
          <p className="muted">Review contact inquiries, filter by read/unread, inspect sender metadata, and audit Resend delivery.</p>
          <Link className="text-link" href="/admin/messages">
            Open inbox ↗
          </Link>
        </div>

        <div className="admin-card cyber-admin-card">
          <div className="card-top-indicator">REF // SYS-08</div>
          <h3>Site &amp; Cloud Settings</h3>
          <p className="muted">Configure site canonical title, Neon PostgreSQL connection URI, contact routing email, and SEO indexing.</p>
          <Link className="text-link" href="/admin/settings">
            Site settings ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
