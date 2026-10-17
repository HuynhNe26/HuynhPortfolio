'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ProjectChapter } from '@/lib/types';

interface Storytelling3DFlowProps {
  chapters: ProjectChapter[];
  accentColor: string;
}

export function Storytelling3DFlow({ chapters, accentColor }: Storytelling3DFlowProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chapterEls = document.querySelectorAll<HTMLElement>('.story-chapter-3d-block');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            const idx = Number(entry.target.getAttribute('data-chapter-idx'));
            if (!isNaN(idx)) {
              setActiveChapterIndex(idx);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-15% 0px -25% 0px',
        threshold: 0.15,
      }
    );

    chapterEls.forEach((el) => observer.observe(el));

    return () => {
      chapterEls.forEach((el) => observer.unobserve(el));
    };
  }, [chapters]);

  return (
    <div
      ref={containerRef}
      className="storytelling-3d-container"
      style={{ '--story-accent': accentColor } as React.CSSProperties}
    >
      {/* 3D FLOATING PROGRESS BAR */}
      <div className="story-progress-indicator" aria-hidden="true">
        <div className="progress-indicator-pill">
          <span className="indicator-pulse" />
          <span className="indicator-text">
            Chapter {chapters[activeChapterIndex]?.number || '01'} / {String(chapters.length).padStart(2, '0')}:{' '}
            <strong>{chapters[activeChapterIndex]?.title.split('&')[0].trim()}</strong>
          </span>
        </div>
      </div>

      {/* DYNAMIC 3D STORYTELLING DECK */}
      <article className="story-body-3d container">
        {chapters.map((chapter, idx) => (
          <section
            key={chapter.id}
            id={chapter.id}
            data-chapter-idx={idx}
            className={`story-chapter-3d-block ${idx === 0 ? 'is-revealed' : ''}`}
          >
            {/* Left 3D Timeline Node */}
            <div className="chapter-marker-3d">
              <div className="marker-node">
                <span className="marker-number">{chapter.number}</span>
              </div>
              <div className="marker-connector" />
            </div>

            {/* Right Storytelling Card */}
            <div className="chapter-card-3d">
              <div className="chapter-header-row">
                <span className="chapter-step-badge">Phase {chapter.number} of {String(chapters.length).padStart(2, '0')}</span>
                <h2 className="chapter-heading">{chapter.title}</h2>
              </div>

              <div className="chapter-narrative-box">
                <p className="chapter-prose">{chapter.content}</p>

                {/* Key Engineering Decisions / Technical Notes */}
                {chapter.technicalNotes && chapter.technicalNotes.length > 0 && (
                  <div className="engineering-decisions-card">
                    <div className="decisions-header">
                      <span className="decisions-icon" aria-hidden="true">⚙️</span>
                      <h4>Engineering Architecture &amp; Decisions</h4>
                    </div>
                    <ul>
                      {chapter.technicalNotes.map((note, nIdx) => (
                        <li key={nIdx}>
                          <span className="bullet-arrow" aria-hidden="true">▸</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* High-Resolution Feature Screenshot Gallery */}
                {chapter.screenshots && chapter.screenshots.length > 0 && (
                  <div className="chapter-gallery-3d">
                    <div className="gallery-header-strip">
                      <span className="gallery-pill">Verified Feature Captures</span>
                      <span className="gallery-count">
                        {chapter.screenshots.length} {chapter.screenshots.length > 1 ? 'Screenshots' : 'Screenshot'}
                      </span>
                    </div>

                    {chapter.screenshots.map((s, sIdx) => (
                      <figure key={sIdx} className="screenshot-figure-3d">
                        <div className="screenshot-browser-frame">
                          <div className="screenshot-browser-bar">
                            <div className="window-dots-mini" aria-hidden="true">
                              <span className="dot dot-red" />
                              <span className="dot dot-yellow" />
                              <span className="dot dot-green" />
                            </div>
                            <span className="screenshot-window-caption">{s.caption}</span>
                            <span className="screenshot-badge">Verified Feature</span>
                          </div>

                          <div className="screenshot-img-wrap">
                            <Image
                              src={s.url}
                              alt={s.alt || s.caption}
                              width={1440}
                              height={900}
                              className="screenshot-img-3d"
                              unoptimized
                            />
                          </div>
                        </div>

                        <figcaption className="screenshot-caption-box">
                          <div className="caption-title-row">
                            <strong>{s.caption}</strong>
                          </div>
                          {s.description && <p className="caption-desc">{s.description}</p>}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}
