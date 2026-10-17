import Image from 'next/image';
import Link from 'next/link';
import { api, publicContent, requireAdmin } from '@/lib/api';
import type { Message } from '@/lib/types';
import { AdminIcon } from '@/components/admin/admin-sidebar';

function timeAgo(iso: string) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Vừa xong';
  if (m < 60) return `${m} phút trước`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} giờ trước`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} ngày trước`;
  return new Date(iso).toLocaleDateString('vi-VN');
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');
}

const AVATAR_TONES = ['#2563EB', '#7C3AED', '#DB2777', '#059669', '#EA580C', '#0891B2'];

export default async function Dashboard() {
  await requireAdmin();

  const { profile, projects } = await publicContent();

  let counts = { projects: projects.length, messages: 0, unread: 0 };
  try {
    counts = await api<{ projects: number; messages: number; unread: number }>('/admin/dashboard', true);
  } catch {
    // Offline fallback
  }

  let messages: Message[] = [];
  try {
    messages = await api<Message[]>('/admin/messages', true);
  } catch {
    // Offline fallback
  }

  const skillsCount = Object.values(profile.skillsCategorized || {}).reduce(
    (sum, list) => sum + (Array.isArray(list) ? list.length : 0),
    0,
  );
  const certCount = profile.certificates?.length || 0;

  const stats = [
    { label: 'Dự án', value: counts.projects, href: '/admin/projects', icon: 'projects' as const, tone: 'blue' },
    { label: 'Kỹ năng', value: skillsCount, href: '/admin/skills', icon: 'skills' as const, tone: 'violet' },
    { label: 'Chứng chỉ', value: certCount, href: '/admin/certificates', icon: 'certificates' as const, tone: 'amber' },
    { label: 'Tin nhắn', value: counts.messages, href: '/admin/messages', icon: 'messages' as const, tone: 'green', extra: counts.unread ? `${counts.unread} chưa đọc` : undefined },
  ];

  const recent = messages.slice(0, 5);

  return (
    <div className="hh-dash">
      <div className="hh-dash-head">
        <div>
          <h1>Dashboard</h1>
          <p>Quản lý toàn bộ nội dung portfolio của bạn</p>
        </div>
        <div className="hh-dash-head-actions">
          <Link href="/" target="_blank" rel="noreferrer" className="hh-dash-btn ghost">
            <AdminIcon name="external" size={16} /> Xem website
          </Link>
          <Link href="/admin/projects/new" className="hh-dash-btn solid">
            + Thêm dự án
          </Link>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="hh-dash-stats">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`hh-stat-card tone-${s.tone}`}>
            <div className="hh-stat-top">
              <span className="hh-stat-icon"><AdminIcon name={s.icon} size={18} /></span>
              <span className="hh-stat-arrow" aria-hidden="true">→</span>
            </div>
            <strong className="hh-stat-value">{s.value}</strong>
            <span className="hh-stat-label">{s.label}</span>
            {s.extra && <span className="hh-stat-extra">{s.extra}</span>}
          </Link>
        ))}
      </div>

      <div className="hh-dash-grid">
        {/* RECENT MESSAGES */}
        <section className="hh-dash-card">
          <div className="hh-dash-card-head">
            <h2>Tin nhắn gần đây</h2>
            <Link href="/admin/messages" className="hh-dash-link">Xem tất cả →</Link>
          </div>

          {recent.length === 0 ? (
            <div className="hh-dash-empty">
              <AdminIcon name="messages" size={28} />
              <p>Chưa có tin nhắn nào. Tin nhắn từ form liên hệ sẽ hiển thị tại đây.</p>
            </div>
          ) : (
            <ul className="hh-msg-list">
              {recent.map((m, i) => (
                <li key={m._id} className={`hh-msg-row ${m.status === 'unread' ? 'is-unread' : ''}`}>
                  <span className="hh-msg-avatar" style={{ background: AVATAR_TONES[i % AVATAR_TONES.length] }}>
                    {initials(m.name)}
                  </span>
                  <div className="hh-msg-who">
                    <strong>{m.name}</strong>
                    <span>{m.email}</span>
                  </div>
                  <p className="hh-msg-text">{m.message}</p>
                  <time className="hh-msg-time" dateTime={m.createdAt}>{timeAgo(m.createdAt)}</time>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* SIDE COLUMN */}
        <div className="hh-dash-side">
          <section className="hh-dash-card">
            <div className="hh-dash-card-head">
              <h2>Thao tác nhanh</h2>
            </div>
            <div className="hh-quick-grid">
              <Link href="/admin/projects/new" className="hh-quick-item"><AdminIcon name="projects" /> Dự án mới</Link>
              <Link href="/admin/profile" className="hh-quick-item"><AdminIcon name="pages" /> Sửa hồ sơ</Link>
              <Link href="/admin/media" className="hh-quick-item"><AdminIcon name="media" /> Tải ảnh lên</Link>
              <Link href="/admin/settings" className="hh-quick-item"><AdminIcon name="settings" /> Cài đặt</Link>
            </div>
          </section>

          <section className="hh-dash-card">
            <div className="hh-dash-card-head">
              <h2>Dự án</h2>
              <Link href="/admin/projects" className="hh-dash-link">Quản lý →</Link>
            </div>
            <ul className="hh-proj-list">
              {projects.slice(0, 5).map((p) => (
                <li key={p._id || p.slug}>
                  <Link href={p._id && !p._id.startsWith('default') ? `/admin/projects/${p._id}` : '/admin/projects'} className="hh-proj-row">
                    <span className="hh-proj-thumb">
                      <Image src={p.coverUrl || '/projects/ticket-concert-hero.png'} alt="" width={48} height={34} unoptimized />
                    </span>
                    <span className="hh-proj-meta">
                      <strong>{p.title}</strong>
                      <small>{p.category}</small>
                    </span>
                    <span className={`hh-proj-status ${p.status === 'Ongoing' ? 'ongoing' : 'done'}`}>
                      {p.status === 'Ongoing' ? 'Đang làm' : 'Hoàn thành'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
