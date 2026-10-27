'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/types';
import { TechIcon } from '@/components/tech-icon';
import { useLanguage, type Language } from '@/context/language-context';
import { getLocalizedProject } from '@/lib/project-translations';
import { useProjectLoading } from '@/components/project-loading-overlay';

interface FeaturedProjectsGridProps {
  projects: Project[];
}

interface ProjectTiltCardProps {
  project: Project;
  categoryTag: string;
}

export const REAL_WORLD_PROJECT_SLUGS = [
  'fashion-nail-morley',
  'vk-digital-hub',
  'examplatform-ai',
];

export function isRealWorldProject(slug: string): boolean {
  return REAL_WORLD_PROJECT_SLUGS.includes(slug);
}

/**
 * Format any timeline string into standard Month/Year (MM/YYYY) format
 * Examples:
 * - "August 2025 – April 2026" -> "08/2025 – 04/2026"
 * - "April 2026 – Present" -> "04/2026 – Hiện tại" (vi) / "04/2026 – Present" (en)
 * - "September 2026 – October 2026" -> "09/2026 – 10/2026"
 */
export function formatTimelineMonthYear(rawTimeline?: string, lang: Language = 'vi'): string {
  if (!rawTimeline) return '';

  const monthMap: Record<string, string> = {
    january: '01', jan: '01',
    february: '02', feb: '02',
    march: '03', mar: '03',
    april: '04', apr: '04',
    may: '05',
    june: '06', jun: '06',
    july: '07', jul: '07',
    august: '08', aug: '08',
    september: '09', sep: '09', sept: '09',
    october: '10', oct: '10',
    november: '11', nov: '11',
    december: '12', dec: '12',
    'tháng 1': '01', 'tháng 01': '01',
    'tháng 2': '02', 'tháng 02': '02',
    'tháng 3': '03', 'tháng 03': '03',
    'tháng 4': '04', 'tháng 04': '04',
    'tháng 5': '05', 'tháng 05': '05',
    'tháng 6': '06', 'tháng 06': '06',
    'tháng 7': '07', 'tháng 07': '07',
    'tháng 8': '08', 'tháng 08': '08',
    'tháng 9': '09', 'tháng 09': '09',
    'tháng 10': '10',
    'tháng 11': '11',
    'tháng 12': '12',
  };

  let formatted = rawTimeline;

  // Replace English/Vietnamese month name + 4-digit year with MM/YYYY
  formatted = formatted.replace(/\b([a-zA-ZÀ-ỹ\s]+?)\s+(\d{4})\b/g, (match, monthStr, year) => {
    const key = monthStr.trim().toLowerCase();
    if (monthMap[key]) {
      return `${monthMap[key]}/${year}`;
    }
    return match;
  });

  // Handle "Present" / "Now" / "Hiện tại"
  const presentText = lang === 'vi' ? 'Hiện tại' : (lang === 'zh' ? '至今' : 'Present');
  formatted = formatted.replace(/\b(present|now|hiện tại)\b/gi, presentText);

  // Normalize dash
  formatted = formatted.replace(/\s*[-–—]\s*/g, ' – ');

  return formatted;
}

