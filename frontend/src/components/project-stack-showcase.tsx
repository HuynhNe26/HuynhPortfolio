'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { TechIcon } from './tech-icon';
import { useLanguage } from '@/context/language-context';

export function ProjectStackShowcase({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();

  if (!projects || projects.length === 0) {
    return (
      <div className="pro-empty-card">
        <div className="empty-icon" aria-hidden="true">📂</div>
        <h3>{t('projects.emptyTitle')}</h3>
        <p>{t('projects.emptyDesc')}</p>
      </div>
    );
  }

  return (
    <div className="project-stack-deck">
      {projects.map((project, index) => {
        let domain = '';
        if (project.liveUrl) {
          try {
            domain = new URL(project.liveUrl).hostname.replace('www.', '');
          } catch {
            domain = project.title;
          }
        }

        // Up to 3 key features to showcase on horizontal card
        const keyFeatures = project.features?.slice(0, 3) || [];

        return (
          <article
            key={project._id || project.slug}
            className="horizontal-stack-card"
            style={
              {
                '--card-index': index,
                '--project-accent': project.themeColor || '#2563EB',
                '--project-accent-bg': project.themeBg || '#EFF6FF',
              } as React.CSSProperties
            }
          >
            {/* LEFT COLUMN: METADATA & CONTENT */}
            <div className="horizontal-card-content">
              <div className="card-pills-row">
                <span className="card-category-pill">{project.category}</span>
                <span className={`card-status-pill ${project.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>
                  <span className="pro-status-dot" />
                  {project.status || 'Completed'}
                </span>
                <span className="card-year-pill">{project.year}</span>
              </div>

              <h3 className="horizontal-card-title">
                <Link href={`/projects/${project.slug}`} className="card-title-link">
                  {project.title}
                </Link>
              </h3>

              <p className="horizontal-card-summary">{project.summary}</p>

              {/* KEY PRODUCT FEATURES BULLETS */}
              {keyFeatures.length > 0 && (
                <div className="card-features-list">
                  <span className="features-list-label">{t('projects.featuresTitle')}</span>
                  <ul>
                    {keyFeatures.map((feat) => (
                      <li key={feat.id || feat.title}>
                        <span className="feature-check" aria-hidden="true">✦</span>
                        <span>
                          <strong>{feat.title}:</strong> {feat.description.slice(0, 95)}...
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* TECH STACK BADGES */}
              <div className="card-tech-row" aria-label="Technologies used">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span key={tech} className="horizontal-tech-pill">
                    <TechIcon name={tech} className="horizontal-tech-icon" />
                    <span>{tech}</span>
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="horizontal-tech-pill more">+{project.technologies.length - 5}</span>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="horizontal-card-actions">
                <Link href={`/projects/${project.slug}`} className="button button-pro-primary">
                  <span>{t('projects.caseStudy')}</span>
                  <span aria-hidden="true">→</span>
                </Link>

                {(project.reportUrl || true) && (
                  <a
                    href={project.reportUrl || `https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-pro-report"
                    title="Xem báo cáo đồ án trên Google Docs"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                    <span>{t('projects.viewReport')}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-pro-secondary"
                  >
                    <span>{t('projects.liveSite')}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: MACOS BROWSER FRAME WITH REAL SCREENSHOT */}
            <div className="horizontal-card-media">
              <div className="horizontal-browser-frame">
                <div className="horizontal-browser-bar">
                  <div className="window-dots" aria-hidden="true">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>

                  <div className="horizontal-browser-address">
                    <span className="address-lock" aria-hidden="true">🔒</span>
                    <span className="address-text">{domain || 'production.app'}</span>
                  </div>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="browser-live-badge"
                      title="Open live website in new tab"
                    >
                      <span>Live</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="browser-case-badge">Case Study</span>
                  )}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="horizontal-screenshot-link"
                  aria-label={`Explore case study for ${project.title}`}
                >
                  {project.coverUrl ? (
                    <div className="horizontal-screenshot-wrapper">
                      <Image
                        src={project.coverUrl}
                        alt={`${project.title} live interface preview`}
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        className="horizontal-screenshot-img"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="horizontal-screenshot-fallback">
                      <div className="fallback-monogram">{project.title.slice(0, 2).toUpperCase()}</div>
                      <span>{project.category}</span>
                    </div>
                  )}

                  <div className="horizontal-screenshot-overlay">
                    <span className="overlay-pill">{t('projects.caseStudy')} →</span>
                  </div>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
