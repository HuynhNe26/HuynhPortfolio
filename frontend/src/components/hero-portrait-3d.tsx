'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface HeroPortrait3DProps {
  avatarUrl?: string;
  name?: string;
  role?: string;
  institution?: string;
  gpa?: string;
}

export function HeroPortrait3D({
  avatarUrl = '/avatar.jpg',
  name = 'Nguyễn Hoàng Huynh',
  role = 'Full-Stack Software Engineer',
  institution = 'Vietnam Aviation Academy',
  gpa = '3.1 / 4.0',
}: HeroPortrait3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'sliced' | 'frame'>('sliced');
  const [tilt, setTilt] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    // Limit maximum tilt angle to ±14 degrees for smooth cinematic feel
    setTilt({
      x: -yRatio * 18,
      y: xRatio * 22,
      active: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, active: false });
  }, []);

  return (
    <div className="hero-portrait-3d-scene" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Ambient background volumetric lighting glow */}
      <div className="scene-ambient-glow" aria-hidden="true" />
      <div className="scene-accent-ring" aria-hidden="true" />

      {/* 3D Tilted Perspective Canvas */}
      <div
        className={`scene-canvas ${tilt.active ? 'is-interacting' : ''}`}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* =========================================================================
            MODE 1: 3D DIAGONAL CINEMATIC SLICES (CẮT XÉO 3D CINEMATIC)
            Three staggered, angled perspective planes with parallax depth on Z-axis
            ========================================================================= */}
        {mode === 'sliced' && (
          <div className="slices-composition" aria-label={`3D Cinematic sliced portrait of ${name}`}>
            {/* Slice 1: Left Diagonal Slice */}
            <div className="slice-strip slice-left">
              <div className="slice-inner">
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  sizes="480px"
                  className="slice-img"
                  priority
                  unoptimized
                />
              </div>
              <div className="slice-glass-border" />
              <div className="slice-label">
                <span>01 // PERSPECTIVE</span>
              </div>
            </div>

            {/* Slice 2: Center Hero Diagonal Slice (Elevated in Z-space) */}
            <div className="slice-strip slice-center">
              <div className="slice-inner">
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  sizes="480px"
                  className="slice-img"
                  priority
                  unoptimized
                />
              </div>
              <div className="slice-glass-border highlight" />
              <div className="slice-sheen" />
              <div className="slice-center-reticle" aria-hidden="true">
                <span className="reticle-dot" />
                <span className="reticle-line-h" />
                <span className="reticle-line-v" />
              </div>
            </div>

            {/* Slice 3: Right Diagonal Slice */}
            <div className="slice-strip slice-right">
              <div className="slice-inner">
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  sizes="480px"
                  className="slice-img"
                  priority
                  unoptimized
                />
              </div>
              <div className="slice-glass-border" />
              <div className="slice-label right">
                <span>03 // APPLIED AI</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODE 2: CINEMATIC MONOLITH FRAME (KHUNG HÌNH 3D CINEMATIC SẮC NÉT)
            Full high-res portrait with diagonal cuts, corner HUD brackets & laser sweep
            ========================================================================= */}
        {mode === 'frame' && (
          <div className="monolith-composition" aria-label={`Cinematic portrait of ${name}`}>
            <div className="monolith-glass-card">
              <div className="monolith-portrait-box">
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  sizes="480px"
                  className="monolith-img"
                  priority
                  unoptimized
                />
                <div className="monolith-vignette" />
                <div className="monolith-diagonal-slashes" aria-hidden="true">
                  <span className="diagonal-slash slash-1" />
                  <span className="diagonal-slash slash-2" />
                </div>
              </div>

              {/* Corner HUD Brackets */}
              <div className="hud-corner top-left" aria-hidden="true" />
              <div className="hud-corner top-right" aria-hidden="true" />
              <div className="hud-corner bottom-left" aria-hidden="true" />
              <div className="hud-corner bottom-right" aria-hidden="true" />

              {/* Card Footer Identifier */}
              <div className="monolith-footer">
                <div className="monolith-id-col">
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
                <div className="monolith-status-tag">
                  <span className="status-indicator-dot" />
                  <span>Verified Identity</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            FLOATING 3D GLASS HUD BADGES (CÁC THẺ NỔI 3D TRONG KHÔNG GIAN)
            These badges float above the canvas on translateZ for high cinematic immersion
            ========================================================================= */}
        <div className="floating-badge badge-top-left">
          <div className="badge-icon-box">
            <span className="badge-pulse-dot" />
          </div>
          <div className="badge-text">
            <strong>Open for Roles</strong>
            <span>Class of 2026 • IT Major</span>
          </div>
        </div>

        <div className="floating-badge badge-bottom-right">
          <div className="badge-icon-box blue">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div className="badge-text">
            <strong>{institution}</strong>
            <span className="highlight-score">Cumulative GPA: {gpa}</span>
          </div>
        </div>

        <div className="floating-badge badge-center-floating">
          <div className="badge-chip-pill">
            <span className="chip-code">NEXT.js 16 + NEON + AGENTIC AI</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE MODE CONTROLLER (NÚT CHUYỂN ĐỔI CHẾ ĐỘ 3D)
          Allows switching between 3D Diagonal Slices and Full Cinematic Monolith Frame
          ========================================================================= */}
      <div className="scene-mode-controller">
        <button
          type="button"
          className={`mode-pill-btn ${mode === 'sliced' ? 'active' : ''}`}
          onClick={() => setMode('sliced')}
          title="Switch to 3D Diagonal Sliced View"
        >
          <span className="btn-icon">📐</span>
          <span>3D Diagonal Slices</span>
        </button>
        <button
          type="button"
          className={`mode-pill-btn ${mode === 'frame' ? 'active' : ''}`}
          onClick={() => setMode('frame')}
          title="Switch to Full Cinematic 3D Frame"
        >
          <span className="btn-icon">🎬</span>
          <span>Cinematic Frame</span>
        </button>
      </div>
    </div>
  );
}
