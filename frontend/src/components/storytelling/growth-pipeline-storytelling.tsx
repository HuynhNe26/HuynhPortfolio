'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ProjectChapter, Project } from '@/lib/types';

interface GrowthPipelineStorytellingProps {
  project: Project;
  chapters: ProjectChapter[];
}

export function GrowthPipelineStorytelling({ project, chapters }: GrowthPipelineStorytellingProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activePipelineStep, setActivePipelineStep] = useState(1);

  useEffect(() => {
    const chapterEls = document.querySelectorAll<HTMLElement>('.pipeline-chapter-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-pipeline-revealed');
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
    <div className="growth-pipeline-root">
      <div className="container">
        {/* INTERACTIVE MAKE.COM AUTOMATION PIPELINE VISUALIZER */}
        <div className="growth-simulator-card">
          <div className="simulator-header">
            <div className="sim-title-group">
              <span className="sim-lightning-icon">⚡</span>
              <div>
                <h3 className="sim-title">Make.com Webhook Automation &amp; Lead Ingestion Engine</h3>
                <p className="sim-sub">Mô phỏng luồng dữ liệu tự động hóa zero-latency từ Form website tới CRM &amp; Email</p>
              </div>
            </div>
            <div className="sim-speed-badge">0-LATENCY STREAM</div>
          </div>

          <div className="pipeline-interactive-nodes">
            <div
              className={`pipeline-node-box ${activePipelineStep === 1 ? 'active' : ''}`}
              onClick={() => setActivePipelineStep(1)}
            >
              <div className="node-num">01</div>
              <strong className="node-name">Inbound Lead</strong>
              <span className="node-meta">Khách gửi yêu cầu</span>
            </div>

            <div className="pipeline-connector-arrow">
              <span className="pipeline-particle-dot" />
            </div>

            <div
              className={`pipeline-node-box ${activePipelineStep === 2 ? 'active' : ''}`}
              onClick={() => setActivePipelineStep(2)}
            >
              <div className="node-num">02</div>
              <strong className="node-name">Make.com Webhook</strong>
              <span className="node-meta">Phân tích JSON payload</span>
            </div>

            <div className="pipeline-connector-arrow">
              <span className="pipeline-particle-dot" />
            </div>

            <div
              className={`pipeline-node-box ${activePipelineStep === 3 ? 'active' : ''}`}
              onClick={() => setActivePipelineStep(3)}
            >
              <div className="node-num">03</div>
              <strong className="node-name">CRM Ingestion</strong>
              <span className="node-meta">Tạo lead trên Sheet/CRM</span>
            </div>

            <div className="pipeline-connector-arrow">
              <span className="pipeline-particle-dot" />
            </div>

            <div
              className={`pipeline-node-box ${activePipelineStep === 4 ? 'active' : ''}`}
              onClick={() => setActivePipelineStep(4)}
            >
              <div className="node-num">04</div>
              <strong className="node-name">Instant Response</strong>
              <span className="node-meta">Gửi email xác nhận tức thời</span>
            </div>
          </div>

          <div className="pipeline-step-explanation">
            {activePipelineStep === 1 && (
              <p>Khách hàng tiềm năng điền form tư vấn chiến dịch Marketing trên Landing Page. Dữ liệu được xác thực hợp lệ ngay tại client-side.</p>
            )}
            {activePipelineStep === 2 && (
              <p>Webhook bí mật gửi payload tức thời đến Make.com scenario mà không gây trễ giao diện người dùng (tốc độ xử lý dưới 50ms).</p>
            )}
            {activePipelineStep === 3 && (
              <p>Make.com lọc dữ liệu, phân loại quy mô ngân sách và đồng bộ thẳng vào hệ thống quản lý khách hàng của đội ngũ Agency.</p>
            )}
            {activePipelineStep === 4 && (
              <p>Email thư chào mừng kèm brochure báo giá tự động gửi vào hòm thư khách hàng ngay lập tức, tăng 340% tỉ lệ chốt lịch hẹn.</p>
            )}
          </div>
        </div>

        {/* VERTICAL PIPELINE CHAPTERS WITH KINETIC CONDUIT */}
        <div className="pipeline-chapters-track">
          <div className="vertical-conduit-pipe" aria-hidden="true">
            <div className="conduit-energy-pulse" />
          </div>

          <div className="pipeline-cards-list">
            {chapters.map((ch, idx) => (
              <div
                key={ch.id}
                id={ch.id}
                data-chapter-idx={idx}
                className={`pipeline-chapter-card ${idx % 2 === 0 ? 'branch-left' : 'branch-right'} ${idx === 0 ? 'is-pipeline-revealed' : ''}`}
              >
                <div className="pipeline-node-marker">
                  <span>{ch.number}</span>
                </div>

                <div className="pipeline-content-box">
                  <div className="pipeline-badge-strip">
                    <span className="pipeline-phase-pill">PIPELINE MILESTONE {ch.number}</span>
                    <span className="pipeline-metric-tag">+340% VELOCITY</span>
                  </div>

                  <h3 className="pipeline-card-title">{ch.title}</h3>
                  <p className="pipeline-card-desc">{ch.content}</p>

                  {/* Technical Notes */}
                  {ch.technicalNotes && ch.technicalNotes.length > 0 && (
                    <div className="pipeline-tech-panel">
                      <div className="tech-panel-header">
                        <span>⚡ AUTOMATION WORKFLOWS &amp; ARCHITECTURE</span>
                      </div>
                      <ul>
                        {ch.technicalNotes.map((note, nIdx) => (
                          <li key={nIdx}>
                            <span className="pipeline-arrow-icon">→</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Screenshots */}
                  {ch.screenshots && ch.screenshots.length > 0 && (
                    <div className="pipeline-gallery">
                      {ch.screenshots.map((s, sIdx) => (
                        <figure key={sIdx} className="pipeline-figure">
                          <div className="pipeline-img-frame">
                            <Image
                              src={s.url}
                              alt={s.alt || s.caption}
                              width={1200}
                              height={750}
                              className="pipeline-img"
                              unoptimized
                            />
                            <div className="pipeline-live-tag">LIVE AUTOMATION DECK</div>
                          </div>
                          <figcaption className="pipeline-caption">
                            <strong>{s.caption}</strong>
                            {s.description && <p>{s.description}</p>}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
