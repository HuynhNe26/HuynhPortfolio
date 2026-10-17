'use client';

import React from 'react';
import Link from 'next/link';
import { TechIcon } from './tech-icon';
import { useLanguage } from '@/context/language-context';

export function HeroHeadline({ name }: { name: string }) {
  const { t } = useLanguage();

  return (
    <div className="hero-copy">
      <div className="pro-hero-badge">
        <span className="pro-status-dot" />
        <span>{t('hero.badge')}</span>
      </div>

      <h1 className="hero-name">
        <span className="hero-name-gradient">{name}</span>
      </h1>

      <p className="hero-subtitle">
        {t('hero.subtitle')}
      </p>

      <p className="hero-intro">
        {t('hero.intro')}
      </p>

      <div className="hero-actions">
        <Link className="button button-pro-primary" href="#work">
          <span>{t('hero.viewWork')}</span>
          <span aria-hidden="true">↓</span>
        </Link>
        <Link className="button button-pro-secondary" href="/contact">
          <span>{t('hero.getInTouch')}</span>
          <span aria-hidden="true">↗</span>
        </Link>
        <a
          className="button button-pro-ghost"
          href="https://github.com/HuynhNe26"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TechIcon name="Git" className="tech-tag-icon" />
          <span>GitHub</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="hero-metrics-strip">
        <div className="hero-metric-item">
          <strong>3.1 / 4.0</strong>
          <span>{t('hero.gpaLabel')}</span>
        </div>
        <div className="hero-metric-divider" />
        <div className="hero-metric-item">
          <strong>Class of 2026</strong>
          <span>{t('hero.majorLabel')}</span>
        </div>
        <div className="hero-metric-divider" />
        <div className="hero-metric-item">
          <strong>TOEIC 550</strong>
          <span>{t('hero.toeicLabel')}</span>
        </div>
        <div className="hero-metric-divider" />
        <div className="hero-metric-item">
          <strong>5 Systems</strong>
          <span>{t('hero.systemsLabel')}</span>
        </div>
      </div>
    </div>
  );
}
