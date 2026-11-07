'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project, ProjectChapter, ScreenshotItem } from '@/lib/types';
import { useLanguage } from '@/context/language-context';
import { getCaseStudyCopy, getCaseStudyNarrative, getCaseStudyPresentation } from '@/lib/case-study-content';
import { PROJECT_CHAPTERS_VI } from '@/lib/project-chapters';
import { CaseArrow } from '@/components/project-case-study-hero';
import { TechIcon } from '@/components/tech-icon';

interface ProjectStoryBodyProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectStoryBody({ project, prevProject, nextProject }: ProjectStoryBodyProps) {
  const { lang } = useLanguage();
  const c = getCaseStudyCopy(lang);
  const narrative = getCaseStudyNarrative(project, lang);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedGallery, setExpandedGallery] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: ScreenshotItem[]; index: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const chapterRegistry = lang === 'vi' ? PROJECT_CHAPTERS_VI[project.slug] : undefined;
  const chapters: ProjectChapter[] = (project.chapters?.length
    ? project.chapters.map((chapter, index) => ({
        ...chapter,
        ...(chapterRegistry?.[index] || {}),
        screenshots: chapter.screenshots?.length ? chapter.screenshots : chapterRegistry?.[index]?.screenshots,
      }))
    : chapterRegistry) || (project.features || []).map((feature, index) => ({
      id: feature.id,
      number: String(index + 1).padStart(2, '0'),
      title: feature.title,
      content: feature.description,
      screenshots: feature.screenshotUrl ? [{ url: feature.screenshotUrl, caption: feature.title, alt: feature.screenshotAlt || feature.title }] : [],
    }));
  const chapterIndex = Math.min(selectedChapter, Math.max(0, chapters.length - 1));
  const currentChapter = chapters[chapterIndex];
  const currentImages = currentChapter?.screenshots?.filter((image) => image.url) || [];
  const gallery = (project.gallery || []).filter((image) => image.url);
  const sections = [
    { id: 'overview', label: c.overview },
    ...(chapters.length ? [{ id: 'experience', label: c.experience }] : []),
    ...(project.technologies.length ? [{ id: 'technology', label: c.stack }] : []),
    ...(gallery.length ? [{ id: 'gallery', label: c.gallery }] : []),
    { id: 'outcome', label: c.outcome },
  ];

  useEffect(() => {
    const elements = ['overview', 'experience', 'technology', 'gallery', 'outcome']
      .map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-18% 0px -55% 0px', threshold: 0 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [project.slug]);

  useEffect(() => {
    if (!lightbox || !dialogRef.current) return;
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, [lightbox]);

  const changeImage = (step: number) => setLightbox((current) => current
    ? { ...current, index: (current.index + step + current.images.length) % current.images.length } : null);
  const openImage = (images: ScreenshotItem[], index = 0) => setLightbox({ images, index });

  return <>
    <nav className="cs-section-nav" aria-label={c.caseStudy}>
      <div className="cs-container cs-nav-inner">
        <span className="cs-nav-caption">CASE STUDY <span aria-hidden="true">/</span></span>
        <div className="cs-nav-links">
          {sections.map((section, index) => <a key={section.id} href={`#${section.id}`}
            className={activeSection === section.id ? 'is-active' : ''}
            aria-current={activeSection === section.id ? 'location' : undefined}
            onClick={() => setActiveSection(section.id)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{section.label}
          </a>)}
        </div>
        <a href="#top" className="cs-back-top" aria-label={lang === 'vi' ? 'Về đầu trang' : lang === 'zh' ? '返回顶部' : 'Back to top'}><CaseArrow direction="left" /></a>
      </div>
    </nav>

    <div className="cs-container">
      <section id="overview" className="cs-section cs-overview" aria-labelledby="cs-overview-title">
        <div className="cs-section-heading"><p className="cs-eyebrow">01 / {c.overview}</p><h2 id="cs-overview-title">{c.context}</h2></div>
        <div className="cs-overview-content">
          <article><span className="cs-small-label"><span aria-hidden="true">↗</span> {c.challenge}</span><p>{narrative.problem}</p></article>
          <article><span className="cs-small-label"><span aria-hidden="true">↳</span> {c.solution}</span><p>{narrative.approach}</p></article>
        </div>
      </section>

      {chapters.length > 0 && <section id="experience" className="cs-section cs-experience" aria-labelledby="cs-experience-title">
        <div className="cs-section-heading cs-heading-wide">
          <div><p className="cs-eyebrow">02 / {c.experience}</p><h2 id="cs-experience-title">{c.experienceTitle}</h2></div><p>{c.experienceIntro}</p>
        </div>
        <div className="cs-workspace">
          <div className="cs-feature-tabs" role="tablist" aria-label={c.experience} aria-orientation="vertical">
            {chapters.map((chapter, index) => <button key={chapter.id} ref={(element) => { tabRefs.current[index] = element; }} type="button" role="tab"
              id={`cs-tab-${index}`} aria-controls="cs-feature-panel" aria-selected={chapterIndex === index} tabIndex={chapterIndex === index ? 0 : -1}
              onClick={() => setSelectedChapter(index)} onKeyDown={(event) => {
                if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === 'Home' ? 0 : event.key === 'End' ? chapters.length - 1
                  : (index + (event.key === 'ArrowDown' ? 1 : -1) + chapters.length) % chapters.length;
                setSelectedChapter(next); tabRefs.current[next]?.focus();
              }}>
              <span className="cs-tab-number">{String(index + 1).padStart(2, '0')}</span><span>{chapter.title}</span><CaseArrow direction="right" />
            </button>)}
          </div>
          {currentChapter && <div id="cs-feature-panel" className="cs-feature-panel" role="tabpanel" aria-labelledby={`cs-tab-${chapterIndex}`} tabIndex={0}>
            {currentImages.length > 0 && <div className="cs-feature-visuals">
              <button type="button" className="cs-screen-button" onClick={() => openImage(currentImages)} aria-label={`${c.enlarge}: ${currentImages[0].alt || currentChapter.title}`}>
                <span className="cs-screen-top"><span className="cs-browser-dots" aria-hidden="true"><i /><i /><i /></span><span>{c.preview}</span><span className="cs-zoom-icon" aria-hidden="true">⤢</span></span>
                <span className="cs-feature-image"><Image src={currentImages[0].url} alt={currentImages[0].alt || currentChapter.title} width={1440} height={900} sizes="(max-width: 800px) 100vw, 800px" unoptimized /></span>
                <span className="cs-image-hint">{c.enlarge}<span aria-hidden="true">↗</span></span>
              </button>
              {currentImages.length > 1 && <div className="cs-extra-screens">{currentImages.slice(1).map((screen, index) =>
                <button key={`${screen.url}-${index}`} type="button" onClick={() => openImage(currentImages, index + 1)} aria-label={`${c.enlarge}: ${screen.alt}`}>
                  <Image src={screen.url} alt={screen.alt} width={240} height={150} unoptimized /><span>{screen.caption}</span>
                </button>)}</div>}
            </div>}
            <div className="cs-feature-description">
              <p className="cs-eyebrow">{String(chapterIndex + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</p>
              <h3>{currentChapter.title}</h3><p>{currentChapter.content}</p>
              {!!currentChapter.technicalNotes?.length && <details className="cs-technical-notes">
                <summary>{c.implementation}<span aria-hidden="true">+</span></summary>
                <ul>{currentChapter.technicalNotes.map((note, index) => <li key={index}>{note}</li>)}</ul>
              </details>}
            </div>
          </div>}
        </div>
      </section>}

      {project.technologies.length > 0 && <section id="technology" className="cs-section cs-technology" aria-labelledby="cs-tech-title">
        <div className="cs-section-heading"><p className="cs-eyebrow">03 / {c.stack}</p><h2 id="cs-tech-title">{c.stackTitle}</h2><p>{c.stackIntro}</p></div>
        <ul className="cs-tech-grid">{project.technologies.map((technology) => <li key={technology}><span className="cs-tech-icon"><TechIcon name={technology} /></span><span>{technology}</span></li>)}</ul>
      </section>}

      {gallery.length > 0 && <section id="gallery" className="cs-section cs-gallery" aria-labelledby="cs-gallery-title">
        <div className="cs-section-heading cs-heading-wide"><div><p className="cs-eyebrow">04 / {c.gallery}</p><h2 id="cs-gallery-title">{c.galleryTitle}</h2></div><p>{c.galleryIntro}</p></div>
        <div className="cs-gallery-grid" id="cs-gallery-grid">{(expandedGallery ? gallery : gallery.slice(0, 6)).map((screen, index) =>
          <button className="cs-gallery-item" key={`${screen.url}-${index}`} type="button" onClick={() => openImage(gallery, index)} aria-label={`${c.enlarge}: ${screen.caption || screen.alt}`}>
            <span className="cs-gallery-image"><Image src={screen.url} alt={screen.alt || screen.caption} width={640} height={400} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" unoptimized /><span className="cs-gallery-enlarge" aria-hidden="true">↗</span></span>
            <span className="cs-gallery-caption"><span>{String(index + 1).padStart(2, '0')}</span><span>{screen.caption || screen.alt}</span></span>
          </button>)}</div>
        {gallery.length > 6 && <button className="cs-button cs-gallery-more" type="button" aria-expanded={expandedGallery} aria-controls="cs-gallery-grid" onClick={() => setExpandedGallery(!expandedGallery)}>
          {expandedGallery ? (lang === 'vi' ? 'Thu gọn thư viện' : lang === 'zh' ? '收起图集' : 'Show fewer images')
            : lang === 'vi' ? `Xem thêm ${gallery.length - 6} ảnh` : lang === 'zh' ? `查看其余 ${gallery.length - 6} 张图片` : `View ${gallery.length - 6} more images`}<span aria-hidden="true">{expandedGallery ? '−' : '+'}</span>
        </button>}
      </section>}

      <section id="outcome" className="cs-outcome" aria-labelledby="cs-outcome-title">
        <div><p className="cs-eyebrow">05 / {c.outcome}</p><h2 id="cs-outcome-title">{c.resultTitle}</h2></div>
        <div><p>{narrative.outcome}</p><Link className="cs-text-link" href="/contact">{c.contact}<CaseArrow /></Link></div><span className="cs-outcome-symbol" aria-hidden="true">↗</span>
      </section>

      {(prevProject || nextProject) && <nav className="cs-project-pager" aria-label={c.all}>
        {[prevProject, nextProject].map((item, index) => item && <Link key={item.slug} href={`/projects/${item.slug}`} className={`cs-next-project ${index === 1 ? 'cs-next-right' : ''}`}>
          <div className="cs-pager-image">{item.coverUrl && <Image src={item.coverUrl} alt="" width={320} height={200} unoptimized />}</div>
          <div><span className="cs-eyebrow">{index === 0 ? c.previous : c.next}</span><h3>{getCaseStudyPresentation(item, lang).name}</h3><p>{item.category}</p></div><CaseArrow direction={index === 0 ? 'left' : 'right'} />
        </Link>)}
      </nav>}

      <section className="cs-contact"><p className="cs-eyebrow">{c.contactEyebrow}</p><h2>{c.contactTitle}</h2><div className="cs-actions">
        <Link className="cs-button cs-button-primary" href="/contact">{c.contact}<CaseArrow /></Link><Link className="cs-text-link" href="/projects">{c.all}<CaseArrow direction="right" /></Link>
      </div></section>
    </div>

    {lightbox && <dialog ref={dialogRef} className="cs-lightbox" aria-label={lightbox.images[lightbox.index].caption || c.preview}
      onClose={() => setLightbox(null)}
      onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); changeImage(1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); changeImage(-1); }
      }}>
      <div className="cs-lightbox-inner">
        <div className="cs-lightbox-bar"><span>{c.image} {lightbox.index + 1} {c.of} {lightbox.images.length}</span><button type="button" onClick={() => dialogRef.current?.close()} aria-label={c.close}>✕</button></div>
        <div className="cs-lightbox-image"><Image src={lightbox.images[lightbox.index].url} alt={lightbox.images[lightbox.index].alt || lightbox.images[lightbox.index].caption} width={1920} height={1200} unoptimized /></div>
        <div className="cs-lightbox-footer">
          {lightbox.images.length > 1 && <button type="button" onClick={() => changeImage(-1)} aria-label={c.previousImage}><CaseArrow direction="left" /></button>}
          <p>{lightbox.images[lightbox.index].caption}</p>
          {lightbox.images.length > 1 && <button type="button" onClick={() => changeImage(1)} aria-label={c.nextImage}><CaseArrow direction="right" /></button>}
        </div>
      </div>
    </dialog>}
  </>;
}
