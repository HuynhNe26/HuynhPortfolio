'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { TechIcon } from './tech-icon';
import { useLanguage } from '@/context/language-context';
import { getLocalizedProject, isPublicLiveUrl } from '@/lib/project-translations';

export function ProjectCard({ project }: { project: Project; index?: number }) {
  const { lang, t } = useLanguage();
  const localized = getLocalizedProject(project, lang);
  const hasPublicLive = isPublicLiveUrl(project.liveUrl) && project.slug !== 'nh-huynh-portfolio';

  let domain = `${project.slug}.app`;
  if (hasPublicLive && project.liveUrl) {
    try {
      domain = new URL(project.liveUrl).hostname.replace('www.', '');
    } catch {
      domain = `${project.slug}.app`;
    }
  }

  return (
    <article
      className="pro-project-card"
      style={{
        '--card-accent': project.themeColor || '#2563EB',
      } as React.CSSProperties}
    >
      {/* 1. BROWSER WINDOW MOCKUP WITH REAL SCREENSHOT */}
      <div className="pro-window-frame">
        <div className="pro-window-topbar">
          <div className="window-dots" aria-hidden="true">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="pro-window-address">
            <span className="address-lock" aria-hidden="true">🔒</span>
            <span className="address-text">{domain}</span>
          </div>

          {hasPublicLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="window-live-badge"
              title="Visit live production website"
            >
              <span className="hh-lang-text">
                {lang === 'vi' ? 'Trực tiếp' : lang === 'zh' ? '在线' : 'Live'}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="window-local-badge">
              <span className="hh-lang-text">{t('projects.caseStudy')}</span>
            </span>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="pro-screenshot-link"
          aria-label={`${t('projects.caseStudy')} — ${localized.title}`}
        >
          {project.coverUrl ? (
            <div className="pro-screenshot-wrapper">
              <Image
                src={project.coverUrl}
                alt={localized.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="pro-screenshot-img"
                unoptimized
              />
            </div>
          ) : (
            <div className="pro-screenshot-fallback">
              <div className="fallback-monogram">{localized.title.slice(0, 2).toUpperCase()}</div>
              <span className="hh-lang-text">{localized.category}</span>
            </div>
          )}

          <div className="pro-screenshot-overlay">
            <span className="overlay-pill">
              <span className="hh-lang-text">{t('projects.caseStudy')}</span>
              <span aria-hidden="true"> →</span>
            </span>
          </div>
        </Link>
      </div>

      {/* 2. CARD CONTENT & METADATA */}
      <div className="pro-card-body">
        <div className="pro-card-meta-row">
          <span className="pro-category-tag">
            <span className="hh-lang-text">{localized.category}</span>
          </span>
          <span className={`pro-status-tag ${project.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>
            <span className="pro-status-dot" />
            <span className="hh-lang-text">{localized.status}</span>
          </span>
          <span className="pro-year-tag">{project.year}</span>
        </div>

        <h3 className="pro-card-title">
          <Link href={`/projects/${project.slug}`} className="pro-title-link">
            {localized.title}
          </Link>
        </h3>

        <p className="pro-card-summary">{localized.summary}</p>

        {/* HIGHLIGHTED ENGINEERING SPECS */}
        <div className="pro-specs-snippet">
          <div className="snippet-item">
            <span className="snippet-label hh-lang-text">
              {lang === 'zh' ? '担任角色:' : lang === 'vi' ? 'Vai trò:' : 'Role:'}
            </span>
            <span className="snippet-val hh-lang-text">{localized.role}</span>
          </div>
          <div className="snippet-item">
            <span className="snippet-label hh-lang-text">
              {lang === 'zh' ? '项目周期:' : lang === 'vi' ? 'Thời gian:' : 'Timeline:'}
            </span>
            <span className="snippet-val hh-lang-text">{localized.timeline}</span>
          </div>
        </div>

        {/* TECH STACK BADGES */}
        <div className="pro-tech-row" aria-label="Technologies used">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="pro-tech-pill">
              <TechIcon name={tech} className="pro-tech-icon" />
              <span>{tech}</span>
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="pro-tech-pill more">+{project.technologies.length - 5}</span>
          )}
        </div>

        {/* CARD ACTIONS */}
        <div className="pro-card-footer">
          <Link
            href={`/projects/${project.slug}`}
            className="pro-btn-primary"
            id={`view-study-${project.slug}`}
          >
            <span className="hh-lang-text">{t('projects.caseStudy')}</span>
            <span aria-hidden="true">→</span>
          </Link>

          <div className="pro-secondary-actions">
            {hasPublicLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pro-btn-secondary"
                title="Launch live website in new tab"
              >
                <span className="hh-lang-text">{t('projects.liveSite')}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function EmptyProjects({ unavailable }: { unavailable: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="pro-empty-card">
      <div className="empty-icon" aria-hidden="true">📂</div>
      <h3>{unavailable ? t('projects.emptyTitle') : t('projects.emptyTitle')}</h3>
      <p>{t('projects.emptyDesc')}</p>
      <Link className="pro-btn-primary" href="/contact">
        <span className="hh-lang-text">{t('nav.contact')}</span>
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
