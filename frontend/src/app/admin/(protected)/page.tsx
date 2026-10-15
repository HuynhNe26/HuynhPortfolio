import Link from 'next/link';
import { api, requireAdmin } from '@/lib/api';

export default async function Dashboard() {
  await requireAdmin();
  const counts = await api<{ projects: number; messages: number; unread: number; }>('/admin/dashboard', true);

  return (
    <>
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            YOUR PORTFOLIO, AT A GLANCE
          </p>
          <h1>
            Welcome to your studio.
          </h1>
        </div>
        <Link className="button button-dark" href="/admin/projects/new">
          New project +
        </Link>
      </div>
      <div className="stat-grid">
        {Object.entries(counts).map(([label, value]) => (
          <div className="stat-card" key={label}>
            <p className="eyebrow">
              {label}
            </p>
            <strong>
              {value}
            </strong>
          </div>
        ))}
      </div>
      <div className="form-panel">
        <h2>
          Make it yours.
        </h2>
        <p>
          Add your profile, write your first project story, and publish when you’re ready. Draft projects are visible only here.
        </p>
        <Link className="text-link" href="/admin/profile">
          Edit your profile ↗
        </Link>
      </div>
    </>
  );
}
