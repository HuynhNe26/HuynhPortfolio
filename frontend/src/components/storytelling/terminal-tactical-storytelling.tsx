'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ProjectChapter, Project } from '@/lib/types';

interface TerminalTacticalStorytellingProps {
  project: Project;
  chapters: ProjectChapter[];
}

export function TerminalTacticalStorytelling({ project, chapters }: TerminalTacticalStorytellingProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [examTimer, setExamTimer] = useState(2658); // 44m 18s
  const [autosaveCount, setAutosaveCount] = useState(42);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setExamTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    const saveInterval = setInterval(() => {
      setAutosaveCount((c) => c + 1);
    }, 6000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(saveInterval);
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    const chapterEls = document.querySelectorAll<HTMLElement>('.tactical-chapter-deck');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-tactical-revealed');
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
    <div className="tactical-terminal-root">
      <div className="container">
        {/* INTERACTIVE EXAM ENGINE & TELEMETRY HUD WIDGET */}
        <div className="tactical-hud-panel">
          <div className="hud-panel-top">
            <div className="hud-status-badge">
              <span className="telemetry-beacon" />
              <span>EDTECH ASSESSMENT KERNEL v2.6 // SECURE SESSION</span>
            </div>
            <div className="hud-session-info">
              <span>SESSION: <strong>EXAM-2026-LIVE</strong></span>
              <span className="hud-divider">|</span>
              <span>INTEGRITY: <strong className="text-green">VERIFIED (0 FLAGS)</strong></span>
            </div>
          </div>

          <div className="hud-metrics-row">
            <div className="hud-metric-box">
              <span className="hud-metric-label">TIME REMAINING</span>
              <span className="hud-metric-val mono-timer">{formatTimer(examTimer)}</span>
              <span className="hud-metric-sub">Strict Server-side Lock</span>
            </div>

            <div className="hud-metric-box">
              <span className="hud-metric-label">REDIS AUTOSAVE PING</span>
              <span className="hud-metric-val text-green">SYNCED ({autosaveCount})</span>
              <span className="hud-metric-sub">Latency: 11ms to Neon PostgreSQL</span>
            </div>

            <div className="hud-metric-box">
              <span className="hud-metric-label">ANTI-CHEAT TELEMETRY</span>
              <span className="hud-metric-val">100% ACTIVE</span>
              <span className="hud-metric-sub">Tab-blur &amp; Multi-device Guard</span>
            </div>

            <div className="hud-metric-box">
              <span className="hud-metric-label">ADAPTIVE DIFFICULTY</span>
              <span className="hud-metric-val text-accent">LEVEL 4/5</span>
              <span className="hud-metric-sub">AI Rubric Calibration</span>
            </div>
          </div>
        </div>

        {/* 3D TACTICAL BLUEPRINT CHAPTERS DECK */}
        <div className="tactical-chapters-flow">
          {chapters.map((ch, idx) => (
            <section
              key={ch.id}
              id={ch.id}
              data-chapter-idx={idx}
              className={`tactical-chapter-deck ${idx === 0 ? 'is-tactical-revealed' : ''}`}
            >
              <div className="tactical-card-container">
                {/* Tactical Top Coordinates */}
                <div className="tactical-top-coordinates">
                  <div className="coord-left">
                    <span className="coord-phase">MODULE {ch.number}</span>
                    <span className="coord-code">SYS_ARCH//SEC_{idx + 1}</span>
                  </div>
                  <div className="coord-right">
                    <span>STATE: <strong>DEPLOYED_PROD</strong></span>
                  </div>
                </div>

                <h3 className="tactical-heading">{ch.title}</h3>
                <p className="tactical-prose">{ch.content}</p>

                {/* Technical notes as Architecture Checklist */}
                {ch.technicalNotes && ch.technicalNotes.length > 0 && (
                  <div className="tactical-checklist-box">
                    <div className="checklist-heading">
                      <span className="checklist-icon">⚡</span>
                      <span>SYSTEM ARCHITECTURE &amp; PERFORMANCE BENCHMARKS</span>
                    </div>
                    <div className="checklist-grid">
                      {ch.technicalNotes.map((note, nIdx) => (
                        <div key={nIdx} className="checklist-item">
                          <span className="check-mark">✓</span>
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Screenshots in Blueprint Frame */}
                {ch.screenshots && ch.screenshots.length > 0 && (
                  <div className="tactical-screens-grid">
                    {ch.screenshots.map((s, sIdx) => (
                      <figure key={sIdx} className="tactical-figure">
                        <div className="blueprint-viewport">
                          <Image
                            src={s.url}
                            alt={s.alt || s.caption}
                            width={1200}
                            height={750}
                            className="tactical-img"
                            unoptimized
                          />
                          <div className="blueprint-grid-overlay" />
                          <div className="blueprint-tag">VERIFIED CAPTURE {ch.number}.{sIdx + 1}</div>
                        </div>
                        <figcaption className="tactical-caption">
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
