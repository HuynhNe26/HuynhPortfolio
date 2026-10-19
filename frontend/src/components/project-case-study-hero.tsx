'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { TechIcon } from '@/components/tech-icon';
import { useLanguage } from '@/context/language-context';

interface ProjectCaseStudyHeroProps {
  project: Project;
  themeClass?: string;
}

export function ProjectCaseStudyHero({ project, themeClass }: ProjectCaseStudyHeroProps) {
  const { t, lang } = useLanguage();
  const accentColor = project.themeColor || '#7C3AED';
  const categoryTag = project.category.includes('Landing') || project.category.includes('Client')
    ? t('filter.landing')
    : t('filter.webApp');

  const defaultKeyFeatures = lang === 'vi'
    ? [
        'Hỗ trợ khách hàng thông minh & truy xuất ngữ cảnh (Agentic RAG)',
        'Hệ thống giữ chỗ & đặt vé hiệu năng cao theo thời gian thực',
        'Đồng bộ trạng thái ghế tức thì thông qua WebSockets',
        'Tự động đối soát cổng thanh toán trực tuyến & phát hành vé điện tử',
      ]
    : [
        'AI-powered support & contextual retrieval (Agentic RAG)',
        'High-throughput interactive booking & seat holds',
        'Real-time availability synchronization with WebSockets',
        'Automated payment gateway verification & instant ticket dispatch',
      ];

  const featuresList = project.features && project.features.length > 0
    ? project.features.map((f) => f.title)
    : defaultKeyFeatures;

  const teamSizeLabel = project.teamSize
    ? `${project.teamSize} ${t('case.members')}`
    : t('case.solo');

  return (
    <header className={`hh-case-hero-root ${themeClass || ''}`}>
      <div className="container">
        {/* BACK LINK */}
        <div className="hh-case-back-row">
          <Link href="/projects" className="hh-case-back-link">
            {t('case.back')}
          </Link>
        </div>

        {/* HERO 2 COLUMNS: LEFT META/TITLE/ACTIONS, RIGHT 3D LAPTOP MOCKUP */}
        <div className="hh-case-hero-grid">
          <div className="hh-case-hero-left">
            <span className="hh-case-cat-pill" style={{ color: accentColor, borderColor: accentColor }}>
              {categoryTag}
            </span>

            <h1 className="hh-case-title">{project.title.toUpperCase()}</h1>

            <p className="hh-case-summary">{project.summary}</p>

            <div className="hh-case-actions">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hh-btn-primary"
                >
                  {t('case.visitSite')}
                </a>
              )}
              {project.sourceUrl ? (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hh-btn-secondary"
                >
                  {t('case.viewGithub')}
                </a>
              ) : (
                <Link href="#overview" className="hh-btn-secondary">
                  {t('case.exploreArch')}
                </Link>
              )}
            </div>
          </div>

          <div className="hh-case-hero-right">
            <div className="hh-laptop-mockup-wrap">
              {/* VIBRANT AMBIENT BACKLIGHT GLOW */}
              <div
                className="hh-laptop-glow"
                style={{
                  background: `radial-gradient(circle, ${accentColor}80 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              {/* 3D LAPTOP HARDWARE SHELL */}
              <div className="hh-laptop-shell">
                <div className="hh-laptop-screen">
                  <div className="hh-laptop-screen-header">
                    <div className="hh-dots-mini">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <span className="hh-laptop-url">{project.liveUrl || 'https://project.online'}</span>
                  </div>
                  <div className="hh-laptop-screen-body">
                    <Image
                      src={project.coverUrl || '/projects/ticket-concert-hero.png'}
                      alt={project.title}
                      width={1200}
                      height={750}
                      className="hh-laptop-img"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
                <div className="hh-laptop-base" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 SPEC TILES IN A ROW */}
        <div className="hh-specs-row">
          <div className="hh-spec-card">
            <div className="spec-icon" aria-hidden="true">👤</div>
            <div className="spec-text">
              <span className="spec-label">{t('case.role')}</span>
              <strong className="spec-val">{project.role}</strong>
            </div>
          </div>

          <div className="hh-spec-card">
            <div className="spec-icon" aria-hidden="true">👥</div>
            <div className="spec-text">
              <span className="spec-label">{t('case.teamSize')}</span>
              <strong className="spec-val">{teamSizeLabel}</strong>
            </div>
          </div>

          <div className="hh-spec-card">
            <div className="spec-icon" aria-hidden="true">⏱</div>
            <div className="spec-text">
              <span className="spec-label">{t('case.time')}</span>
              <strong className="spec-val">{project.timeline || String(project.year)}</strong>
            </div>
          </div>

          <div className="hh-spec-card">
            <div className="spec-icon" aria-hidden="true">⚡</div>
            <div className="spec-text">
              <span className="spec-label">{t('case.status')}</span>
              <strong className="spec-val status-green">
                <span className="status-ping-dot" />
                {project.status === 'Ongoing' ? t('case.inDev') : t('case.completed')}
              </strong>
            </div>
          </div>
        </div>

        {/* TECHNOLOGIES USED ICON BADGES ROW */}
        <div className="hh-techs-used-panel">
          <span className="techs-panel-title">{t('case.techsUsed')}</span>
          <div className="techs-badges-row">
            {project.technologies.map((t) => (
              <div key={t} className="tech-badge-item">
                <div className="tech-badge-icon">
                  <TechIcon name={t} className="tech-svg" />
                </div>
                <span className="tech-badge-name">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TWO-COLUMN OVERVIEW & KEY FEATURES */}
        <div id="overview" className="hh-overview-features-grid">
          <div className="hh-overview-col">
            <h3 className="subheading-white">{t('case.overview')}</h3>
            <p className="overview-prose">
              {project.problem} {project.approach} {project.outcome}
            </p>
          </div>

          <div className="hh-features-col">
            <h3 className="subheading-white">{t('case.features')}</h3>
            <ul className="features-checklist">
              {featuresList.map((feat, idx) => (
                <li key={idx}>
                  <span className="green-check" aria-hidden="true">✔</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
