'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { useLanguage } from '@/context/language-context';
import { getLocalizedProject } from '@/lib/project-translations';
import { getCaseStudyCopy, getCaseStudyPresentation, getCaseStudyReportUrl } from '@/lib/case-study-content';

export function CaseArrow({ direction = 'up', className = '' }: { direction?: 'up' | 'right' | 'left'; className?: string }) {
  return <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {direction === 'up' ? <path d="M6 18 18 6M6 6h12v12" /> : direction === 'left' ? <path d="m10 5-7 7 7 7M3 12h18" /> : <path d="m14 5 7 7-7 7M3 12h18" />}
  </svg>;
}

export function ProjectCaseStudyHero({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const c = getCaseStudyCopy(lang);
  const presentation = getCaseStudyPresentation(project, lang);
  const localized = getLocalizedProject(project, lang);
  const reportUrl = getCaseStudyReportUrl(project.reportUrl);
  let domain = '';
  try { domain = new URL(project.liveUrl).hostname.replace(/^www\./, ''); } catch { /* Projects may have no public URL. */ }

  return (
    <header className="cs-hero">
      <div className="cs-container">
        <div className="cs-breadcrumb">
          <Link href="/projects"><CaseArrow direction="left" />{c.back}</Link>
          <span className="cs-project-state"><i aria-hidden="true" />{project.status === 'Ongoing' ? c.ongoing : c.completed}</span>
        </div>
        <div className="cs-hero-grid">
          <div className="cs-hero-copy">
            <p className="cs-eyebrow"><span className="cs-accent-line" />{c.caseStudy}<span className="cs-year">/ {project.year}</span></p>
            <h1>{presentation.name}</h1>
            {presentation.subtitle && <p className="cs-hero-subtitle">{presentation.subtitle}</p>}
            <p className="cs-hero-description">{presentation.description}</p>
            <div className="cs-actions">
              {project.liveUrl && project.slug !== 'nh-huynh-portfolio' ?
                <a className="cs-button cs-button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">{c.live}<CaseArrow /></a> :
                <a className="cs-button cs-button-primary" href="#overview">{c.explore}<CaseArrow direction="right" /></a>}
              {project.sourceUrl && <a className="cs-text-link" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">{c.source}<CaseArrow /></a>}
              {reportUrl && <a className="cs-text-link" href={reportUrl} target="_blank" rel="noopener noreferrer">{c.report}<CaseArrow /></a>}
            </div>
          </div>
          <figure className="cs-hero-art">
            <div className="cs-art-topline"><span>{presentation.name}</span><span>WEB APPLICATION <span aria-hidden="true">↗</span></span></div>
            <div className="cs-browser">
              <div className="cs-browser-bar"><span className="cs-browser-dots" aria-hidden="true"><i /><i /><i /></span><span>{domain || presentation.name}</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg></div>
              {project.coverUrl ? <Image src={project.coverUrl} alt={`${c.preview} — ${presentation.name}`} width={1440} height={900} priority unoptimized className="cs-cover" /> : <div className="cs-cover-fallback">{presentation.name}</div>}
            </div>
            <figcaption><span className="cs-caption-mark" aria-hidden="true">01 /</span>{c.preview}<span aria-hidden="true">DESIGN · DEVELOP · DELIVER</span></figcaption>
          </figure>
        </div>
        <dl className="cs-facts">
          <div><dt>{c.role}</dt><dd>{localized.role || 'Developer'}</dd></div>
          <div><dt>{c.team}</dt><dd>{project.teamSize && project.teamSize > 1 ? `${project.teamSize} ${c.members}` : c.solo}</dd></div>
          <div><dt>{c.timeline}</dt><dd>{localized.timeline}</dd></div>
          <div><dt>{c.field}</dt><dd>{project.category}</dd></div>
        </dl>
      </div>
    </header>
  );
}
