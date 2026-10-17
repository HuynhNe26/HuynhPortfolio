'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MutationButton } from '@/components/forms';

type IconName =
  | 'dashboard' | 'pages' | 'projects' | 'education' | 'certificates'
  | 'skills' | 'messages' | 'media' | 'settings' | 'external';

const ICON_PATHS: Record<IconName, string> = {
  dashboard: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
  pages: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
  projects: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  education: 'M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5',
  certificates: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.2 13.9 7 22l5-3 5 3-1.2-8.1',
  skills: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  messages: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  media: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  external: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3',
};

export function AdminIcon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/profile', label: 'Trang & Hồ sơ', icon: 'pages' },
  { href: '/admin/projects', label: 'Dự án', icon: 'projects' },
  { href: '/admin/education', label: 'Học vấn', icon: 'education' },
  { href: '/admin/certificates', label: 'Chứng chỉ', icon: 'certificates' },
  { href: '/admin/skills', label: 'Kỹ năng', icon: 'skills' },
  { href: '/admin/messages', label: 'Tin nhắn liên hệ', icon: 'messages' },
  { href: '/admin/media', label: 'Thư viện Media', icon: 'media' },
  { href: '/admin/settings', label: 'Cài đặt', icon: 'settings' },
];

export function AdminSidebar({ unread = 0 }: { unread?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <>
      <button
        type="button"
        className="hh-admin-burger"
        aria-label="Mở menu quản trị"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>

      <aside className={`hh-admin-sidebar ${open ? 'is-open' : ''}`}>
        <Link href="/admin" className="hh-admin-logo" aria-label="Dashboard">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M6 7V25M6 16H16M16 7V25M16 16H26M26 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
          <span className="hh-admin-logo-text">
            <strong>Huynh Studio</strong>
            <small>Portfolio CMS</small>
          </span>
        </Link>

        <nav className="hh-admin-nav" aria-label="Quản trị">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hh-admin-nav-link ${isActive(item.href) ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <AdminIcon name={item.icon} />
              <span>{item.label}</span>
              {item.icon === 'messages' && unread > 0 && (
                <em className="hh-admin-nav-badge">{unread}</em>
              )}
            </Link>
          ))}
        </nav>

        <div className="hh-admin-sidebar-foot">
          <Link href="/" target="_blank" rel="noreferrer" className="hh-admin-nav-link">
            <AdminIcon name="external" />
            <span>Xem website</span>
          </Link>
          <div className="hh-admin-signout">
            <MutationButton endpoint="/api/auth/logout" method="POST" label="Đăng xuất" redirectTo="/admin/login" />
          </div>
        </div>
      </aside>

      {open && <div className="hh-admin-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
}
