'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { useLanguage } from '@/context/language-context';

interface FeaturedProjectsGridProps {
  projects: Project[];
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
    <section id="work" className="hh-featured-projects-section">
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

        {/* 2X2 COLORFUL GLOWING PROJECTS GRID */}
        <div className="hh-projects-grid">
          {filteredProjects.map((project) => {
            const glowColor = project.themeColor || '#2563EB';
            const categoryTag = project.category.includes('Landing') || project.category.includes('Client')
              ? t('filter.landing')
              : t('filter.webApp');

            return (
              <Link
                key={project._id || project.slug}
                href={`/projects/${project.slug}`}
                className="hh-project-card"
                style={{ '--card-glow': glowColor } as React.CSSProperties}
              >
                <div className="hh-project-card-ambient" aria-hidden="true" />

                {/* IMAGE PREVIEW FRAME */}
                <div className="hh-card-image-box">
                  <Image
                    src={project.coverUrl || '/projects/ticket-concert-hero.png'}
                    alt={project.title}
                    width={720}
                    height={460}
                    className="hh-card-img"
                    unoptimized
                  />
                  {/* CATEGORY PILL ON IMAGE */}
                  <span className="hh-card-cat-badge">
                    {categoryTag}
                  </span>
                </div>

                {/* BOTTOM TITLE & ARROW */}
                <div className="hh-card-bottom-info">
                  <h3 className="hh-card-title">{project.title.toUpperCase()}</h3>
                  <div className="hh-card-arrow-circle" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
