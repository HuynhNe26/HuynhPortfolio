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

  // Name localized according to user requirements:
  // English name MUST have NO diacritics: Nguyen Hoang Huynh
  const displayName =
    lang === 'zh'
      ? '阮黄兄 (Nguyen Hoang Huynh)'
      : lang === 'en'
      ? 'Nguyen Hoang Huynh'
      : 'Nguyễn Hoàng Huynh';

  return (
    <main id="main-content" className="container section about-standalone-page">
      {/* 1. HERO HEADER INTRO WITH EXECUTIVE SNAPSHOT */}
      <div className="about-hero-intro">
        <div className="about-hero-main">
          <p className="eyebrow">
            {lang === 'vi'
              ? 'HỒ SƠ & TIỂU SỬ KỸ THUẬT'
              : lang === 'zh'
              ? '工程师档案与技术背景'
              : 'ENGINEERING PROFILE & BACKGROUND'}
          </p>
          <h1>
            {lang === 'vi'
              ? 'Kỹ thuật Chính xác, Hiệu năng & Đam mê Sáng tạo'
              : lang === 'zh'
              ? '严谨工程，极致性能与创新探索'
              : 'Precision Engineering, Performance & Curiosity'}
            <span className="brand-dot">.</span>
          </h1>
          <p className="lead-text">
            {lang === 'vi'
              ? 'Tôi là sinh viên năm 3 ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam (GPA 3.1 / 4.0), đam mê phát triển web Full-Stack và tâm huyết xây dựng các sản phẩm số giải quyết vấn đề thực tế với độ hoàn thiện cao.'
              : lang === 'zh'
              ? '现为越南航空学院计算机科学与技术专业三年级本科在读（累计 GPA 3.1 / 4.0），专注于现代 Web 全栈开发、高可用后端架构以及结合 AI 智能体的工作流落地。'
              : 'Third-year Information Technology student at Vietnam Aviation Academy (Cumulative GPA 3.1 / 4.0). Specializing in high-performance web applications, resilient backend architectures, and AI Agentic workflows using TypeScript, Next.js 16, and PostgreSQL Neon.'}
          </p>
        </div>

        {/* RIGHT COLUMN: EXECUTIVE SNAPSHOT WIDGET */}
        <aside className="about-hero-snapshot" aria-label="Executive Engineering Snapshot">
          <div className="snapshot-card-header">
            <span className="snapshot-tag">
              <span className="status-dot live" />
              {lang === 'vi' ? 'Tổng quan Kỹ thuật' : lang === 'zh' ? '工程师核心速览' : 'Technical Snapshot'}
            </span>
            <span className="snapshot-location">
              📍 {lang === 'vi' ? 'TP.HCM & Đồng Nai' : lang === 'zh' ? '胡志明市 & 同奈' : 'HCMC & Dong Nai'}
            </span>
          </div>

          <div className="snapshot-metrics-grid">
            <div className="snapshot-metric-item">
              <span className="metric-icon" aria-hidden="true">🎓</span>
              <div className="metric-content">
                <span className="metric-value">GPA 3.1 / 4.0</span>
                <span className="metric-label">
                  {lang === 'vi' ? 'Học viện Hàng không VN' : lang === 'zh' ? '越南航空学院' : 'Vietnam Aviation Academy'}
                </span>
                <span className="metric-sub">
                  {lang === 'vi' ? 'CNTT Khóa 2023 – Nay' : lang === 'zh' ? '信息技术专业 (2023-至今)' : 'B.S. Information Tech'}
                </span>
              </div>
            </div>

            <div className="snapshot-metric-item">
              <span className="metric-icon" aria-hidden="true">📜</span>
              <div className="metric-content">
                <span className="metric-value">TOEIC 550</span>
                <span className="metric-label">
                  {lang === 'vi' ? 'Chứng chỉ Quốc tế ETS' : lang === 'zh' ? 'ETS 国际认证' : 'ETS International Cert'}
                </span>
                <span className="metric-sub">
                  {lang === 'vi' ? 'Nghe & Đọc hiểu kỹ thuật' : lang === 'zh' ? '英语听读交流' : 'Listening & Reading'}
                </span>
              </div>
            </div>

            <div className="snapshot-metric-item">
              <span className="metric-icon" aria-hidden="true">⚡</span>
              <div className="metric-content">
                <span className="metric-value">Full-Stack</span>
                <span className="metric-label">Next.js 16 • TypeScript</span>
                <span className="metric-sub">
                  {lang === 'vi' ? 'Node.js, PostgreSQL, Redis' : lang === 'zh' ? '现代 Web 全栈体系' : 'Node.js, PostgreSQL, Redis'}
                </span>
              </div>
            </div>

            <div className="snapshot-metric-item">
              <span className="metric-icon" aria-hidden="true">🤖</span>
              <div className="metric-content">
                <span className="metric-value">AI Integration</span>
                <span className="metric-label">Gemini API • Agentic</span>
                <span className="metric-sub">
                  {lang === 'vi' ? 'RAG, Vector & Tự động hóa' : lang === 'zh' ? '智能体工作流落地' : 'RAG, Vector & Automation'}
                </span>
              </div>
            </div>
          </div>

          <div className="snapshot-footer">
            <span className="snapshot-status-pill">
              <span className="status-dot live" />
              {lang === 'vi'
                ? 'Sẵn sàng nhận cơ hội Thực tập & Dự án Web'
                : lang === 'zh'
                ? '开放实习与 Web 全栈项目合作'
                : 'Available for Internship & Full-Stack Projects'}
            </span>
          </div>
        </aside>
      </div>

      <div className="about-grid">
        {/* 2. LEFT SIDEBAR: EXECUTIVE PROFILE CARD */}
        <aside className="about-profile-card">
          <div className="pro-portrait-container" role="img" aria-label={`Portrait of ${displayName}`}>
            <div className="pro-portrait-frame">
              <Image
                src={profile.avatarUrl || '/avatar.jpg'}
                alt={displayName}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="pro-portrait-img"
                unoptimized
                priority
              />
            </div>
            <div className="portrait-badge">
              <span className="status-dot live" />
              <span>
                {lang === 'vi'
                  ? 'Sẵn sàng nhận việc'
                  : lang === 'zh'
                  ? '可随时到岗'
                  : 'Available for Roles'}
              </span>
            </div>
          </div>

          <div className="profile-quick-facts">
            <h3>
              {lang === 'vi'
                ? 'Hồ sơ Cá nhân'
                : lang === 'zh'
                ? '个人基本信息'
                : 'Personal Dossier'}
            </h3>
            <ul className="fact-list">
              <li>
                <span className="fact-label">
                  {lang === 'vi' ? 'Họ và Tên' : lang === 'zh' ? '姓名' : 'Full Name'}
                </span>
                <span className="fact-value">{displayName}</span>
              </li>
              <li>
                <span className="fact-label">
                  {lang === 'vi' ? 'Chuyên môn' : lang === 'zh' ? '核心角色' : 'Role'}
                </span>
                <span className="fact-value">
                  {lang === 'vi'
                    ? 'Lập trình viên Web Full-Stack'
                    : lang === 'zh'
                    ? 'Web 全栈开发工程师'
                    : 'Full-Stack Web Developer'}
                </span>
              </li>
              <li>
                <span className="fact-label">
                  {lang === 'vi' ? 'Ngày sinh' : lang === 'zh' ? '出生日期' : 'Date of Birth'}
                </span>
                <span className="fact-value">26/08/2005</span>
              </li>
              <li>
                <span className="fact-label">
                  {lang === 'vi' ? 'Quê quán' : lang === 'zh' ? '籍贯' : 'Hometown'}
                </span>
                <span className="fact-value">
                  {lang === 'vi'
                    ? 'Đồng Nai, Việt Nam'
                    : lang === 'zh'
                    ? '越南同奈'
                    : 'Dong Nai, Vietnam'}
                </span>
              </li>
              <li>
                <span className="fact-label">
                  {lang === 'vi' ? 'Địa bàn' : lang === 'zh' ? '活动区域' : 'Current Base'}
                </span>
                <span className="fact-value">
                  {lang === 'vi'
                    ? 'Đồng Nai & TP. Hồ Chí Minh'
                    : lang === 'zh'
                    ? '同奈 & 胡志明市'
                    : 'Dong Nai & Ho Chi Minh City'}
                </span>
              </li>
              <li>
                <span className="fact-label">Email</span>
                <a href={`mailto:${profile.email}`} className="fact-value fact-link">
                  {profile.email}
                </a>
              </li>
              <li>
                <span className="fact-label">
                  {lang === 'vi' ? 'Điện thoại' : lang === 'zh' ? '联系电话' : 'Phone'}
                </span>
                <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="fact-value fact-link">
                  {profile.phone}
                </a>
              </li>
            </ul>

            <div className="profile-actions">
              <Link href="/contact" className="button button-pro-primary full-width">
                <span>
                  {lang === 'vi' ? 'Liên hệ Hợp tác' : lang === 'zh' ? '立即沟通' : 'Get in Touch'}
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
              <a
                href={`mailto:${profile.email}?subject=Request CV - ${displayName}`}
                className="button button-pro-secondary full-width"
              >
                <span>
                  {lang === 'vi' ? 'Tải xuống CV' : lang === 'zh' ? '下载个人简历' : 'Download Resume'}
                </span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </aside>

        {/* 3. RIGHT MAIN CONTENT: DETAILED CHAPTERS */}
        <div className="about-details">
          {/* CHAPTER 01: BIOGRAPHY & VISION */}
          <section className="about-narrative">
            <p className="eyebrow">
              {lang === 'vi'
                ? '01 / TIỂU SỬ & ĐỊNH HƯỚNG NGHỀ NGHIỆP'
                : lang === 'zh'
                ? '01 / 个人履历与技术愿景'
                : '01 / BIOGRAPHY & CAREER OUTLOOK'}
            </p>
            <h2>
              {lang === 'vi'
                ? 'Kết nối mã nguồn sạch với trải nghiệm người dùng thực tế.'
                : lang === 'zh'
                ? '以严谨优雅的代码架构连接卓越的用户体验。'
                : 'Connecting clean architecture with human interaction.'}
            </h2>
            <div className="prose-text">
              <p>
                {lang === 'vi'
                  ? 'Hiện là sinh viên năm thứ ba chuyên ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam (GPA 3.1/4.0), tôi liên tục đào sâu nghiên cứu các công nghệ web hiện đại, kỹ thuật xây dựng backend, thiết kế cơ sở dữ liệu, xác thực bảo mật, tích hợp API và kiến trúc phần mềm thực tiễn.'
                  : lang === 'zh'
                  ? '现为越南航空学院计算机科学与技术专业三年级在读本科生（累计 GPA 3.1/4.0），持续深入专研现代 Web 前沿技术、高性能后端构建、数据库架构设计、安全身份认证、API 体系以及实用软件工程架构。'
                  : 'Currently a third-year Information Technology undergraduate at Vietnam Aviation Academy (GPA 3.1 / 4.0), I continuously explore modern full-stack web technologies, resilient backend architecture, robust database design, secure auth workflows, API integrations, and practical software engineering.'}
              </p>
              <p>
                {lang === 'vi'
                  ? 'Mục tiêu trọng tâm của tôi là phát triển các ứng dụng đáng tin cậy, chuẩn SEO, tối ưu hiệu năng và dễ mở rộng. Tôi đam mê tìm hiểu toàn diện kiến trúc hệ thống từ tầng cơ sở dữ liệu phân tán, thiết kế API chuẩn mực đến từng chi tiết giao diện trên thiết bị di động và máy tính.'
                  : lang === 'zh'
                  ? '我的核心方向是构建高可用、高扩展、SEO 友好且极致性能的现代化应用。我热衷于全面理解从分布式数据库层、规范化 API 交互协议到移动端与桌面端像素级视觉层级的整体工程体系。'
                  : 'My primary focus centers on building reliable, SEO-optimized, highly scalable web solutions. I love mastering full-stack architecture end-to-end: from cloud databases and type-safe API contracts to pixel-perfect micro-animations across devices.'}
              </p>
            </div>
          </section>

          {/* CHAPTER 02: EDUCATION & ACADEMIC HIGHLIGHTS */}
          <section className="about-section-block">
            <p className="eyebrow">
              {lang === 'vi'
                ? '02 / HỌC VẤN & BẰNG CẤP'
                : lang === 'zh'
                ? '02 / 教育经历与学术培养'
                : '02 / EDUCATION & ACADEMIC JOURNEY'}
            </p>
            <h2>
              {lang === 'vi'
                ? 'Nền tảng Học vấn & Đào tạo'
                : lang === 'zh'
                ? '学术根基与系统工程培训'
                : 'Academic Foundation & Training'}
            </h2>
            <div className="timeline-cards">
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-period">
                      {lang === 'vi' ? '2023 – Hiện tại' : lang === 'zh' ? '2023 – 至今' : '2023 – Present'}
                    </span>
                    <h3>
                      {lang === 'vi'
                        ? 'Học viện Hàng không Việt Nam (VAA)'
                        : lang === 'zh'
                        ? '越南航空学院 (VAA)'
                        : 'Vietnam Aviation Academy'}
                    </h3>
                  </div>
                  <span className="gpa-pill">GPA 3.1 / 4.0</span>
                </div>
                <p className="timeline-major">
                  {lang === 'vi'
                    ? 'Cử nhân Công nghệ Thông tin (CNTT)'
                    : lang === 'zh'
                    ? '工学学士 • 计算机科学与技术'
                    : 'Bachelor of Science in Information Technology'}
                </p>
                <p className="timeline-note">
                  {lang === 'vi'
                    ? 'Sinh viên năm thứ ba (Khóa 2023 – 2027) • Các môn chuyên ngành tiêu biểu: Phát triển Ứng dụng Web, Cấu trúc Dữ liệu & Giải thuật, Hệ quản trị Cơ sở Dữ liệu (PostgreSQL/SQL), Phân tích Thiết kế Hệ thống Thông tin.'
                    : lang === 'zh'
                    ? '大三在读本科生 (2023 – 2027) • 重点专业课程：Web 应用工程开发、数据结构与算法、数据库管理系统 (PostgreSQL/SQL)、系统分析与设计。'
                    : 'Third-year undergraduate (Class of 2023 – 2027) • Key Coursework: Web Application Development, Data Structures & Algorithms, Database Systems (PostgreSQL/SQL), Software Engineering & Systems Analysis.'}
                </p>
              </div>
            </div>
          </section>

          {/* CHAPTER 03: VERIFIED CERTIFICATIONS */}
          <section className="about-section-block">
            <p className="eyebrow">
              {lang === 'vi'
                ? '03 / CHỨNG CHỈ XÁC THỰC'
                : lang === 'zh'
                ? '03 / 权威资格认证'
                : '03 / VERIFIED CREDENTIALS'}
            </p>
            <h2>
              {lang === 'vi'
                ? 'Chứng chỉ & Văn bằng Quốc tế'
                : lang === 'zh'
                ? '国际权威认证证书'
                : 'International Certifications'}
            </h2>
            <div className="certificate-cards">
              <a
                href="/certificates/toeic-550.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-card certificate-card-interactive"
                title={
                  lang === 'vi'
                    ? 'Nhấn để mở file PDF chứng chỉ chính thức (mở tab mới)'
                    : lang === 'zh'
                    ? '点击在新标签页打开官方证书 PDF'
                    : 'Click to open official certificate PDF in new tab'
                }
              >
                <div className="hh-cert-thumb-preview">
                  <Image
                    src="/certificates/toeic-550-thumb.jpg"
                    alt={`TOEIC Official Score Certificate - ${displayName}`}
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
                    <span className="cert-status-tag">
                      {lang === 'vi' ? 'Chứng nhận chính thức' : lang === 'zh' ? '官方权威验证' : 'Official Verified'}
                    </span>
                  </div>
                  <h3>
                    {lang === 'vi'
                      ? 'TOEIC 550 - Kỹ năng Nghe & Đọc'
                      : lang === 'zh'
                      ? 'TOEIC 550 - 听力与阅读官方认证'
                      : 'TOEIC 550 — Listening & Reading'}
                  </h3>
                  <p className="cert-meta">
                    {lang === 'vi'
                      ? 'Cấp bởi Tổ chức Khảo thí ETS Hoa Kỳ • Tháng 10, 2025'
                      : lang === 'zh'
                      ? '由美国教育考试服务中心 (ETS) 签发 • 2025年10月'
                      : 'Issued by Educational Testing Service (ETS), USA • October 2025'}
                  </p>
                  <div className="cert-bottom-actions">
                    <div className="cert-badge">
                      {lang === 'vi' ? 'Điểm đạt: 550 / 990' : lang === 'zh' ? '考试总分: 550 / 990' : 'Score: 550 / 990'}
                    </div>
                    <span className="cert-view-cta">
                      {lang === 'vi'
                        ? 'Xem chi tiết chứng chỉ (PDF) ↗'
                        : lang === 'zh'
                        ? '查看官方证书详情 (PDF) ↗'
                        : 'View Certificate PDF ↗'}
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <CertificateModal
              isOpen={isCertModalOpen}
              onClose={() => setIsCertModalOpen(false)}
              certificate={{
                name:
                  lang === 'vi'
                    ? 'Chứng chỉ TOEIC Nghe & Đọc (550 / 990)'
                    : lang === 'zh'
                    ? 'TOEIC 听力与阅读官方成绩证书 (550 / 990)'
                    : 'TOEIC Listening & Reading Certificate (550 / 990)',
                issuer: 'ETS (Educational Testing Service)',
                score: '550 / 990',
                issueDate: lang === 'vi' ? 'Tháng 10, 2025' : lang === 'zh' ? '2025年10月' : 'October 2025',
                imageUrl: '/certificates/toeic-550-official.jpg',
              }}
            />
          </section>

          {/* CHAPTER 04: CATEGORIZED TECHNICAL TOOLKIT */}
          <section className="about-section-block">
            <p className="eyebrow">
              {lang === 'vi'
                ? '04 / KỸ NĂNG CHUYÊN MÔN'
                : lang === 'zh'
                ? '04 / 专业技能架构'
                : '04 / TECHNICAL EXPERTISE'}
            </p>
            <h2>
              {lang === 'vi'
                ? 'Hệ sinh thái Công nghệ Phân loại'
                : lang === 'zh'
                ? '分类技术生态与工具栈'
                : 'Categorized Technical Toolkit'}
            </h2>
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
                <h4>{lang === 'vi' ? 'Cơ sở Dữ liệu' : lang === 'zh' ? '数据库系统' : 'Databases & Storage'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.databases.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>{lang === 'vi' ? 'API & Tích hợp Dịch vụ' : lang === 'zh' ? 'API 与云端集成' : 'APIs & Cloud Integrations'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.apis.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group full-width-group">
                <h4>{lang === 'vi' ? 'Công cụ & Triển khai' : lang === 'zh' ? '工程工具与部署运维' : 'Tools & Deployment'}</h4>
                <div className="tags">
                  {profile.skillsCategorized.tools.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CHAPTER 05: CORE ENGINEERING VALUES & WORK ETHIC */}
          <section className="about-section-block">
            <p className="eyebrow">
              {lang === 'vi'
                ? '05 / TRIẾT LÝ & NGUYÊN TẮC LÀM VIỆC'
                : lang === 'zh'
                ? '05 / 核心价值观与研发准则'
                : '05 / CORE VALUES & WORK ETHICS'}
            </p>
            <h2>
              {lang === 'vi'
                ? 'Nguyên tắc Kỹ thuật Xây dựng Sản phẩm'
                : lang === 'zh'
                ? '产品研发工程准则'
                : 'Engineering Principles & Standards'}
            </h2>
            <div className="about-values-grid">
              <div className="about-value-card">
                <div className="value-icon-box">💎</div>
                <h4>{lang === 'vi' ? 'Mã nguồn Sạch & Dễ Bảo trì' : lang === 'zh' ? '整洁代码与高可维护性' : 'Clean & Maintainable Code'}</h4>
                <p>
                  {lang === 'vi'
                    ? 'Tuân thủ các nguyên tắc thiết kế SOLID, DRY, tổ chức cấu trúc module hóa rõ ràng, tự tài liệu hóa và kiểm soát type an toàn tuyệt đối với TypeScript.'
                    : lang === 'zh'
                    ? '遵循 SOLID 与 DRY 架构准则，清晰的模块化拆分，以 TypeScript 全面实现严格类型安全与可预测性。'
                    : 'Adhering to SOLID and DRY paradigms with modular boundaries, self-documenting naming, and 100% strict TypeScript types.'}
                </p>
              </div>

              <div className="about-value-card">
                <div className="value-icon-box">⚡</div>
                <h4>{lang === 'vi' ? 'Tối ưu Hiệu năng & Chuẩn SEO' : lang === 'zh' ? '极致性能与深度 SEO' : 'Performance & SEO First'}</h4>
                <p>
                  {lang === 'vi'
                    ? 'Đảm bảo tốc độ tải trang dưới 1 giây, tối ưu Core Web Vitals, SSR/SSG thông minh, lazy-loading hình ảnh và cấu trúc dữ liệu JSON-LD phong phú.'
                    : lang === 'zh'
                    ? '保障次秒级首屏加载，极致优化 Core Web Vitals，结合智能 SSR/SSG、图片懒加载与完备的 JSON-LD 结构化数据。'
                    : 'Sub-second initial loads, optimal Core Web Vitals, intelligent SSR/SSG rendering, lazy loading, and schema JSON-LD indexing.'}
                </p>
              </div>

              <div className="about-value-card">
                <div className="value-icon-box">🤖</div>
                <h4>{lang === 'vi' ? 'Ứng dụng AI & Đổi mới Thực tiễn' : lang === 'zh' ? 'AI 赋能与实用创新' : 'AI-Driven & Innovation'}</h4>
                <p>
                  {lang === 'vi'
                    ? 'Chủ động đón đầu và tích hợp các mô hình AI Agentic, Gemini API, RAG và tự động hóa để tăng tốc hiệu suất làm việc và giải quyết bài toán phức tạp.'
                    : lang === 'zh'
                    ? '主动拥抱并深度整合 AI Agentic 智能体、Gemini API、RAG 与自动化工程，加速交付并攻克复杂业务痛点。'
                    : 'Proactively leveraging AI Agentic workflows, Gemini API, and RAG architectures to accelerate throughput and solve real problems.'}
                </p>
              </div>

              <div className="about-value-card">
                <div className="value-icon-box">🎯</div>
                <h4>{lang === 'vi' ? 'Lấy Trải nghiệm làm Trọng tâm' : lang === 'zh' ? '以用户体验为核心' : 'User Experience Centric'}</h4>
                <p>
                  {lang === 'vi'
                    ? 'Chăm chút tỉ mỉ từng chi tiết giao diện, khả năng phản hồi mượt mà trên mọi thiết bị và hỗ trợ hoàn hảo cả 2 chế độ Sáng / Tối cùng 3 ngôn ngữ.'
                    : lang === 'zh'
                    ? '细致雕琢每个微交互与动效，全面适配跨端响应式，原生支持明暗双色模式与多语言国际化。'
                    : 'Obsessing over micro-interactions, responsive touch targets, smooth transitions, and seamless Light/Dark themes across 3 languages.'}
                </p>
              </div>
            </div>
          </section>

          {/* 4. BOTTOM CALL-TO-ACTION BANNER */}
          <div className="about-bottom-cta">
            <div className="about-cta-content">
              <h3>
                {lang === 'vi'
                  ? 'Bạn có dự án hoặc cơ hội hợp tác muốn trao đổi?'
                  : lang === 'zh'
                  ? '有项目合作或岗位机会想要沟通？'
                  : 'Have a project or opportunity to discuss?'}
              </h3>
              <p>
                {lang === 'vi'
                  ? 'Tôi luôn sẵn sàng tiếp nhận các cơ hội phát triển web full-stack, thực tập hoặc dự án phần mềm mới.'
                  : lang === 'zh'
                  ? '我随时准备好迎接新的 Web 全栈开发、实习或合作机遇。'
                  : "I'm open to full-stack web engineering roles, internships, and collaborative software projects."}
              </p>
            </div>
            <div className="about-cta-buttons">
              <Link href="/contact" className="button button-pro-primary">
                <span>{lang === 'vi' ? 'Liên hệ ngay' : lang === 'zh' ? '立即联系' : "Let's Talk"}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/projects" className="button button-pro-secondary">
                <span>{lang === 'vi' ? 'Xem các dự án' : lang === 'zh' ? '浏览项目作品' : 'View Projects'}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
