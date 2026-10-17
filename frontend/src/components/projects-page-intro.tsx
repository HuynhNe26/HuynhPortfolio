'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';

export function ProjectsPageIntro() {
  const { t } = useLanguage();

  return (
    <div className="page-intro">
      <p className="eyebrow">{t('projectsPage.eyebrow')}</p>
      <h1>
        {t('projectsPage.title')}
        <span className="brand-dot">.</span>
      </h1>
      <p className="lead-text">
        {t('projectsPage.desc')}
      </p>
    </div>
  );
}
