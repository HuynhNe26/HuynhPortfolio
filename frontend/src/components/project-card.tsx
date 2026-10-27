'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { TechIcon } from './tech-icon';
import { useLanguage } from '@/context/language-context';
import { getLocalizedProject } from '@/lib/project-translations';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { lang, t } = useLanguage();
  const [inspectOpen, setInspectOpen] = useState(false);
  const localized = getLocalizedProject(project, lang);

  // Extract clean domain from liveUrl for browser window header
  let domain = '';
  if (project.liveUrl) {
    try {
      domain = new URL(project.liveUrl).hostname.replace('www.', '');
    } catch {
      domain = project.title;
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
            <span className="address-text">{domain || 'production.app'}</span>
          </div>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="window-live-badge"
              title="Visit live production website"
            >
              <span>Live</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="window-local-badge">Case Study</span>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="pro-screenshot-link"
          aria-label={`View complete case study for ${project.title}`}
        >
          {project.coverUrl ? (
            <div className="pro-screenshot-wrapper">
              <Image
                src={project.coverUrl}
                alt={`${project.title} live interface preview`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="pro-screenshot-img"
                unoptimized
              />
            </div>
          ) : (
            <div className="pro-screenshot-fallback">
              <div className="fallback-monogram">{project.title.slice(0, 2).toUpperCase()}</div>
              <span>{project.category}</span>
            </div>
          )}

          <div className="pro-screenshot-overlay">
            <span className="overlay-pill">Explore Case Study &amp; Architecture →</span>
          </div>
        </Link>
      </div>

      {/* 2. CARD CONTENT & METADATA */}
      <div className="pro-card-body">
        <div className="pro-card-meta-row">
          <span className="pro-category-tag">{project.category}</span>
          <span className={`pro-status-tag ${project.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>
            <span className="pro-status-dot" />
            {project.status || 'Completed'}
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
            <span className="snippet-label">{lang === 'zh' ? '担任角色:' : (lang === 'vi' ? 'Vai trò:' : 'Role:')}</span>
            <span className="snippet-val">{localized.role}{project.teamSize ? (lang === 'zh' ? ` (${project.teamSize}人团队)` : ` (Team of ${project.teamSize})`) : (lang === 'zh' ? ' (独立开发)' : ' (Solo)')}</span>
          </div>
          <div className="snippet-item">
            <span className="snippet-label">{lang === 'zh' ? '项目周期:' : (lang === 'vi' ? 'Thời gian:' : 'Timeline:')}</span>
            <span className="snippet-val">{project.timeline || `${project.year}`}</span>
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
            <span>Case Study</span>
            <span aria-hidden="true">→</span>
          </Link>

          <div className="pro-secondary-actions">
            {project.liveUrl && project.slug !== 'nh-huynh-portfolio' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pro-btn-secondary"
                title="Launch live website in new tab"
              >
                <span>Live Site</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            <button
              type="button"
              className="pro-btn-specs"
              onClick={() => setInspectOpen(!inspectOpen)}
              aria-expanded={inspectOpen}
              title="Toggle architectural highlights"
            >
              {inspectOpen ? 'Hide Specs' : 'Specs'}
            </button>
          </div>
        </div>

        {/* EXPANDABLE ARCHITECTURE SPECS DRAWER */}
        {inspectOpen && (
          <div className="pro-specs-drawer">
            <div className="drawer-row">
              <strong>Core Challenge:</strong>
              <p>{project.problem}</p>
            </div>
            <div className="drawer-row">
              <strong>Engineering Approach:</strong>
              <p>{project.approach}</p>
            </div>
            <div className="drawer-row">
              <strong>Measured Outcome:</strong>
              <p>{project.outcome}</p>
            </div>
            <Link href={`/projects/${project.slug}`} className="drawer-full-link">
              Read 7-Chapter Technical Case Study ↗
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

export function EmptyProjects({ unavailable }: { unavailable: boolean }) {
  return (
    <div className="pro-empty-card">
      <div className="empty-icon" aria-hidden="true">📂</div>
      <h3>{unavailable ? 'Project Catalog Initializing...' : 'Production Projects Ready.'}</h3>
      <p>
        {unavailable
          ? 'Connecting to database cluster. In the meantime, feel free to send a message via contact.'
          : 'Projects and case studies are updated regularly.'}
      </p>
      <Link className="pro-btn-primary" href="/contact">
        Get in Touch ↗
      </Link>
    </div>
  );
}
