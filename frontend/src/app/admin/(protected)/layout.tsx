import Link from 'next/link';
import { requireAdmin } from '@/lib/api';
import { MutationButton } from '@/components/forms';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode; }) {
  await requireAdmin();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="wordmark" href="/">
          NH HUYNH.
        </Link>
        <p className="eyebrow">
          PORTFOLIO STUDIO
        </p>
        <nav aria-label="Administration">
          <Link href="/admin">
            Overview
          </Link>
          <Link href="/admin/projects">
            Projects
          </Link>
          <Link href="/admin/profile">
            Profile
          </Link>
          <Link href="/admin/messages">
            Inbox
          </Link>
          <Link href="/">
            View website ↗
          </Link>
        </nav>
        <MutationButton endpoint="/api/auth/logout" method="POST" label="Sign out" redirectTo="/admin/login" />
      </aside>
      <main id="main-content" className="admin-content">
        {children}
      </main>
    </div>
  );
}
