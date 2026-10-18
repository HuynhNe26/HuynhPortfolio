'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Profile } from '@/lib/types';
import { TechBadge } from '@/components/tech-icon';
import { useLanguage } from '@/context/language-context';
import { CertificateModal } from '@/components/certificate-modal';

interface AboutPageClientProps {
  profile: Profile;
}

export function AboutPageClient({ profile }: AboutPageClientProps) {
  const { t, lang } = useLanguage();
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <main id="main-content" className="container section">
      <div className="page-intro">
        <p className="eyebrow">
          {lang === 'vi' ? 'HỒ SƠ & TIỂU SỬ KỸ THUẬT' : 'PROFILE & BACKGROUND'}
        </p>
        <h1>
          {lang === 'vi'
            ? 'Kỹ thuật Chính xác, Hiệu năng & Đam mê Sáng tạo'
            : 'Engineering with precision & curiosity'}
          <span className="brand-dot">.</span>
        </h1>
        <p className="lead-text">
          {lang === 'vi'
            ? 'Tôi là sinh viên năm 3 ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam, đam mê phát triển web Full-Stack và tâm huyết xây dựng các sản phẩm số giải quyết vấn đề thực tế với độ hoàn thiện cao.'
            : profile.introduction}
        </p>
      </div>

      <div className="about-grid">
        <div className="about-profile-card">
          <div className="pro-portrait-container" role="img" aria-label={`Portrait of ${profile.name}`}>
            <div className="pro-portrait-frame">
              <Image
                src={profile.avatarUrl || '/avatar.jpg'}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="pro-portrait-img"
                unoptimized
                priority
              />
            </div>
            <div className="portrait-badge">
              <span className="status-dot live" />
              <span>{lang === 'vi' ? 'Sẵn sàng nhận việc' : 'Available for Roles'}</span>
            </div>
          </div>

          <div className="profile-quick-facts">
            <h3>{lang === 'vi' ? 'Hồ sơ Cá nhân' : 'System Profile'}</h3>
            <ul className="fact-list">
              <li>
                <span className="fact-label">{lang === 'vi' ? 'Họ và Tên' : 'Full Name'}</span>
                <span className="fact-value">{profile.name}</span>
              </li>
              <li>
                <span className="fact-label">{lang === 'vi' ? 'Chuyên môn' : 'Role'}</span>
                <span className="fact-value">{lang === 'vi' ? 'Lập trình viên Web Full-Stack' : profile.title}</span>
              </li>
              <li>
                <span className="fact-label">{lang === 'vi' ? 'Ngày sinh' : 'Date of Birth'}</span>
                <span className="fact-value">{lang === 'vi' ? '26/08/2005' : profile.dateOfBirth}</span>
              </li>
              <li>
                <span className="fact-label">{lang === 'vi' ? 'Quê quán' : 'Hometown'}</span>
                <span className="fact-value">{lang === 'vi' ? 'Đồng Nai, Việt Nam' : profile.hometown}</span>
              </li>
              <li>
                <span className="fact-label">{lang === 'vi' ? 'Địa bàn' : 'Current Base'}</span>
                <span className="fact-value">{lang === 'vi' ? 'Đồng Nai & TP. Hồ Chí Minh' : profile.location}</span>
              </li>
              <li>
                <span className="fact-label">Email</span>
                <a href={`mailto:${profile.email}`} className="text-link">
                  {profile.email}
                </a>
              </li>
              <li>
                <span className="fact-label">{lang === 'vi' ? 'Điện thoại' : 'Phone'}</span>
                <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="text-link">
                  {profile.phone}
                </a>
              </li>
            </ul>

            <div className="profile-actions">
              <Link href="/contact" className="button button-pro-primary full-width">
                {lang === 'vi' ? 'Liên hệ Hợp tác' : 'Get in Touch'}
                <span aria-hidden="true">↗</span>
              </Link>
              <a
                href={`mailto:${profile.email}?subject=Request CV - Nguyễn Hoàng Huynh`}
                className="button button-pro-secondary full-width"
              >
                {lang === 'vi' ? 'Tải xuống CV' : 'Download Resume'}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>

        <div className="about-details">
          <section className="about-narrative">
            <p className="eyebrow">{lang === 'vi' ? '01 / TIỂU SỬ & ĐỊNH HƯỚNG' : '01 / BIOGRAPHY & OUTLOOK'}</p>
            <h2>{lang === 'vi' ? 'Kết nối mã nguồn sạch với trải nghiệm người dùng thực tế.' : 'Connecting clean code with human interaction.'}</h2>
            <div className="prose-text">
              <p>
                {lang === 'vi'
                  ? 'Hiện là sinh viên năm thứ ba chuyên ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam (GPA 3.1/4.0), tôi liên tục đào sâu nghiên cứu các công nghệ web hiện đại, kỹ thuật xây dựng backend, thiết kế cơ sở dữ liệu, xác thực bảo mật, tích hợp API và kiến trúc phần mềm thực tiễn.'
                  : profile.biography}
              </p>
              <p>
                {lang === 'vi'
                  ? 'Mục tiêu trọng tâm của tôi là phát triển các ứng dụng đáng tin cậy, chuẩn SEO, tối ưu hiệu năng và dễ mở rộng. Tôi đam mê tìm hiểu toàn diện kiến trúc hệ thống từ tầng cơ sở dữ liệu phân tán, thiết kế API chuẩn mực đến từng chi tiết giao diện trên thiết bị di động và máy tính.'
                  : 'My focus centers on developing reliable, accessible, and high-performance applications. I enjoy understanding systems from the database layer through API contracts to the pixel-level visual hierarchy on mobile and desktop devices.'}
              </p>
            </div>
          </section>

          <section className="about-section-block">
            <p className="eyebrow">{lang === 'vi' ? '02 / HỌC VẤN & BẰNG CẤP' : '02 / EDUCATION'}</p>
            <h2>{lang === 'vi' ? 'Nền tảng Học vấn & Đào tạo' : 'Academic Foundation'}</h2>
            <div className="timeline-cards">
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-period">{lang === 'vi' ? '2023 – Hiện tại' : '2023 – Present'}</span>
                    <h3>{lang === 'vi' ? 'Học viện Hàng không Việt Nam (VAA)' : 'Vietnam Aviation Academy'}</h3>
                  </div>
                  <span className="gpa-pill">GPA 3.1 / 4.0</span>
                </div>
                <p className="timeline-major">{lang === 'vi' ? 'Cử nhân Công nghệ Thông tin (CNTT)' : 'Bachelor of Science in Information Technology'}</p>
                <p className="timeline-note">{lang === 'vi' ? 'Sinh viên năm thứ ba (Khóa 2023 – 2027)' : 'Third-year university student (as of October 2026)'}</p>
              </div>
            </div>
          </section>

          <section className="about-section-block">
            <p className="eyebrow">{lang === 'vi' ? '03 / CHỨNG CHỈ XÁC THỰC' : '03 / CERTIFICATIONS'}</p>
            <h2>{lang === 'vi' ? 'Chứng chỉ & Văn bằng Quốc tế' : 'Verified Credentials'}</h2>
            <div className="certificate-cards">
              <div
                className="certificate-card certificate-card-interactive"
                onClick={() => setIsCertModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsCertModalOpen(true);
                  }
                }}
                title={lang === 'vi' ? 'Nhấn để xem chứng chỉ chính thức' : 'Click to view official certificate'}
              >
                <div className="hh-cert-thumb-preview">
                  <Image
                    src="/certificates/toeic-550.jpg"
                    alt="TOEIC Official Score Certificate - Nguyễn Hoàng Huynh"
                    width={160}
                    height={115}
                    className="hh-cert-thumb-img"
                  />
                  <div className="hh-cert-thumb-overlay" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>

                <div className="cert-body">
                  <div className="hh-cert-badge-row">
                    <span className="ets-logo-txt-pill">ETS</span>
                    <span className="cert-status-tag">{lang === 'vi' ? 'Chứng nhận chính thức' : 'Official Verified'}</span>
                  </div>
                  <h3>{lang === 'vi' ? 'TOEIC 550 - Kỹ năng Nghe & Đọc' : 'TOEIC Listening & Reading'}</h3>
                  <p className="cert-meta">
                    {lang === 'vi' ? 'Cấp bởi Tổ chức Khảo thí ETS Hoa Kỳ • Tháng 10, 2025' : 'Issued by ETS • October 2025'}
                  </p>
                  <div className="cert-bottom-actions">
                    <div className="cert-badge">{lang === 'vi' ? 'Điểm đạt: 550 / 990' : 'Score: 550 / 990'}</div>
                    <span className="cert-view-cta">
                      {lang === 'vi' ? 'Xem ảnh chứng chỉ ↗' : 'View Certificate ↗'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CertificateModal
              isOpen={isCertModalOpen}
              onClose={() => setIsCertModalOpen(false)}
              certificate={{
                name: lang === 'vi' ? 'Chứng chỉ TOEIC Nghe & Đọc (550 / 990)' : 'TOEIC Listening & Reading Certificate (550 / 990)',
                issuer: 'ETS (Educational Testing Service)',
                score: '550 / 990',
                issueDate: lang === 'vi' ? 'Tháng 10, 2025' : 'October 2025',
                imageUrl: '/certificates/toeic-550.jpg',
              }}
            />
          </section>

          <section className="about-section-block">
            <p className="eyebrow">{lang === 'vi' ? '04 / KỸ NĂNG CHUYÊN MÔN' : '04 / TECHNICAL EXPERTISE'}</p>
            <h2>{lang === 'vi' ? 'Hệ sinh thái Công nghệ Phân loại' : 'Categorized Toolkit'}</h2>
            <div className="skills-categorized-grid">
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'Lập trình Frontend' : 'Frontend Development'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.frontend.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'Kỹ thuật Backend' : 'Backend Engineering'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.backend.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'Cơ sở Dữ liệu' : 'Databases'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.databases.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'API & Tích hợp Dịch vụ' : 'APIs & Integrations'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.apis.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'Công cụ & Triển khai' : 'Tools & Deployment'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.tools.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
