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
                <strong>{t('aboutPreview.strengthPerf')}</strong>
                <span>{t('aboutPreview.strengthPerfSub')}</span>
              </div>
            </div>
            <div className="strength-item">
              <span className="strength-icon" aria-hidden="true">🛡️</span>
              <div>
                <strong>{t('aboutPreview.strengthSecurity')}</strong>
                <span>{t('aboutPreview.strengthSecuritySub')}</span>
              </div>
            </div>
            <div className="strength-item">
              <span className="strength-icon" aria-hidden="true">🤖</span>
              <div>
                <strong>{t('aboutPreview.strengthAgentic')}</strong>
                <span>{t('aboutPreview.strengthAgenticSub')}</span>
              </div>
            </div>
            <div className="strength-item">
              <span className="strength-icon" aria-hidden="true">📐</span>
              <div>
                <strong>{t('aboutPreview.strengthCleanCode')}</strong>
                <span>{t('aboutPreview.strengthCleanCodeSub')}</span>
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
          <div className="card-badge-pill">{t('aboutPreview.credentialsBadge')}</div>
          <h3>{t('aboutPreview.academy')}</h3>
          <p className="academy-sub">{t('aboutPreview.academySub')}</p>

          <div className="academic-stats-list">
            <div className="academic-stat-row">
              <span className="stat-label">{t('aboutPreview.majorLabel')}</span>
              <span className="stat-val">{t('aboutPreview.majorVal')}</span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">{t('aboutPreview.standingLabel')}</span>
              <span className="stat-val">{t('aboutPreview.standingVal')}</span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">{t('aboutPreview.gpaLabel')}</span>
              <span className="stat-val gpa-pill">3.1 / 4.0</span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">{t('aboutPreview.englishLabel')}</span>
              <span className="stat-val">{t('aboutPreview.englishVal')}</span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">{t('aboutPreview.phoneLabel')}</span>
              <span className="stat-val">
                <a href="tel:+84937569205" className="text-link">
                  +84 937 569 205
                </a>
              </span>
            </div>
            <div className="academic-stat-row">
              <span className="stat-label">{t('aboutPreview.stackLabel')}</span>
              <span className="stat-val">TypeScript • Next.js 16 • Node.js • Neon</span>
            </div>
          </div>

          <div className="about-contact-snippet">
            <span className="contact-prompt">{t('aboutPreview.contactPrompt')}</span>
            <div className="contact-buttons-mini">
              <Link href="/contact" className="button button-pro-secondary small">
                {t('aboutPreview.sendMessage')} ↗
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
