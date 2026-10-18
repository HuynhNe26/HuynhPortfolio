'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { useLanguage } from '@/context/language-context';

interface FeaturedProjectsGridProps {
  projects: Project[];
}

interface ProjectTiltCardProps {
  project: Project;
  categoryTag: string;
}

function ProjectTiltCard({ project, categoryTag }: ProjectTiltCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

    // Dynamic 3D tilt angles (max 10 degrees)
    const maxTilt = 10;
    const rotateX = (-percentY * maxTilt).toFixed(2);
    const rotateY = (percentX * maxTilt).toFixed(2);

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
      }
      if (glareRef.current) {
        glareRef.current.style.opacity = '1';
        glareRef.current.style.background = `radial-gradient(circle 380px at ${x}px ${y}px, rgba(255, 255, 255, 0.22), transparent 75%)`;
      }
    });
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.1s ease-out, border-color 0.35s ease, box-shadow 0.35s ease';
    }
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  const glowColor = project.themeColor || '#2563EB';

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      className="hh-project-card"
      style={{ '--card-glow': glowColor } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* AMBIENT GLOW BACKLIGHT */}
      <div className="hh-project-card-ambient" aria-hidden="true" />

      {/* DYNAMIC SPECULAR GLARE SPOTLIGHT */}
      <div ref={glareRef} className="hh-project-card-glare" aria-hidden="true" />

      {/* IMAGE PREVIEW FRAME (WITH 3D PARALLAX DEPTH) */}
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
      <div className="hh-card-bottom-row">
        <h3 className="hh-card-title">{project.title.toUpperCase()}</h3>
        <div className="hh-card-arrow-btn" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
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
