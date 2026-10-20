'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export type RevealPalette = 'netflix' | 'solar' | 'cyan';

interface NetflixLightRevealProps {
  autoPlayOnMount?: boolean;
}

declare global {
  interface Window {
    __playNetflixReveal?: (palette?: RevealPalette) => void;
  }
}

/**
 * NetflixLightReveal
 * Cinematic Light Sweep Reveal Animation powered by GSAP + CSS Masking + Glow Effect.
 * Sweeps from Left to Right (x = 0 -> 100vw), revealing the website UI behind the glowing beam.
 */
export function NetflixLightReveal({ autoPlayOnMount = true }: NetflixLightRevealProps) {
  const veilRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(false);
  const [currentPalette, setCurrentPalette] = useState<RevealPalette>('netflix');
  const [isActive, setIsActive] = useState(false);

  const playReveal = useCallback((palette: RevealPalette = 'netflix', onComplete?: () => void) => {
    if (typeof window === 'undefined') return;
    if (isPlayingRef.current) return;

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (veilRef.current) veilRef.current.style.display = 'none';
      if (beamRef.current) beamRef.current.style.display = 'none';
      onComplete?.();
      return;
    }

    isPlayingRef.current = true;
    setCurrentPalette(palette);
    setIsActive(true);

    const veil = veilRef.current;
    const beam = beamRef.current;

    if (!veil || !beam) {
      isPlayingRef.current = false;
      return;
    }

    // Reset styles
    veil.style.display = 'block';
    veil.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    beam.style.display = 'block';
    beam.style.opacity = '0';

    const winW = window.innerWidth;
    const beamW = 220;
    const halfBeam = beamW / 2;

    // GSAP Timeline for silky 60/120fps sweep from LEFT (0) to RIGHT (winW)
    const animState = { progress: 0, opacity: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        if (veilRef.current) veilRef.current.style.display = 'none';
        if (beamRef.current) {
          beamRef.current.style.display = 'none';
          beamRef.current.style.opacity = '0';
        }
        isPlayingRef.current = false;
        setIsActive(false);
        try {
          sessionStorage.setItem('hh_netflix_revealed', 'true');
        } catch {}
        onComplete?.();
      },
    });

    // 1. Initial fade-in of beam at left edge
    tl.to(animState, {
      opacity: 1,
      duration: 0.08,
      ease: 'power1.out',
      onUpdate: () => {
        if (beamRef.current) {
          beamRef.current.style.opacity = String(animState.opacity);
        }
      },
    })
      // 2. Cinematic sweep from Left to Right with CSS Masking (clip-path)
      .to(
        animState,
        {
          progress: 1,
          duration: 1.15,
          ease: 'power3.inOut',
          onUpdate: () => {
            const currentX = animState.progress * (winW + 80);

            // Move the beam
            if (beamRef.current) {
              gsap.set(beamRef.current, {
                x: currentX - halfBeam,
              });
            }

            // CSS Masking: Cut away the dark veil from left to right as the light beam sweeps
            if (veilRef.current) {
              const maskX = Math.max(0, currentX);
              veilRef.current.style.clipPath = `polygon(${maskX}px 0, 100% 0, 100% 100%, ${maskX}px 100%)`;
            }

            // In the final 12%, smoothly fade out the beam
            if (animState.progress > 0.88) {
              const fadeRatio = (1 - animState.progress) / 0.12;
              if (beamRef.current) {
                beamRef.current.style.opacity = String(Math.max(0, fadeRatio));
              }
            }
          },
        },
        '-=0.04'
      );
  }, []);

  useEffect(() => {
    // Expose global method for user testing & dev triggers
    if (typeof window !== 'undefined') {
      window.__playNetflixReveal = (palette = 'netflix') => {
        playReveal(palette);
      };
    }

    // Auto-play on first mount if enabled
    if (autoPlayOnMount) {
      // Small timeout to allow DOM to hydrate cleanly
      const timer = setTimeout(() => {
        playReveal('netflix');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlayOnMount, playReveal]);

  return (
    <>
      {/* Dark Overlay Veil (CSS Masked during reveal) */}
      <div
        id="hh-netflix-intro-veil"
        ref={veilRef}
        className="hh-netflix-reveal-veil"
        aria-hidden="true"
        style={{ display: isActive ? 'block' : 'none' }}
      />

      {/* Netflix Glowing Light Beam Container */}
      <div
        id="hh-netflix-beam-overlay"
        className="hh-netflix-beam-overlay"
        aria-hidden="true"
        style={{ display: isActive ? 'block' : 'none' }}
      >
        <div
          ref={beamRef}
          className={`hh-netflix-beam-column palette-${currentPalette}`}
          style={{ opacity: 0 }}
        >
          {/* Layer 1: Razor-sharp 2.5px pure white laser core */}
          <div className="hh-beam-laser-core" />

          {/* Layer 2: Netflix Anamorphic Horizontal Flare streak */}
          <div className="hh-beam-horizontal-flare" />

          {/* Layer 3: Neon Ribbon Glow (Netflix Crimson Red / Solar Gold / Cyber Cyan) */}
          <div className="hh-beam-ribbon" />

          {/* Layer 4: Wide Atmospheric Bloom */}
          <div className="hh-beam-ambient" />
        </div>
      </div>
    </>
  );
}
