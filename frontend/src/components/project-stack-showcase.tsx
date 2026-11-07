'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { TechIcon } from './tech-icon';
import { useLanguage } from '@/context/language-context';
import { isRealWorldProject } from '@/components/featured-projects-grid';
import { getLocalizedProject, isPublicLiveUrl } from '@/lib/project-translations';

export function ProjectStackShowcase({ projects }: { projects: Project[] }) {
  const { t, lang } = useLanguage();

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

        // Up to 3 localized key features to showcase on horizontal card
        const keyFeatures = localized.features.slice(0, 3);

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
                {isRealWorldProject(project.slug) && (
                  <span className="card-real-world-pill">
                    <span aria-hidden="true">★ </span>
                    <span className="hh-lang-text">{t('card.realWorldBadge')}</span>
                  </span>
                )}
                <span className="card-category-pill">
                  <span className="hh-lang-text">{localized.category}</span>
                </span>
                <span className={`card-status-pill ${project.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>
                  <span className="pro-status-dot" />
                  <span className="hh-lang-text">{localized.status}</span>
                </span>
                <span className="card-year-pill">{project.year}</span>
              </div>

              <h3 className="horizontal-card-title">
                <Link href={`/projects/${project.slug}`} className="card-title-link">
                  {localized.title}
                </Link>
              </h3>

              <p className="horizontal-card-summary">{localized.summary}</p>

              {/* KEY PRODUCT FEATURES BULLETS */}
              {keyFeatures.length > 0 && (
                <div className="card-features-list">
                  <span className="features-list-label hh-lang-text">{t('projects.featuresTitle')}</span>
                  <ul>
                    {keyFeatures.map((feat, featIdx) => {
                      const descText =
                        feat.description.length > 105
                          ? `${feat.description.slice(0, 102)}...`
                          : feat.description;
                      return (
                        <li key={'id' in feat && feat.id ? feat.id : `${project.slug}-feat-${featIdx}`}>
                          <span className="feature-check" aria-hidden="true">✦</span>
                          <span className="hh-lang-text">
                            <strong>{feat.title}:</strong> {descText}
                          </span>
                        </li>
                      );
                    })}
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
                  <span className="hh-lang-text">{t('projects.caseStudy')}</span>
                  <span aria-hidden="true">→</span>
                </Link>

                {(project.reportUrl || true) && (
                  <a
                    href={project.reportUrl || `https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-pro-report"
                    title={
                      lang === 'vi'
                        ? 'Xem báo cáo đồ án trên Google Docs'
                        : lang === 'zh'
                        ? '在 Google Docs 上查看项目报告'
                        : 'View project report on Google Docs'
                    }
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                    <span className="hh-lang-text">{t('projects.viewReport')}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}

                {hasPublicLive && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-pro-secondary"
                  >
                    <span className="hh-lang-text">{t('projects.liveSite')}</span>
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
                    <span className="address-text">{domain}</span>
                  </div>

                  {hasPublicLive ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="browser-live-badge"
                      title={
                        lang === 'vi'
                          ? 'Mở sản phẩm thực tế trong tab mới'
                          : lang === 'zh'
                          ? '在新标签页中打开线上产品'
                          : 'Open live website in new tab'
                      }
                    >
                      <span className="hh-lang-text">
                        {lang === 'vi' ? 'Trực tiếp' : lang === 'zh' ? '在线' : 'Live'}
                      </span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="browser-case-badge">
                      <span className="hh-lang-text">{t('projects.caseStudy')}</span>
                    </span>
                  )}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="horizontal-screenshot-link"
                  aria-label={`${t('projects.caseStudy')} — ${localized.title}`}
                >
                  {project.coverUrl ? (
                    <div className="horizontal-screenshot-wrapper">
                      <Image
                        src={project.coverUrl}
                        alt={localized.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        className="horizontal-screenshot-img"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="horizontal-screenshot-fallback">
                      <div className="fallback-monogram">{localized.title.slice(0, 2).toUpperCase()}</div>
                      <span className="hh-lang-text">{localized.category}</span>
                    </div>
                  )}

                  <div className="horizontal-screenshot-overlay">
                    <span className="overlay-pill">
                      <span className="hh-lang-text">{t('projects.caseStudy')}</span>
                      <span aria-hidden="true"> →</span>
                    </span>
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
