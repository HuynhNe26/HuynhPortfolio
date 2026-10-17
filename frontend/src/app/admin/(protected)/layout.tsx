import Image from 'next/image';
import { api, publicContent, requireAdmin } from '@/lib/api';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode; }) {
  await requireAdmin();

  let unread = 0;
  try {
    const counts = await api<{ unread: number }>('/admin/dashboard', true);
    unread = counts.unread || 0;
  } catch {
    // Badge is optional
  }

  const { profile } = await publicContent();

  return (
    <div className="hh-admin">
      <AdminSidebar unread={unread} />

      <div className="hh-admin-main">
        <header className="hh-admin-topbar">
          <div className="hh-admin-search" role="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <span>Quản lý nội dung portfolio</span>
          </div>

          <div className="hh-admin-user">
            <Image
              src={profile.avatarUrl || '/avatar.jpg'}
              alt={profile.name}
              width={36}
              height={36}
              className="hh-admin-user-avatar"
            />
            <div className="hh-admin-user-meta">
              <strong>{profile.name}</strong>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <main id="main-content" className="hh-admin-content admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
