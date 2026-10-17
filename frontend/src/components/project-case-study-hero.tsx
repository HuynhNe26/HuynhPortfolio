'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { TechIcon } from '@/components/tech-icon';

interface ProjectCaseStudyHeroProps {
  project: Project;
}

export function ProjectCaseStudyHero({ project }: ProjectCaseStudyHeroProps) {
  const accentColor = project.themeColor || '#7C3AED';
  const categoryTag = project.category.includes('Landing') || project.category.includes('Client')
    ? 'Landing Page'
    : 'Web Application';

  const defaultKeyFeatures = [
    'AI-powered support & contextual retrieval (Agentic RAG)',
    'High-throughput interactive booking & seat holds',
    'Real-time availability synchronization with WebSockets',
    'Automated payment gateway verification & instant ticket dispatch',
  ];

  const featuresList = project.features && project.features.length > 0
    ? project.features.map((f) => f.title)
    : defaultKeyFeatures;

  return (
    <header className="hh-case-hero-root">
      <div className="container">
        {/* BACK LINK */}
        <div className="hh-case-back-row">
          <Link href="/projects" className="hh-case-back-link">
            ← Back to projects
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
                  Visit Website
                </a>
              )}
              {project.sourceUrl ? (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hh-btn-secondary"
                >
                  View on GitHub
                </a>
              ) : (
                <Link href="#overview" className="hh-btn-secondary">
                  Explore Architecture
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
              <span className="spec-label">My Role</span>
              <strong className="spec-val">{project.role}</strong>
            </div>
          </div>

          <div className="hh-spec-card">
            <div className="spec-icon" aria-hidden="true">👥</div>
            <div className="spec-text">
              <span className="spec-label">Team Size</span>
              <strong className="spec-val">{project.teamSize ? `${project.teamSize} members` : 'Solo Developer'}</strong>
            </div>
          </div>

          <div className="hh-spec-card">
            <div className="spec-icon" aria-hidden="true">⏱</div>
            <div className="spec-text">
              <span className="spec-label">Time</span>
              <strong className="spec-val">{project.timeline || String(project.year)}</strong>
            </div>
          </div>

          <div className="hh-spec-card">
            <div className="spec-icon" aria-hidden="true">⚡</div>
            <div className="spec-text">
              <span className="spec-label">Status</span>
              <strong className="spec-val status-green">
                <span className="status-ping-dot" />
                {project.status === 'Ongoing' ? 'In Development' : 'Completed'}
              </strong>
            </div>
          </div>
        </div>

        {/* TECHNOLOGIES USED ICON BADGES ROW */}
        <div className="hh-techs-used-panel">
          <span className="techs-panel-title">Technologies Used</span>
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
            <h3 className="subheading-white">Project Overview</h3>
            <p className="overview-prose">
              {project.problem} {project.approach} {project.outcome}
            </p>
          </div>

          <div className="hh-features-col">
            <h3 className="subheading-white">Key Features</h3>
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
