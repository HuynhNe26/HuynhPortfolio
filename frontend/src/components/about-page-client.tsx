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
                {lang === 'vi' ? 'Liên hệ Hợp tác' : lang === 'zh' ? '保持联系' : 'Get in Touch'}
                <span aria-hidden="true">↗</span>
              </Link>
              <a
                href={`mailto:${profile.email}?subject=Request CV - Nguyễn Hoàng Huynh`}
                className="button button-pro-secondary full-width"
              >
                {lang === 'vi' ? 'Tải xuống CV' : lang === 'zh' ? '下载个人简历' : 'Download Resume'}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>

        <div className="about-details">
          <section className="about-narrative">
            <p className="eyebrow">{lang === 'vi' ? '01 / TIỂU SỬ & ĐỊNH HƯỚNG' : lang === 'zh' ? '01 / 个人履历与愿景' : '01 / BIOGRAPHY & OUTLOOK'}</p>
            <h2>{lang === 'vi' ? 'Kết nối mã nguồn sạch với trải nghiệm người dùng thực tế.' : lang === 'zh' ? '以优雅的代码架构连接卓越的用户体验。' : 'Connecting clean code with human interaction.'}</h2>
            <div className="prose-text">
              <p>
                {lang === 'vi'
                  ? 'Hiện là sinh viên năm thứ ba chuyên ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam (GPA 3.1/4.0), tôi liên tục đào sâu nghiên cứu các công nghệ web hiện đại, kỹ thuật xây dựng backend, thiết kế cơ sở dữ liệu, xác thực bảo mật, tích hợp API và kiến trúc phần mềm thực tiễn.'
                  : lang === 'zh'
                  ? '现为越南航空学院计算机科学与技术专业三年级在读本科生（累计 GPA 3.1/4.0），持续深入专研现代 Web 前沿技术、高性能后端构建、数据库架构设计、安全身份认证、API 体系以及实用软件工程架构。'
                  : profile.biography}
              </p>
              <p>
                {lang === 'vi'
                  ? 'Mục tiêu trọng tâm của tôi là phát triển các ứng dụng đáng tin cậy, chuẩn SEO, tối ưu hiệu năng và dễ mở rộng. Tôi đam mê tìm hiểu toàn diện kiến trúc hệ thống từ tầng cơ sở dữ liệu phân tán, thiết kế API chuẩn mực đến từng chi tiết giao diện trên thiết bị di động và máy tính.'
                  : lang === 'zh'
                  ? '我的核心方向是构建高可用、高扩展、SEO 友好且极致性能的现代化应用。我热衷于全面理解从分布式数据库层、规范化 API 交互协议到移动端与桌面端像素级视觉层级的整体工程体系。'
                  : 'My focus centers on developing reliable, accessible, and high-performance applications. I enjoy understanding systems from the database layer through API contracts to the pixel-level visual hierarchy on mobile and desktop devices.'}
              </p>
            </div>
          </section>

          <section className="about-section-block">
            <p className="eyebrow">{lang === 'vi' ? '02 / HỌC VẤN & BẰNG CẤP' : lang === 'zh' ? '02 / 教育经历与背景' : '02 / EDUCATION'}</p>
            <h2>{lang === 'vi' ? 'Nền tảng Học vấn & Đào tạo' : lang === 'zh' ? '教育与学术培养' : 'Academic Foundation'}</h2>
            <div className="timeline-cards">
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-period">{lang === 'vi' ? '2023 – Hiện tại' : lang === 'zh' ? '2023 – 至今' : '2023 – Present'}</span>
                    <h3>{lang === 'vi' ? 'Học viện Hàng không Việt Nam (VAA)' : lang === 'zh' ? '越南航空学院 (VAA)' : 'Vietnam Aviation Academy'}</h3>
                  </div>
                  <span className="gpa-pill">GPA 3.1 / 4.0</span>
                </div>
                <p className="timeline-major">{lang === 'vi' ? 'Cử nhân Công nghệ Thông tin (CNTT)' : lang === 'zh' ? '工学学士 • 计算机科学与技术' : 'Bachelor of Science in Information Technology'}</p>
                <p className="timeline-note">{lang === 'vi' ? 'Sinh viên năm thứ ba (Khóa 2023 – 2027)' : lang === 'zh' ? '大三在读本科生 (2023 – 2027)' : 'Third-year university student (as of October 2026)'}</p>
              </div>
            </div>
          </section>

          <section className="about-section-block">
            <p className="eyebrow">{lang === 'vi' ? '03 / CHỨNG CHỈ XÁC THỰC' : lang === 'zh' ? '03 / 权威资格认证' : '03 / CERTIFICATIONS'}</p>
            <h2>{lang === 'vi' ? 'Chứng chỉ & Văn bằng Quốc tế' : lang === 'zh' ? '权威认证证书' : 'Verified Credentials'}</h2>
            <div className="certificate-cards">
              <a
                href="/certificates/toeic-550.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-card certificate-card-interactive"
                title={lang === 'vi' ? 'Nhấn để mở file PDF chứng chỉ chính thức (mở tab mới)' : lang === 'zh' ? '点击在新标签页打开官方证书 PDF' : 'Click to open official certificate PDF in new tab'}
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
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>
                </div>

                <div className="cert-body">
                  <div className="hh-cert-badge-row">
                    <span className="ets-logo-txt-pill">ETS</span>
                    <span className="cert-status-tag">{lang === 'vi' ? 'Chứng nhận chính thức' : lang === 'zh' ? '官方权威验证' : 'Official Verified'}</span>
                  </div>
                  <h3>{lang === 'vi' ? 'TOEIC 550 - Kỹ năng Nghe & Đọc' : lang === 'zh' ? 'TOEIC 550 - 听力与阅读' : 'TOEIC Listening & Reading'}</h3>
                  <p className="cert-meta">
                    {lang === 'vi' ? 'Cấp bởi Tổ chức Khảo thí ETS Hoa Kỳ • Tháng 10, 2025' : lang === 'zh' ? '由美国教育考试服务中心 (ETS) 签发 • 2025年10月' : 'Issued by ETS • October 2025'}
                  </p>
                  <div className="cert-bottom-actions">
                    <div className="cert-badge">{lang === 'vi' ? 'Điểm đạt: 550 / 990' : lang === 'zh' ? '考试总分: 550 / 990' : 'Score: 550 / 990'}</div>
                    <span className="cert-view-cta">
                      {lang === 'vi' ? 'Xem chi tiết chứng chỉ (PDF) ↗' : lang === 'zh' ? '查看官方证书详情 (PDF) ↗' : 'View Certificate PDF ↗'}
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <CertificateModal
              isOpen={isCertModalOpen}
              onClose={() => setIsCertModalOpen(false)}
              certificate={{
                name: lang === 'vi' ? 'Chứng chỉ TOEIC Nghe & Đọc (550 / 990)' : lang === 'zh' ? 'TOEIC 听力与阅读官方成绩证书 (550 / 990)' : 'TOEIC Listening & Reading Certificate (550 / 990)',
                issuer: 'ETS (Educational Testing Service)',
                score: '550 / 990',
                issueDate: lang === 'vi' ? 'Tháng 10, 2025' : lang === 'zh' ? '2025年10月' : 'October 2025',
                imageUrl: '/certificates/toeic-550.jpg',
              }}
            />
          </section>

          <section className="about-section-block">
            <p className="eyebrow">{lang === 'vi' ? '04 / KỸ NĂNG CHUYÊN MÔN' : lang === 'zh' ? '04 / 专业技能架构' : '04 / TECHNICAL EXPERTISE'}</p>
            <h2>{lang === 'vi' ? 'Hệ sinh thái Công nghệ Phân loại' : lang === 'zh' ? '分类技术生态与工具栈' : 'Categorized Toolkit'}</h2>
            <div className="skills-categorized-grid">
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'Lập trình Frontend' : lang === 'zh' ? '前端技术栈' : 'Frontend Development'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.frontend.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'Kỹ thuật Backend' : lang === 'zh' ? '后端技术工程' : 'Backend Engineering'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.backend.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'Cơ sở Dữ liệu' : lang === 'zh' ? '数据库系统' : 'Databases'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.databases.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'API & Tích hợp Dịch vụ' : lang === 'zh' ? 'API 与云端集成' : 'APIs & Integrations'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.apis.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'Công cụ & Triển khai' : lang === 'zh' ? '工程工具与部署' : 'Tools & Deployment'}</h4>
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
