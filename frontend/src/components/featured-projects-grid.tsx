'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/types';
import { TechIcon } from '@/components/tech-icon';
import { useLanguage, type Language } from '@/context/language-context';

interface FeaturedProjectsGridProps {
  projects: Project[];
}

interface ProjectTiltCardProps {
  project: Project;
  categoryTag: string;
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
  const router = useRouter();
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

    // Stabilize card when hovering over buttons or links so clicks register with 100% reliability
    const target = e.target as HTMLElement;
    if (
      target.closest('.hh-card-actions-row') ||
      target.closest('.hh-card-btn') ||
      target.closest('a') ||
      target.closest('button')
    ) {
      if (card) {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1.008, 1.008, 1.008)';
      }
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Relative mouse offset from center (-1 to 1)
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    // Gentle, subtle 3D tilt (3.8deg for natural elegance)
    const maxTilt = 3.8;
    const rotateX = (-percentY * maxTilt).toFixed(2);
    const rotateY = (percentX * maxTilt).toFixed(2);

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      // 1. Tilt card in 3D
      if (card) {
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.012, 1.012, 1.012)`;
      }

      // 2. Light BEHIND the card follows cursor position in real-time
      if (backlightRef.current) {
        backlightRef.current.style.opacity = '0.75';
        backlightRef.current.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, var(--card-glow, #38BDF8) 0%, transparent 75%)`;
        backlightRef.current.style.transform = `translate3d(${percentX * 16}px, ${percentY * 16}px, 0)`;
      }

      // 3. Ambient glow on card surface follows cursor
      if (ambientRef.current) {
        ambientRef.current.style.opacity = '0.2';
        ambientRef.current.style.background = `radial-gradient(circle 340px at ${x}px ${y}px, var(--card-glow, #38BDF8) 0%, transparent 65%)`;
      }

      // 4. Specular glare highlight on card surface follows cursor
      if (glareRef.current) {
        glareRef.current.style.opacity = '0.55';
        glareRef.current.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(255, 255, 255, 0.45) 0%, transparent 65%)`;
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
      card.style.transform = '';
      card.style.transition = '';
    }
    if (backlightRef.current) {
      backlightRef.current.style.opacity = '0';
      backlightRef.current.style.transform = '';
      backlightRef.current.style.transition = '';
    }
    if (ambientRef.current) {
      ambientRef.current.style.opacity = '0.06';
      ambientRef.current.style.transition = '';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
      glareRef.current.style.transition = '';
    }
  };

  const glowColor = project.themeColor || '#2563EB';
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
          alt={project.title}
          width={720}
          height={460}
          className="hh-card-img"
          loading="lazy"
          decoding="async"
          unoptimized
        />
        {/* CATEGORY PILL ON IMAGE */}
        <span className="hh-card-cat-badge">
          {categoryTag}
        </span>
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
          <h3 className="hh-card-title">{project.title}</h3>
        </Link>

        {/* PROJECT SUMMARY / MÔ TẢ DỰ ÁN */}
        {project.summary && (
          <p className="hh-card-summary" title={project.summary}>
            {project.summary}
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
            <span className="hh-meta-val" title={project.role || 'Full-Stack Developer'}>
              {project.role || 'Full-Stack Developer'}
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

          {project.liveUrl ? (
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
          ) : (
            <Link
              href={`/projects/${project.slug}`}
              className="hh-card-btn hh-btn-card-live"
            >
              <span>{t('featured.visitProduct')}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { id: 'All', label: t('filter.all') },
    { id: 'Web Application', label: t('filter.webApp') },
    { id: 'Landing Page', label: t('filter.landing') },
    { id: 'Academic', label: t('filter.academic') },
    { id: 'Ongoing', label: t('filter.ongoing') },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Web Application') {
      return (
        p.category.toLowerCase().includes('application') ||
        p.category.toLowerCase().includes('ai') ||
        p.category.toLowerCase().includes('cms') ||
        p.slug.includes('ticket-concert') ||
        p.slug.includes('examplatform')
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
    if (activeTab === 'Academic') {
      return (
        p.role.toLowerCase().includes('student') ||
        p.slug.includes('ticket-concert') ||
        p.slug.includes('examplatform')
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
                className={`hh-filter-pill ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2X2 COLORFUL GLOWING PROJECTS GRID WITH 3D MOUSE TILT */}
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
      </div>
    </section>
  );
}
