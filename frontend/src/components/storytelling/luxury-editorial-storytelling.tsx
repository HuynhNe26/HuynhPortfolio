'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ProjectChapter, Project } from '@/lib/types';

interface LuxuryEditorialStorytellingProps {
  project: Project;
  chapters: ProjectChapter[];
}

const LUXURY_PALETTES = [
  { name: 'Champagne Rose', hex: '#D9777F', description: 'Gam màu chủ đạo ấm áp, tinh tế' },
  { name: 'Rose Gold Leaf', hex: '#E0A96D', description: 'Ánh kim vàng hồng sang trọng' },
  { name: 'French Velvet', hex: '#FFF1F2', description: 'Nền mềm mại chuẩn thẩm mỹ Úc' },
  { name: 'Onyx Charcoal', hex: '#1C1917', description: 'Tương phản typographic sắc sảo' },
];

export function LuxuryEditorialStorytelling({ project, chapters }: LuxuryEditorialStorytellingProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState(LUXURY_PALETTES[0]);

  useEffect(() => {
    const chapterEls = document.querySelectorAll<HTMLElement>('.editorial-chapter-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-editorial-revealed');
            const idx = Number(entry.target.getAttribute('data-chapter-idx'));
            if (!isNaN(idx)) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-20% 0px -20% 0px', threshold: 0.15 }
    );

    chapterEls.forEach((el) => observer.observe(el));
    return () => chapterEls.forEach((el) => observer.unobserve(el));
  }, [chapters]);

  return (
    <div className="luxury-editorial-root">
      <div className="container">
        {/* INTERACTIVE COLOR & MATERIAL SWATCH LOOKBOOK */}
        <div className="editorial-lookbook-banner">
          <div className="lookbook-intro">
            <span className="editorial-script-eyebrow">Haute Couture Visual Direction</span>
            <h3 className="lookbook-heading">Champagne Rose &amp; Modernist Beauty Palette</h3>
            <p className="lookbook-desc">
              Hệ thống thẩm mỹ cao cấp dành cho salon tại Morley, Tây Úc — kết hợp trải nghiệm thị giác mượt mà và chuyển đổi lịch hẹn tức thời.
            </p>
          </div>

          <div className="swatches-showcase">
            <div className="swatches-row">
              {LUXURY_PALETTES.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  className={`swatch-btn ${selectedSwatch.name === swatch.name ? 'active' : ''}`}
                  onClick={() => setSelectedSwatch(swatch)}
                  style={{ '--swatch-hex': swatch.hex } as React.CSSProperties}
                >
                  <span className="swatch-circle" style={{ backgroundColor: swatch.hex }} />
                  <span className="swatch-label">{swatch.name}</span>
                </button>
              ))}
            </div>
            <div className="selected-swatch-detail">
              <span className="swatch-dot" style={{ backgroundColor: selectedSwatch.hex }} />
              <span><strong>{selectedSwatch.name}:</strong> {selectedSwatch.description}</span>
            </div>
          </div>
        </div>

        {/* SPLIT-SCREEN EDITORIAL LAYOUT */}
        <div className="editorial-split-layout">
          {/* LEFT STICKY TYPOGRAPHY COLUMN */}
          <aside className="editorial-sticky-aside">
            <div className="aside-pinned-wrap">
              <div className="editorial-roman-num">
                {String(activeIdx + 1).padStart(2, '0')}
              </div>
              <div className="aside-divider-gold" />
              <span className="aside-subheading">EDITORIAL CHAPTER</span>
              <h4 className="aside-title">
                {chapters[activeIdx]?.title || 'Salon Experience'}
              </h4>
              <p className="aside-quote">
                &ldquo;Where meticulous digital craftsmanship meets Western Australian luxury beauty.&rdquo;
              </p>
              <div className="aside-chapter-counter">
                Chặng <strong>{activeIdx + 1}</strong> trên tổng số <strong>{chapters.length}</strong> chặng phát triển
              </div>
            </div>
          </aside>

          {/* RIGHT FLOATING EDITORIAL CARDS */}
          <div className="editorial-cards-column">
            {chapters.map((ch, idx) => (
              <article
                key={ch.id}
                id={ch.id}
                data-chapter-idx={idx}
                className={`editorial-chapter-card ${idx === 0 ? 'is-editorial-revealed' : ''}`}
              >
                <div className="editorial-card-top">
                  <span className="editorial-phase-tag">CHAPTER {ch.number}</span>
                  <span className="editorial-flourish">❦</span>
                </div>

                <h3 className="editorial-chapter-heading">{ch.title}</h3>
                <div className="editorial-prose-wrap">
                  <p className="editorial-prose-text">{ch.content}</p>
                </div>

                {/* Technical notes formatted as refined editorial specifications */}
                {ch.technicalNotes && ch.technicalNotes.length > 0 && (
                  <div className="editorial-spec-card">
                    <div className="spec-card-heading">
                      <span>Refined Technical Execution</span>
                    </div>
                    <ul className="spec-notes-list">
                      {ch.technicalNotes.map((note, nIdx) => (
                        <li key={nIdx}>
                          <span className="gold-leaf-bullet">✦</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Screenshots Gallery in Editorial Framing */}
                {ch.screenshots && ch.screenshots.length > 0 && (
                  <div className="editorial-gallery-grid">
                    {ch.screenshots.map((s, sIdx) => (
                      <figure key={sIdx} className="editorial-figure">
                        <div className="editorial-frame">
                          <Image
                            src={s.url}
                            alt={s.alt || s.caption}
                            width={1200}
                            height={750}
                            className="editorial-img"
                            unoptimized
                          />
                          <div className="gold-shimmer-border" />
                        </div>
                        <figcaption className="editorial-caption">
                          <span className="fig-tag">FIGURE {ch.number}.{sIdx + 1}</span>
                          <strong>{s.caption}</strong>
                          {s.description && <p>{s.description}</p>}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
