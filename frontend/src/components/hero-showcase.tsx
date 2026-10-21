'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

interface HeroShowcaseProps {
  name?: string;
  avatarUrl?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export function HeroShowcase({
  name = 'Nguyễn Hoàng Huynh',
  avatarUrl = '/avatar.jpg',
  email = 'nguyenhoanghuynh.vn@gmail.com',
  githubUrl = 'https://github.com/HuynhNe26',
  linkedinUrl = '',
}: HeroShowcaseProps) {
  const { t, lang } = useLanguage();
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    // Lock hero section after initial entrance finishes (1.05s)
    // so toggling dark/light mode or re-rendering never re-triggers entrance animations
    const timer = setTimeout(() => {
      setIsSettled(true);
    }, 1050);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('projects') || document.getElementById('work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`hh-hero-section ${isSettled ? 'hh-hero-settled' : ''}`}>
      <div className="hh-hero-ambient-spotlight" aria-hidden="true" />
      <div className="container hh-hero-container">
        {/* HERO TOP: 2 COLUMNS (LEFT CONTENT, RIGHT PORTRAIT) */}
        <div className="hh-hero-grid">
          {/* LEFT COLUMN: HEADLINE, BIO, BUTTONS, SOCIALS */}
          <div className="hh-hero-left">
            <div className="hh-role-pill">
              <span className="hh-role-pill-text">{t('hero.role')}</span>
            </div>

            <div className="hh-hero-name-wrap">
              <div className="hh-name-glow-aura" aria-hidden="true" />
              <h1 className="hh-hero-name">
                <span className="hh-name-first">{lang === 'zh' ? '阮' : 'Nguyễn'}</span>
                <br />
                <span className="hh-name-highlight">{lang === 'zh' ? '黄兄' : 'Hoàng Huynh'}</span>
                {lang === 'zh' && (
                  <span
                    className="hh-name-sub-latin"
                    style={{
                      display: 'block',
                      fontSize: '0.36em',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      color: 'var(--text-muted, #64748B)',
                      marginTop: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Nguyễn Hoàng Huynh
                  </span>
                )}
              </h1>
            </div>

            <p className="hh-hero-bio">
              {t('hero.bio')}
            </p>

            <div className="hh-hero-actions">
              <Link href="/projects" className="hh-btn-primary">
                {t('hero.viewProjects')}
              </Link>
              <Link href="/contact" className="hh-btn-secondary">
                {t('hero.contactMe')}
              </Link>
            </div>

            {/* SOCIAL LINKS */}
            <div className="hh-hero-socials">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hh-social-icon-btn"
                  aria-label="GitHub Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hh-social-icon-btn"
                  aria-label="LinkedIn Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="hh-social-icon-btn"
                  aria-label="Send Email"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: CINEMATIC PORTRAIT & HANDWRITTEN REPEAT MANIFESTO */}
          <div className="hh-hero-right">
            <div className="hh-portrait-frame">
              <div className="hh-portrait-ambient-glow" aria-hidden="true" />
              <Image
                src={avatarUrl}
                alt={name}
                width={520}
                height={620}
                className="hh-portrait-photo"
                priority
              />

              {/* HANDWRITTEN OVERLAY MOTTO: Build Learn Improve Repeat */}
              <div className="hh-handwritten-motto" aria-hidden="true">
                <span className="motto-line">Build</span>
                <span className="motto-line">Learn</span>
                <span className="motto-line">Improve</span>
                <span className="motto-line">Repeat</span>
              </div>
            </div>
          </div>
        </div>

        {/* HERO BOTTOM: STATS BAR & SCROLL HINT */}
        <div className="hh-hero-bottom-bar">
          <div className="hh-metrics-group">
            <div className="hh-metric-item">
              <strong className="hh-metric-number">3.1/4.0</strong>
              <span className="hh-metric-name">{t('hero.stats.gpa')}</span>
            </div>
            <div className="hh-metric-item">
              <strong className="hh-metric-number">3+</strong>
              <span className="hh-metric-name">{t('hero.stats.projects')}</span>
            </div>
            <div className="hh-metric-item">
              <strong className="hh-metric-number">2+</strong>
              <span className="hh-metric-name">{t('hero.stats.learning')}</span>
            </div>
            <div className="hh-metric-item">
              <strong className="hh-metric-number">∞</strong>
              <span className="hh-metric-name">{t('hero.stats.passion')}</span>
            </div>
          </div>

          <a href="#work" onClick={scrollToWork} className="hh-scroll-hint" aria-label="Scroll to explore projects">
            <span className="hh-scroll-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </span>
            <span className="hh-scroll-text">{t('hero.scrollHint')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
