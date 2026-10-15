import Link from 'next/link';
import { api, requireAdmin } from '@/lib/api';

export default async function Dashboard() {
  await requireAdmin();

  let counts = { projects: 5, messages: 0, unread: 0 };
  try {
    counts = await api<{ projects: number; messages: number; unread: number }>('/admin/dashboard', true);
  } catch {
    // Graceful offline fallback
  }

  return (
    <div className="admin-dashboard-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR PORTFOLIO, AT A GLANCE</p>
          <h1>Welcome to NH Huynh Studio.</h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link className="button button-dark" href="/admin/projects/new">
            New project +
          </Link>
          <Link className="button button-light" href="/" target="_blank" rel="noreferrer">
            View Live Site ↗
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <p className="eyebrow">TOTAL PROJECTS</p>
          <strong>{counts.projects}</strong>
        </div>
        <div className="stat-card">
          <p className="eyebrow">CONTACT MESSAGES</p>
          <strong>{counts.messages}</strong>
        </div>
        <div className="stat-card">
          <p className="eyebrow">UNREAD MESSAGES</p>
          <strong>{counts.unread}</strong>
        </div>
      </div>

      <div className="admin-quick-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBlock: '36px' }}>
        <div className="admin-card">
          <h3>Projects & Storytelling</h3>
          <p className="muted">Manage all 5 case studies, reorder, edit 7-chapter storytelling, and manage drafts.</p>
          <Link className="text-link" href="/admin/projects">
            Manage projects ↗
          </Link>
        </div>

        <div className="admin-card">
          <h3>Profile & Biography</h3>
          <p className="muted">Update full name, professional title, introduction, dates, hometown, and social links.</p>
          <Link className="text-link" href="/admin/profile">
            Edit profile ↗
          </Link>
        </div>

        <div className="admin-card">
          <h3>Academic History</h3>
          <p className="muted">Update Vietnam Aviation Academy timeline, degree, and GPA (3.1/4.0).</p>
          <Link className="text-link" href="/admin/education">
            Manage education ↗
          </Link>
        </div>

        <div className="admin-card">
          <h3>Certificates</h3>
          <p className="muted">Manage verified credentials, TOEIC Listening & Reading 550, and future certs.</p>
          <Link className="text-link" href="/admin/certificates">
            Manage certificates ↗
          </Link>
        </div>

        <div className="admin-card">
          <h3>Categorized Skills</h3>
          <p className="muted">Organize Frontend, Backend, Databases, APIs & Integrations, and Tools.</p>
          <Link className="text-link" href="/admin/skills">
            Manage skills ↗
          </Link>
        </div>

        <div className="admin-card">
          <h3>Media Library</h3>
          <p className="muted">Manage project covers, diagrams, Cloudinary URLs, and screenshot assets.</p>
          <Link className="text-link" href="/admin/media">
            Open media library ↗
          </Link>
        </div>

        <div className="admin-card">
          <h3>Inbox & Messages</h3>
          <p className="muted">Review contact inquiries, filter by read/unread, and audit Resend delivery status.</p>
          <Link className="text-link" href="/admin/messages">
            Open inbox ↗
          </Link>
        </div>

        <div className="admin-card">
          <h3>Site Settings</h3>
          <p className="muted">Configure site title, canonical URL, contact routing email, and search metadata.</p>
          <Link className="text-link" href="/admin/settings">
            Site settings ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
