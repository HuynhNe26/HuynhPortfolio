'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { ScreenshotItem } from '@/lib/types';
import { useLanguage } from '@/context/language-context';

interface ProjectGalleryShowcaseProps {
  screenshots: ScreenshotItem[];
  projectTitle: string;
  liveUrl?: string;
  accentColor?: string;
}

export function ProjectGalleryShowcase({
  screenshots,
  projectTitle,
  liveUrl,
  accentColor = '#2563EB',
}: ProjectGalleryShowcaseProps) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'showcase' | 'grid'>('showcase');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // If no screenshots provided, provide fallback
  const items = screenshots && screenshots.length > 0
    ? screenshots
    : [
        {
          url: '/projects/ticket-concert-hero.png',
          caption: `${projectTitle} Interface`,
          alt: projectTitle,
        },
      ];

  const currentItem = items[activeIndex] || items[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  }, [items.length]);

  // Keyboard navigation for carousel & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, lightboxOpen]);

  return (
    <section className="project-gallery-showcase" aria-label="Website Screenshots Gallery">
      {/* GALLERY TOP CONTROL BAR */}
      <div className="gallery-header-bar">
        <div className="gallery-header-left">
          <div className="gallery-pill-tag">
            <span className="pill-dot" style={{ backgroundColor: accentColor }} />
            <span>{t('gallery.title')}</span>
            <span className="gallery-count-badge">
              {items.length} {t('gallery.screensCount')}
            </span>
          </div>
        </div>

        <div className="gallery-header-controls">
          {/* VIEW MODE TOGGLE */}
          <div className="gallery-mode-switch" role="group" aria-label="View Mode">
            <button
              type="button"
              className={`mode-btn ${viewMode === 'showcase' ? 'active' : ''}`}
              onClick={() => setViewMode('showcase')}
              title={t('gallery.viewShowcase')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>{t('gallery.viewShowcase')}</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title={t('gallery.viewGrid')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span>{t('gallery.viewGrid')}</span>
            </button>
          </div>

          {/* VISIT LIVE WEBSITE BUTTON */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="gallery-live-btn"
              title="Open website in new window"
            >
              <span>{t('gallery.visit')}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: SHOWCASE (BIG ACTIVE BROWSER FRAME + THUMBNAILS) */}
      {viewMode === 'showcase' && (
        <div className="gallery-showcase-view">
          {/* macOS Browser Mockup */}
          <div className="gallery-browser-frame">
            <div className="gallery-browser-topbar">
              <div className="window-dots" aria-hidden="true">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="gallery-browser-address">
                <span className="address-lock" aria-hidden="true">🔒</span>
                <span className="address-url">
                  {liveUrl || `https://${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
                </span>
                <span className="address-screen-tag">
                  Screen {activeIndex + 1} of {items.length}
                </span>
              </div>
              <div className="gallery-browser-actions">
                <button
                  type="button"
                  className="gallery-action-btn"
                  onClick={() => setLightboxOpen(true)}
                  title={t('gallery.fullscreen')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  <span>{t('gallery.fullscreen')}</span>
                </button>
              </div>
            </div>

            {/* SCREENSHOT MAIN VIEWPORT */}
            <div className="gallery-viewport">
              <div
                className="gallery-image-wrapper"
                onClick={() => setLightboxOpen(true)}
                title="Click to zoom in"
              >
                <Image
                  src={currentItem.url}
                  alt={currentItem.alt || currentItem.caption}
                  width={1920}
                  height={1080}
                  className="gallery-active-image"
                  priority
                  unoptimized
                />

                {/* OVERLAY NAVIGATION CHEVRONS */}
                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="gallery-nav-chevron prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      aria-label={t('gallery.prev')}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="gallery-nav-chevron next"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      aria-label={t('gallery.next')}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* ACTIVE CAPTION STRIP */}
              <div className="gallery-caption-overlay">
                <div className="caption-badge" style={{ backgroundColor: accentColor }}>
                  0{activeIndex + 1} / 0{items.length}
                </div>
                <div className="caption-texts">
                  <h4 className="caption-title">{currentItem.caption}</h4>
                  {currentItem.description && (
                    <p className="caption-desc">{currentItem.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* MULTI-IMAGE THUMBNAIL FILMSTRIP */}
          {items.length > 1 && (
            <div className="gallery-thumbnails-strip" role="tablist" aria-label="Select screen">
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.url + idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`gallery-thumb-card ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    style={isActive ? ({ '--thumb-accent': accentColor } as React.CSSProperties) : undefined}
                  >
                    <div className="thumb-img-frame">
                      <Image
                        src={item.url}
                        alt={item.alt || item.caption}
                        width={320}
                        height={180}
                        className="thumb-img"
                        unoptimized
                      />
                      <span className="thumb-seq-tag">0{idx + 1}</span>
                    </div>
                    <div className="thumb-info">
                      <span className="thumb-title">{item.caption}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: MULTI-IMAGE GRID ("DẠNG ĐỂ NHIỀU HÌNH ẢNH") */}
      {viewMode === 'grid' && (
        <div className="gallery-grid-view">
          <div className="gallery-mosaic-grid">
            {items.map((item, idx) => (
              <div
                key={item.url + idx}
                className="gallery-grid-card"
                onClick={() => {
                  setActiveIndex(idx);
                  setLightboxOpen(true);
                }}
              >
                <div className="grid-card-topbar">
                  <div className="window-dots-mini" aria-hidden="true">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="grid-card-num">Screen 0{idx + 1}</span>
                  <span className="grid-card-zoom-hint">{t('gallery.fullscreen')} ↗</span>
                </div>
                <div className="grid-card-img-wrap">
                  <Image
                    src={item.url}
                    alt={item.alt || item.caption}
                    width={1200}
                    height={700}
                    className="grid-card-img"
                    unoptimized
                  />
                </div>
                <div className="grid-card-footer">
                  <h4 className="grid-card-caption">{item.caption}</h4>
                  {item.description && (
                    <p className="grid-card-desc">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="gallery-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-topbar">
              <div className="lightbox-info">
                <span className="lightbox-counter">
                  0{activeIndex + 1} / 0{items.length}
                </span>
                <span className="lightbox-title">{currentItem.caption}</span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxOpen(false)}
                aria-label={t('gallery.close')}
              >
                ✕
              </button>
            </div>

            <div className="lightbox-image-stage">
              {items.length > 1 && (
                <button
                  type="button"
                  className="lightbox-chevron prev"
                  onClick={handlePrev}
                  aria-label={t('gallery.prev')}
                >
                  ‹
                </button>
              )}

              <div className="lightbox-img-wrap">
                <Image
                  src={currentItem.url}
                  alt={currentItem.alt || currentItem.caption}
                  width={2400}
                  height={1400}
                  className="lightbox-img"
                  unoptimized
                />
              </div>

              {items.length > 1 && (
                <button
                  type="button"
                  className="lightbox-chevron next"
                  onClick={handleNext}
                  aria-label={t('gallery.next')}
                >
                  ›
                </button>
              )}
            </div>

            {/* LIGHTBOX MINI THUMBNAILS */}
            {items.length > 1 && (
              <div className="lightbox-thumbs-bar">
                {items.map((item, idx) => (
                  <button
                    key={`lb-${item.url}-${idx}`}
                    type="button"
                    className={`lb-thumb ${idx === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <Image
                      src={item.url}
                      alt={item.caption}
                      width={120}
                      height={70}
                      unoptimized
                    />
                    <span>0{idx + 1}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
