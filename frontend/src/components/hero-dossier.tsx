'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TechIcon } from './tech-icon';
import { useLanguage } from '@/context/language-context';

interface HeroDossierProps {
  name: string;
}

type TabKey = 'stack' | 'architecture' | 'credentials';

export function HeroDossier({ name }: HeroDossierProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('stack');
  const [copied, setCopied] = useState(false);

  const email = 'nguyenhoanghuynh.vn@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="hero-dossier-card" aria-label={`Professional Engineering Dossier for ${name}`}>
      {/* 1. PROFILE HEADER */}
      <div className="dossier-header">
        <div className="dossier-avatar-area">
          <div className="avatar-monogram" aria-hidden="true">
            <span>NH</span>
          </div>
          <div className="dossier-identity">
            <div className="identity-name-row">
              <h2 className="dossier-name">{name}</h2>
              <span className="verified-badge" title="Verified Engineering Profile">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
            </div>
            <p className="dossier-role">Full-Stack Software Engineer • IT Undergrad</p>
            <p className="dossier-institution">Vietnam Aviation Academy (Học viện Hàng không Việt Nam)</p>
          </div>
        </div>

        <div className="dossier-status-pill">
          <span className="status-live-dot" />
          <span>Available for Roles</span>
        </div>
      </div>

      {/* 2. CORE METRICS STRIP (Clean & Professional) */}
      <div className="dossier-metrics-grid">
        <div className="metric-cell">
          <span className="metric-label">ACADEMIC GPA</span>
          <strong className="metric-value gpa">3.1 <span className="metric-denom">/ 4.0</span></strong>
          <span className="metric-sub">IT Major (Third Year)</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">STATUS</span>
          <strong className="metric-value">Class of 2026</strong>
          <span className="metric-sub">Undergraduate</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">SHOWCASE</span>
          <strong className="metric-value">5 Systems</strong>
          <span className="metric-sub">Production Case Studies</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">ENGLISH</span>
          <strong className="metric-value">TOEIC 550</strong>
          <span className="metric-sub">ETS Verified</span>
        </div>
      </div>

      {/* 3. DOSSIER TABS NAVIGATION */}
      <div className="dossier-tabs-bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'stack'}
          className={`dossier-tab ${activeTab === 'stack' ? 'active' : ''}`}
          onClick={() => setActiveTab('stack')}
        >
          {t('dossier.tabStack')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'architecture'}
          className={`dossier-tab ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          {t('dossier.tabArchitecture')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'credentials'}
          className={`dossier-tab ${activeTab === 'credentials' ? 'active' : ''}`}
          onClick={() => setActiveTab('credentials')}
        >
          {t('dossier.tabCredentials')}
        </button>
      </div>

      {/* 4. DOSSIER TAB CONTENT */}
      <div className="dossier-content-area">
        {/* TAB 1: CORE STACK */}
        {activeTab === 'stack' && (
          <div className="dossier-stack-panel">
            <div className="stack-items-grid">
              <div className="stack-item">
                <TechIcon name="TypeScript" className="stack-icon" />
                <div className="stack-text">
                  <strong>TypeScript</strong>
                  <span>Strict Type-Safety</span>
                </div>
              </div>
              <div className="stack-item">
                <TechIcon name="Next.js" className="stack-icon" />
                <div className="stack-text">
                  <strong>Next.js 16</strong>
                  <span>App Router &amp; SSR</span>
                </div>
              </div>
              <div className="stack-item">
                <TechIcon name="React.js" className="stack-icon" />
                <div className="stack-text">
                  <strong>React 19</strong>
                  <span>Hooks &amp; Components</span>
                </div>
              </div>
              <div className="stack-item">
                <TechIcon name="Node.js" className="stack-icon" />
                <div className="stack-text">
                  <strong>Node.js 22 LTS</strong>
                  <span>REST &amp; WebSockets</span>
                </div>
              </div>
              <div className="stack-item">
                <TechIcon name="PostgreSQL (Neon)" className="stack-icon" />
                <div className="stack-text">
                  <strong>PostgreSQL (Neon)</strong>
                  <span>Serverless Pooled ACID</span>
                </div>
              </div>
              <div className="stack-item">
                <TechIcon name="Gemini API" className="stack-icon" />
                <div className="stack-text">
                  <strong>Gemini + LangChain</strong>
                  <span>Agentic RAG Workflows</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURE FOCUS */}
        {activeTab === 'architecture' && (
          <div className="dossier-arch-panel">
            <ul className="arch-focus-list">
              <li>
                <div className="focus-bullet" />
                <div>
                  <strong>High-Throughput Web Applications</strong>
                  <p>Engineered streaming SSR architectures with Next.js 16, optimized bundle budgets, and sub-50ms TTFB.</p>
                </div>
              </li>
              <li>
                <div className="focus-bullet" />
                <div>
                  <strong>Resilient Database Architecture</strong>
                  <p>Schema design, relational indexes, automated migration scripts, and serverless pooled PostgreSQL on Neon.</p>
                </div>
              </li>
              <li>
                <div className="focus-bullet" />
                <div>
                  <strong>Applied AI &amp; Retrieval-Augmented Generation</strong>
                  <p>Integrating Google Gemini models and LangChain.js to power automated ticketing and conversational support pipelines.</p>
                </div>
              </li>
            </ul>
          </div>
        )}

        {/* TAB 3: CREDENTIALS & EDUCATION */}
        {activeTab === 'credentials' && (
          <div className="dossier-creds-panel">
            <div className="cred-card">
              <span className="cred-tag">{t('dossier.degree')}</span>
              <h4>{t('dossier.degreeName')}</h4>
              <p className="cred-org">{t('dossier.institution')}</p>
              <div className="cred-meta">
                <span>{t('dossier.timelineLabel')}</span>
                <span className="meta-divider">•</span>
                <span className="cred-score">{t('dossier.gpaLabel')}</span>
              </div>
            </div>

            <div className="cred-card">
              <span className="cred-tag">{t('dossier.langCert')}</span>
              <h4>{t('dossier.toeic')}</h4>
              <p className="cred-org">Educational Testing Service (ETS)</p>
              <div className="cred-meta">
                <span>{t('dossier.issuedLabel')}</span>
                <span className="meta-divider">•</span>
                <span className="cred-score">{t('dossier.scoreLabel')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. DOSSIER ACTION BAR */}
      <div className="dossier-footer">
        <button
          type="button"
          className="dossier-copy-email-btn"
          onClick={handleCopyEmail}
          title="Copy email to clipboard"
        >
          <span className="btn-icon">✉</span>
          <span>{copied ? t('dossier.copied') : email}</span>
        </button>

        <div className="dossier-quick-links">
          <Link href="/projects" className="dossier-link">
            {t('nav.projects')} ↗
          </Link>
          <Link href="/contact" className="dossier-link primary">
            {t('nav.contact')} ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
