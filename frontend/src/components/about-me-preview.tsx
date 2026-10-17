'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

interface AboutMePreviewProps {
  name: string;
  biography: string;
  email: string;
}

export function AboutMePreview({ name, biography, email }: AboutMePreviewProps) {
  const { t } = useLanguage();

  return (
    <section className="about-me-preview-section container section" id="about-summary">
      <div className="section-heading">
        <div>
          <div className="section-pill-tag">
            <span className="pill-dot" />
            <span>{t('aboutPreview.pill')}</span>
          </div>
          <h2>
            {t('aboutPreview.title')}
            <span className="brand-dot">.</span>
          </h2>
        </div>
        <p className="section-aside">
          {t('aboutPreview.desc')}
        </p>
      </div>

      <div className="about-preview-grid">
        {/* Left Column: Narrative & Values */}
        <div className="about-preview-card narrative-card">
          <div className="card-badge-pill">Software Engineer Profile</div>
          <h3>{name}</h3>
          <p className="about-summary-lead">
            {t('aboutPreview.summaryP1')}
          </p>
          <p className="about-summary-sub">
            {t('aboutPreview.summaryP2')}
          </p>

          <div className="about-strengths-grid">
            <div className="strength-item">
              <span className="strength-icon" aria-hidden="true">⚡</span>
              <div>
                <strong>High Performance</strong>
                <span>Sub-second page loads, edge rendering &amp; minimal bundles</span>
              </div>
            </div>
            <div className="strength-item">
              <span className="strength-icon" aria-hidden="true">🛡️</span>
              <div>
                <strong>Security &amp; Resilience</strong>
                <span>HttpOnly sessions, rate limiting &amp; signature validation</span>
              </div>
            </div>
            <div className="strength-item">
              <span className="strength-icon" aria-hidden="true">🤖</span>
              <div>
                <strong>Agentic Intelligence</strong>
                <span>LangChain.js, Gemini API &amp; context-grounded RAG</span>
              </div>
            </div>
            <div className="strength-item">
              <span className="strength-icon" aria-hidden="true">📐</span>
              <div>
                <strong>Clean Codebase</strong>
                <span>Strict TypeScript, modular components &amp; robust typing</span>
              </div>
            </div>
          </div>

          <div className="about-readmore-row">
            <Link href="/about" className="button button-pro-primary">
              <span>{t('aboutPreview.readMore')}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Academic & Credentials Quick Matrix */}
        <div className="about-preview-card academic-card">
          <div className="card-badge-pill">Academic Credentials</div>
          <h3>Vietnam Aviation Academy</h3>
          <p className="academy-sub">Học viện Hàng không Việt Nam • Khoa Công nghệ Thông tin</p>

          <div className="academic-stats-list">
            <div className="academic-stat-row">
              <span className="stat-label">Major / Discipline</span>
              <span className="stat-val">Information Technology (CNTT)</span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">Academic Standing</span>
              <span className="stat-val">Third Year (Class of 2026)</span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">Cumulative GPA</span>
              <span className="stat-val gpa-pill">3.1 / 4.0</span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">English Proficiency</span>
              <span className="stat-val">TOEIC 550 [ETS Verified]</span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">Phone / WhatsApp</span>
              <span className="stat-val">
                <a href="tel:+84937569205" className="text-link">
                  +84 937 569 205
                </a>
              </span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">Primary Stack</span>
              <span className="stat-val">TypeScript • Next.js 16 • Node.js • Neon</span>
            </div>
          </div>

          <div className="about-contact-snippet">
            <span className="contact-prompt">Interested in working together?</span>
            <div className="contact-buttons-mini">
              <Link href="/contact" className="button button-pro-secondary small">
                Send Message ↗
              </Link>
              <a href="tel:+84937569205" className="button button-pro-ghost small">
                📞 +84 937 569 205
              </a>
              <a href={`mailto:${email}`} className="text-link">
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
