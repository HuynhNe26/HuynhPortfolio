'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ProjectChapter, Project } from '@/lib/types';

interface AppleKeynoteStorytellingProps {
  project: Project;
  chapters: ProjectChapter[];
}

export function AppleKeynoteStorytelling({ project, chapters }: AppleKeynoteStorytellingProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeStudioLayer, setActiveStudioLayer] = useState<'ssr' | 'auth' | 'db' | 'cms'>('ssr');

  useEffect(() => {
    const chapterEls = document.querySelectorAll<HTMLElement>('.keynote-chapter-stage');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-keynote-revealed');
            const idx = Number(entry.target.getAttribute('data-chapter-idx'));
            if (!isNaN(idx)) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-15% 0px -25% 0px', threshold: 0.15 }
    );

    chapterEls.forEach((el) => observer.observe(el));
    return () => chapterEls.forEach((el) => observer.unobserve(el));
  }, [chapters]);

  return (
    <div className="apple-keynote-root">
      <div className="container">
        {/* INTERACTIVE STUDIO SYSTEM ARCHITECTURE INSPECTOR */}
        <div className="keynote-studio-panel">
          <div className="studio-panel-top">
            <div className="studio-pill-tag">
              <span className="studio-dot" />
              <span>APPLE-INSPIRED FULL-STACK STUDIO ARCHITECTURE</span>
            </div>
            <div className="studio-version-tag">SYSTEM CORE v16.4</div>
          </div>

          <div className="studio-layers-tabs">
            <button
              type="button"
              className={`studio-layer-btn ${activeStudioLayer === 'ssr' ? 'active' : ''}`}
              onClick={() => setActiveStudioLayer('ssr')}
            >
              1. Next.js 16 SSR &amp; Turbopack
            </button>
            <button
              type="button"
              className={`studio-layer-btn ${activeStudioLayer === 'auth' ? 'active' : ''}`}
              onClick={() => setActiveStudioLayer('auth')}
            >
              2. HttpOnly Session Security
            </button>
            <button
              type="button"
              className={`studio-layer-btn ${activeStudioLayer === 'db' ? 'active' : ''}`}
              onClick={() => setActiveStudioLayer('db')}
            >
              3. Neon PostgreSQL (ACID)
            </button>
            <button
              type="button"
              className={`studio-layer-btn ${activeStudioLayer === 'cms' ? 'active' : ''}`}
              onClick={() => setActiveStudioLayer('cms')}
            >
              4. Unlimited 3D Storytelling CMS
            </button>
          </div>

          <div className="studio-layer-explanation">
            {activeStudioLayer === 'ssr' && (
              <div className="layer-details-box">
                <h4>Next.js 16 App Router &amp; Dynamic Server Rendering</h4>
                <p>Khởi tạo cấu trúc Hybrid SSR cho tốc độ tải trang nhanh và tối ưu SEO vượt trội, kết hợp Turbopack compile dưới 2 giây.</p>
                <div className="layer-tags">
                  <span>Server Components</span>
                  <span>Turbopack Dev</span>
                  <span>Zero Layout Shift</span>
                </div>
              </div>
            )}
            {activeStudioLayer === 'auth' && (
              <div className="layer-details-box">
                <h4>Bảo Mật Xác Thực HttpOnly Cookie &amp; HMAC Token Hash</h4>
                <p>Bảo vệ toàn bộ khu vực Admin khỏi tấn công XSS bằng HttpOnly cookie với SHA-256 hash token trong PostgreSQL database.</p>
                <div className="layer-tags">
                  <span>HttpOnly Cookie</span>
                  <span>SameSite=Lax</span>
                  <span>XSS Protected</span>
                </div>
              </div>
            )}
            {activeStudioLayer === 'db' && (
              <div className="layer-details-box">
                <h4>Hệ Cơ Sở Dữ Liệu PostgreSQL (Neon Serverless)</h4>
                <p>Dữ liệu bài toán dự án, học vấn, chứng chỉ và tin nhắn liên hệ được lưu trữ an toàn với ACID transactions và auto-scaling.</p>
                <div className="layer-tags">
                  <span>Neon Connection Pooling</span>
                  <span>ACID Transactions</span>
                  <span>JSONB Flex Storage</span>
                </div>
              </div>
            )}
            {activeStudioLayer === 'cms' && (
              <div className="layer-details-box">
                <h4>Trình Quản Trị Kể Chuyện Storytelling 3D Không Giới Hạn</h4>
                <p>Admin có thể tạo không giới hạn số lượng phần mô tả chi tiết, tải ảnh minh họa và chọn phong cách diễn hoạt 3D độc bản cho từng dự án.</p>
                <div className="layer-tags">
                  <span>Unlimited Chapters</span>
                  <span>Bespoke 3D Engines</span>
                  <span>4MB Payload Scale</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CINEMATIC STAGE CARDS WITH SPATIAL DEPTH ZOOM */}
        <div className="keynote-stages-deck">
          {chapters.map((ch, idx) => (
            <section
              key={ch.id}
              id={ch.id}
              data-chapter-idx={idx}
              className={`keynote-chapter-stage ${idx === 0 ? 'is-keynote-revealed' : ''}`}
            >
              <div className="stage-card-depth">
                {/* Stage Header */}
                <div className="stage-card-header">
                  <div className="stage-badge-wrap">
                    <span className="stage-num-tag">STAGE {ch.number}</span>
                    <span className="stage-series-title">Portfolio Engineering Dossier</span>
                  </div>
                  <span className="stage-depth-marker">DEPTH LAYER 0{idx + 1}</span>
                </div>

                <h3 className="stage-title">{ch.title}</h3>
                <p className="stage-content">{ch.content}</p>

                {/* Technical notes as studio specs */}
                {ch.technicalNotes && ch.technicalNotes.length > 0 && (
                  <div className="stage-specs-box">
                    <div className="specs-box-heading">
                      <span>✦ Key Architectural &amp; Design Decisions</span>
                    </div>
                    <div className="specs-chips-grid">
                      {ch.technicalNotes.map((note, nIdx) => (
                        <div key={nIdx} className="spec-chip">
                          <span className="spec-chip-dot" />
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Screenshots in Studio Titanium Framing */}
                {ch.screenshots && ch.screenshots.length > 0 && (
                  <div className="stage-gallery-deck">
                    {ch.screenshots.map((s, sIdx) => (
                      <figure key={sIdx} className="stage-figure">
                        <div className="studio-retina-frame">
                          <div className="studio-mac-bar">
                            <div className="studio-mac-dots">
                              <span className="d d-close" />
                              <span className="d d-min" />
                              <span className="d d-max" />
                            </div>
                            <span className="studio-mac-title">{s.caption}</span>
                          </div>
                          <Image
                            src={s.url}
                            alt={s.alt || s.caption}
                            width={1200}
                            height={750}
                            className="studio-img"
                            unoptimized
                          />
                        </div>
                        <figcaption className="stage-caption">
                          <strong>{s.caption}</strong>
                          {s.description && <p>{s.description}</p>}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