function ProjectTiltCard({ project, categoryTag }: ProjectTiltCardProps) {
  const { t, lang } = useLanguage();
  const { showLoading } = useProjectLoading();
  const router = useRouter();
  const isRealWorld = isRealWorldProject(project.slug);
  const cardRef = useRef<HTMLDivElement>(null);
  const backlightRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // If theme sweep is running, freeze 3D tilt to prevent GPU composite glitching
    if (
      typeof document !== 'undefined' &&
      (document.documentElement.hasAttribute('data-theme-switching') ||
        document.documentElement.hasAttribute('data-theme-sweeping'))
    ) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Relative mouse offset from center (-1 to 1)
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    // Premium, noticeable 3D tilt (8.5deg for natural responsiveness)
    const maxTilt = 8.5;
    const rotateX = (-percentY * maxTilt).toFixed(2);
    const rotateY = (percentX * maxTilt).toFixed(2);

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      // 1. Tilt card in 3D
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.018, 1.018, 1.018)`;
        card.style.transition = 'transform 0.08s ease-out';
      }

      // 2. Light BEHIND the card follows cursor position in real-time
      if (backlightRef.current) {
        backlightRef.current.style.opacity = '0.85';
        backlightRef.current.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, var(--card-glow, #38BDF8) 0%, transparent 75%)`;
        backlightRef.current.style.transform = `translate3d(${percentX * 20}px, ${percentY * 20}px, 0)`;
      }

      // 3. Ambient glow on card surface follows cursor
      if (ambientRef.current) {
        ambientRef.current.style.opacity = '0.22';
        ambientRef.current.style.background = `radial-gradient(circle 360px at ${x}px ${y}px, var(--card-glow, #38BDF8) 0%, transparent 65%)`;
      }

      // 4. Specular glare highlight on card surface follows cursor
      if (glareRef.current) {
        glareRef.current.style.opacity = '0.6';
        glareRef.current.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, rgba(255, 255, 255, 0.45) 0%, transparent 65%)`;
      }
    });
  };

  const handleMouseEnter = () => {
    if (
      typeof document !== 'undefined' &&
      (document.documentElement.hasAttribute('data-theme-switching') ||
        document.documentElement.hasAttribute('data-theme-sweeping'))
    ) {
      return;
    }
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.15s ease-out, border-color 0.35s ease, box-shadow 0.35s ease';
    }
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (backlightRef.current) {
      backlightRef.current.style.opacity = '0';
      backlightRef.current.style.transform = '';
      backlightRef.current.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    }
    if (ambientRef.current) {
      ambientRef.current.style.opacity = '0.06';
      ambientRef.current.style.transition = 'opacity 0.4s ease';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
      glareRef.current.style.transition = 'opacity 0.4s ease';
    }
  };

  const glowColor = project.themeColor || '#2563EB';
  const localized = getLocalizedProject(project, lang);
  const formattedTimeline = formatTimelineMonthYear(project.timeline, lang);
  const displayTechs = project.technologies?.slice(0, 4) || [];
  const remainingCount = (project.technologies?.length || 0) - displayTechs.length;

  return (
    <article
      ref={cardRef}
      className="hh-project-card"
      style={{ '--card-glow': glowColor } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        // Allow clicking card background to navigate, but let all anchors and buttons handle their own clicks
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button')) return;
        showLoading(project.slug);
        router.push(`/projects/${project.slug}`);
      }}
    >
      {/* 1. DYNAMIC AMBIENT BACKLIGHT BEHIND THE CARD (FLOATS OUTSIDE BEHIND CARD, TRACKS MOUSE) */}
      <div ref={backlightRef} className="hh-card-backlight-glow" aria-hidden="true" />

      {/* 2. AMBIENT GLOW ON CARD SURFACE (TRACKS MOUSE) */}
      <div ref={ambientRef} className="hh-project-card-ambient" aria-hidden="true" />

      {/* 3. DYNAMIC SPECULAR GLARE SPOTLIGHT (TRACKS MOUSE) */}
      <div ref={glareRef} className="hh-project-card-glare" aria-hidden="true" />

      {/* IMAGE PREVIEW FRAME (CLICKABLE TO CASE STUDY) */}
      <Link
        href={`/projects/${project.slug}`}
        className="hh-card-image-box"
      >
        <Image
          src={project.coverUrl || '/projects/ticket-concert-hero.png'}
          alt={localized.title}
          width={720}
          height={460}
          className="hh-card-img"
          loading="lazy"
          decoding="async"
          unoptimized
        />
        {/* CATEGORY / REAL-WORLD PILL ON IMAGE */}
        {isRealWorld ? (
          <span className="hh-card-cat-badge real-world" title={t('card.realWorldBadge')}>
            <span className="hh-real-world-star" aria-hidden="true">★</span>
            <span>{t('card.realWorldBadge')}</span>
          </span>
        ) : (
          <span className="hh-card-cat-badge">
            {categoryTag}
          </span>
        )}
        {/* STATUS PILL ON TOP RIGHT */}
        <span className={`hh-card-status-badge ${project.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>
          <span className="hh-status-dot-ping" />
          <span>
            {project.status === 'Ongoing'
              ? (lang === 'vi' ? 'Đang phát triển' : (lang === 'zh' ? '进行中' : 'Ongoing'))
              : (lang === 'vi' ? 'Hoàn thành' : (lang === 'zh' ? '已完成' : 'Completed'))}
          </span>
        </span>
      </Link>

      {/* CARD BODY CONTENT */}
      <div className="hh-card-content">
        {/* PROJECT TITLE */}
        <Link
          href={`/projects/${project.slug}`}
          className="hh-card-title-link"
        >
          <h3 className="hh-card-title">{localized.title}</h3>
        </Link>

        {/* PROJECT SUMMARY / MÔ TẢ DỰ ÁN */}
        {localized.summary && (
          <p className="hh-card-summary" title={localized.summary}>
            {localized.summary}
          </p>
        )}

        {/* 1. VAI TRÒ & 2. THỜI GIAN THEO THÁNG/NĂM */}
        <div className="hh-card-meta-grid">
          <div className="hh-card-meta-box">
            <span className="hh-meta-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span>{t('featured.role')}</span>
            </span>
            <span className="hh-meta-val" title={localized.role}>
              {localized.role}
            </span>
          </div>

          <div className="hh-card-meta-box">
            <span className="hh-meta-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{t('featured.timeline')}</span>
            </span>
            <span className="hh-meta-val" title={formattedTimeline}>
              {formattedTimeline}
            </span>
          </div>
        </div>

        {/* 3. CÔNG NGHỆ SỬ DỤNG */}
        <div className="hh-card-techs-section">
          <span className="hh-techs-label">{t('featured.techStack')}</span>
          <div className="hh-card-techs-list">
            {displayTechs.map((tech) => (
              <span key={tech} className="hh-card-tech-tag">
                <TechIcon name={tech} className="hh-card-tech-icon" />
                <span>{tech}</span>
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="hh-card-tech-tag hh-tech-more">+{remainingCount}</span>
            )}
          </div>
        </div>

        {/* 4. CÁC NÚT: XEM CHI TIẾT, XEM BÁO CÁO (GG DOCS) & XEM SẢN PHẨM */}
        <div className="hh-card-actions-row">
          <Link
            href={`/projects/${project.slug}`}
            className="hh-card-btn hh-btn-card-detail"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span>{t('featured.viewDetails')}</span>
          </Link>

          {(project.reportUrl || true) && (
            <a
              href={project.reportUrl || `https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing`}
              target="_blank"
              rel="noopener noreferrer"
              className="hh-card-btn hh-btn-card-report"
              onClick={(e) => e.stopPropagation()}
              title={lang === 'vi' ? 'Xem báo cáo đồ án trên Google Docs' : (lang === 'zh' ? '在 Google Docs 上查看项目报告' : 'View project report on Google Docs')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <line x1="10" y1="9" x2="8" y2="9"/>
              </svg>
              <span>{t('featured.viewReport')}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}

          {project.liveUrl && project.slug !== 'nh-huynh-portfolio' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hh-card-btn hh-btn-card-live"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{t('featured.visitProduct')}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('All');

  const realWorldProjects = projects.filter((p) => isRealWorldProject(p.slug));
  const academicProjects = projects.filter((p) => !isRealWorldProject(p.slug));

  const tabs = [
    { id: 'All', label: t('filter.all') },
    { id: 'RealWorld', label: `★ ${t('filter.realWorld')} (3)` },
    { id: 'Academic', label: t('filter.academic') },
    { id: 'Web Application', label: t('filter.webApp') },
    { id: 'Landing Page', label: t('filter.landing') },
    { id: 'Ongoing', label: t('filter.ongoing') },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'RealWorld') {
      return isRealWorldProject(p.slug);
    }
    if (activeTab === 'Academic') {
      return !isRealWorldProject(p.slug);
    }
    if (activeTab === 'Web Application') {
      return (
        p.category.toLowerCase().includes('application') ||
        p.category.toLowerCase().includes('ai') ||
        p.category.toLowerCase().includes('cms') ||
        p.slug.includes('ticket-concert') ||
        p.slug.includes('examplatform') ||
        p.slug.includes('rent-house') ||
        p.slug.includes('skyroute')
      );
    }
    if (activeTab === 'Landing Page') {
      return (
        p.category.toLowerCase().includes('landing') ||
        p.category.toLowerCase().includes('solution') ||
        p.category.toLowerCase().includes('marketing') ||
        p.slug.includes('fashion-nail') ||
        p.slug.includes('vk-digital')
      );
    }
    if (activeTab === 'Ongoing') {
      return p.status === 'Ongoing';
    }
    return true;
  });

  return (
    <section id="projects" data-section="projects" className="hh-featured-projects-section">
      <span id="work" className="sr-only" aria-hidden="true" />
      <div className="container">
        {/* SECTION HEADER */}
        <div className="hh-projects-header">
          <div className="hh-eyebrow-pill">
            <span className="hh-star-icon">★</span>
            <span>{t('featured.eyebrow')}</span>
          </div>

          <h2 className="hh-section-title">{t('featured.title')}</h2>

          <p className="hh-section-subtitle">
            {t('featured.subtitle')}
          </p>

          {/* FILTER PILLS */}
          <div className="hh-filter-pills-row" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`hh-filter-pill ${activeTab === tab.id ? 'active' : ''} ${tab.id === 'RealWorld' ? 'hh-pill-real-world' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* IF 'ALL': RENDER SEGMENTED REAL-WORLD PROJECTS & ACADEMIC RESEARCH PROJECTS */}
        {activeTab === 'All' ? (
          <div className="hh-projects-segmented-showcase">
            {/* SUB-SECTION 1: DỰ ÁN THỰC TẾ (REAL-WORLD PROJECTS) */}
            <div className="hh-project-category-block" id="real-world-projects">
              <div className="hh-block-header">
                <div className="hh-block-tag real-world">
                  <span className="tag-star">★</span>
                  <span>{t('featured.realWorld.eyebrow')}</span>
                  <span className="hh-count-chip">3 {lang === 'vi' ? 'dự án' : (lang === 'zh' ? '个项目' : 'projects')}</span>
                </div>
                <h3 className="hh-block-title">{t('featured.realWorld.title')}</h3>
                <p className="hh-block-desc">{t('featured.realWorld.desc')}</p>
              </div>

              <div className="hh-projects-grid">
                {realWorldProjects.map((project) => {
                  const categoryTag = project.category.includes('Landing') || project.category.includes('Client')
                    ? t('filter.landing')
                    : t('filter.webApp');

                  return (
                    <ProjectTiltCard
                      key={project._id || project.slug}
                      project={project}
                      categoryTag={categoryTag}
                    />
                  );
                })}
              </div>
            </div>

            {/* DIVIDER ACCENT */}
            <div className="hh-projects-section-divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-badge">✦</span>
              <span className="divider-line" />
            </div>

            {/* SUB-SECTION 2: ĐỒ ÁN HỌC THUẬT & NGHIÊN CỨU AI (ACADEMIC & AI RESEARCH) */}
            <div className="hh-project-category-block" id="academic-projects">
              <div className="hh-block-header">
                <div className="hh-block-tag academic">
                  <span className="tag-icon">🎓</span>
                  <span>{t('featured.academic.eyebrow')}</span>
                </div>
                <h3 className="hh-block-title">{t('featured.academic.title')}</h3>
                <p className="hh-block-desc">{t('featured.academic.desc')}</p>
              </div>

              <div className="hh-projects-grid">
                {academicProjects.map((project) => {
                  const categoryTag = project.category.includes('Landing') || project.category.includes('Client')
                    ? t('filter.landing')
                    : t('filter.webApp');

                  return (
                    <ProjectTiltCard
                      key={project._id || project.slug}
                      project={project}
                      categoryTag={categoryTag}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* FILTERED GRID WHEN A SPECIFIC TAB IS ACTIVE */
          <div className="hh-projects-grid">
            {filteredProjects.map((project) => {
              const categoryTag = project.category.includes('Landing') || project.category.includes('Client')
                ? t('filter.landing')
                : t('filter.webApp');

              return (
                <ProjectTiltCard
                  key={project._id || project.slug}
                  project={project}
                  categoryTag={categoryTag}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
