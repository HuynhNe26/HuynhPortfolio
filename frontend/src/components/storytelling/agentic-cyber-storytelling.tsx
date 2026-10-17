'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ProjectChapter, Project } from '@/lib/types';

interface AgenticCyberStorytellingProps {
  project: Project;
  chapters: ProjectChapter[];
}

export function AgenticCyberStorytelling({ project, chapters }: AgenticCyberStorytellingProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activePromptTab, setActivePromptTab] = useState<'seats' | 'rag' | 'payment'>('rag');

  useEffect(() => {
    const chapterEls = document.querySelectorAll<HTMLElement>('.cyber-chapter-block');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-cyber-revealed');
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
    <div className="cyber-storytelling-root">
      {/* 3D FLOATING HOLOGRAPHIC RADAR SCANNER */}
      <div className="cyber-radar-hud">
        <div className="cyber-radar-pill">
          <div className="radar-sweep-disc">
            <span className="radar-sweep-beam" />
            <span className="radar-ping-dot" />
          </div>
          <span className="cyber-hud-label">
            NEURAL STREAM PHASE {chapters[activeIdx]?.number || '01'}/{String(chapters.length).padStart(2, '0')}:
          </span>
          <strong className="cyber-hud-title">{chapters[activeIdx]?.title.split('&')[0].trim()}</strong>
          <span className="cyber-hud-pulse">● LIVE</span>
        </div>
      </div>

      <div className="container cyber-story-deck">
        {/* INTERACTIVE AGENTIC REASONING SIMULATOR */}
        <div className="agentic-sim-panel">
          <div className="agentic-sim-header">
            <div className="sim-status-group">
              <span className="sim-pulse-dot" />
              <span className="sim-badge">LANGCHAIN.JS &amp; GEMINI 2.5 LIVE AGENTIC SIMULATOR</span>
            </div>
            <div className="sim-tab-buttons">
              <button
                type="button"
                className={`sim-tab ${activePromptTab === 'rag' ? 'active' : ''}`}
                onClick={() => setActivePromptTab('rag')}
              >
                01. Agentic RAG Pipeline
              </button>
              <button
                type="button"
                className={`sim-tab ${activePromptTab === 'seats' ? 'active' : ''}`}
                onClick={() => setActivePromptTab('seats')}
              >
                02. WebSocket Seat Lock
              </button>
              <button
                type="button"
                className={`sim-tab ${activePromptTab === 'payment' ? 'active' : ''}`}
                onClick={() => setActivePromptTab('payment')}
              >
                03. MoMo HMAC Settlement
              </button>
            </div>
          </div>

          <div className="agentic-sim-content">
            {activePromptTab === 'rag' && (
              <div className="sim-pipeline-flow">
                <div className="pipeline-step">
                  <span className="step-tag">PROMPT INGESTION</span>
                  <code>{'> '} User: &quot;Cho tôi biết khu vực VIP còn vé không và chính sách hoàn tiền ra sao?&quot;</code>
                </div>
                <div className="pipeline-arrow">↓ [Contextual Retrieval &amp; Embeddings Query]</div>
                <div className="pipeline-step highlight">
                  <span className="step-tag">AGENTIC TOOL EXECUTION</span>
                  <code>LangChain Tool Call: queryConcertVenueDB(concert_id: &quot;c-2026-hn&quot;, tier: &quot;VIP&quot;)</code>
                  <p className="step-desc">Vector store lọc metadata thời gian thực, đối soát với trạng thái hold trên Redis cache.</p>
                </div>
                <div className="pipeline-arrow">↓ [Gemini 2.5 Flash Synthesis]</div>
                <div className="pipeline-step result">
                  <span className="step-tag">DYNAMIC AI RESPONSE</span>
                  <p>
                    &quot;Khu vực VIP hiện còn <strong>14 ghế</strong> (hàng D &amp; E). Bạn có thể giữ ghế tối đa <strong>10 phút</strong>. Chính sách hủy vé: hỗ trợ hoàn 80% trước 7 ngày diễn ra sự kiện.&quot;
                  </p>
                </div>
              </div>
            )}

            {activePromptTab === 'seats' && (
              <div className="sim-pipeline-flow">
                <div className="pipeline-step">
                  <span className="step-tag">REAL-TIME WEBSOCKET</span>
                  <code>Socket.emit(&quot;SEAT_SELECT&quot;, &#123; seatId: &quot;VIP-D04&quot;, userId: &quot;usr-889&quot; &#125;)</code>
                </div>
                <div className="pipeline-arrow">↓ [Anti-Collision Lock Engine]</div>
                <div className="pipeline-step highlight">
                  <span className="step-tag">ATOMIC HOLD PROTOCOL</span>
                  <p>Redis TTL 600s kích hoạt. Broadcast sự kiện <code>SEAT_LOCKED</code> tới toàn bộ 1,200 người dùng đồng thời.</p>
                </div>
                <div className="pipeline-step result">
                  <span className="step-tag">STATUS: LOCKED FOR CHECKOUT</span>
                  <p>Ghế VIP-D04 chuyển sang màu vàng hổ phách. Đồng hồ đếm ngược 10:00 bắt đầu.</p>
                </div>
              </div>
            )}

            {activePromptTab === 'payment' && (
              <div className="sim-pipeline-flow">
                <div className="pipeline-step">
                  <span className="step-tag">PAYMENT GATEWAY</span>
                  <code>POST /api/payment/momo/create-qr &#123; orderId: &quot;ORD-99214&quot;, amount: 1850000 &#125;</code>
                </div>
                <div className="pipeline-arrow">↓ [HMAC SHA-256 Signature Verification]</div>
                <div className="pipeline-step highlight">
                  <span className="step-tag">IPN WEBHOOK SETTLEMENT</span>
                  <p>MoMo IPN Callback trả về <code>resultCode: 0</code>. PostgreSQL ACID Transaction cập nhật đơn hàng.</p>
                </div>
                <div className="pipeline-step result">
                  <span className="step-tag">TICKET ISSUED VIA RESEND</span>
                  <p>Vé điện tử QR code gửi tức thời về hộp thư của khách hàng trong <strong>420ms</strong>.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3D CHAPTERS LIST WITH SCANLINE & ISOMETRIC CARDS */}
        <div className="cyber-chapters-list">
          {chapters.map((ch, idx) => (
            <article
              key={ch.id}
              id={ch.id}
              data-chapter-idx={idx}
              className={`cyber-chapter-block ${idx % 2 === 0 ? 'tilt-left' : 'tilt-right'} ${idx === 0 ? 'is-cyber-revealed' : ''}`}
            >
              {/* Scanline laser beam */}
              <div className="cyber-card-scanline" aria-hidden="true" />

              <div className="cyber-card-inner">
                {/* Top status bar */}
                <div className="cyber-topbar">
                  <div className="cyber-phase-pill">
                    <span className="cyber-phase-num">PHASE {ch.number}</span>
                    <span className="cyber-phase-divider">/</span>
                    <span className="cyber-phase-total">{String(chapters.length).padStart(2, '0')}</span>
                  </div>
                  <div className="cyber-node-id">SYSTEM_NODE_{idx + 1}</div>
                </div>

                <h3 className="cyber-card-title">{ch.title}</h3>
                <p className="cyber-card-content">{ch.content}</p>

                {/* Technical notes */}
                {ch.technicalNotes && ch.technicalNotes.length > 0 && (
                  <div className="cyber-tech-matrix">
                    <div className="tech-matrix-header">
                      <span className="matrix-icon">⚡</span>
                      <span>ENGINEERING ARCHITECTURE &amp; CONSTRAINTS</span>
                    </div>
                    <ul className="cyber-notes-list">
                      {ch.technicalNotes.map((note, nIdx) => (
                        <li key={nIdx}>
                          <span className="cyber-bullet-chevron">›</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Screenshots Gallery */}
                {ch.screenshots && ch.screenshots.length > 0 && (
                  <div className="cyber-screenshots-grid">
                    {ch.screenshots.map((s, sIdx) => (
                      <figure key={sIdx} className="cyber-figure">
                        <div className="cyber-img-frame">
                          <Image
                            src={s.url}
                            alt={s.alt || s.caption}
                            width={1200}
                            height={750}
                            className="cyber-screenshot-img"
                            unoptimized
                          />
                          <div className="cyber-corner-bracket top-left" />
                          <div className="cyber-corner-bracket bottom-right" />
                        </div>
                        <figcaption className="cyber-caption">
                          <strong>{s.caption}</strong>
                          {s.description && <span> — {s.description}</span>}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
