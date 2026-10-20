'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface FooterRevealWrapperProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function FooterRevealWrapper({ children, footer }: FooterRevealWrapperProps) {
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [isRevealActive, setIsRevealActive] = useState<boolean>(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Measure footer height dynamically with ResizeObserver
  const updateMetrics = useCallback(() => {
    if (!footerRef.current) return;
    const h = footerRef.current.offsetHeight;
    if (h > 0) {
      setFooterHeight(h);
      // Only activate fixed reveal if viewport is tall enough to display the footer comfortably
      const isTallEnough = window.innerHeight > h * 0.75;
      setIsRevealActive(isTallEnough);
    }
  }, []);

  useEffect(() => {
    updateMetrics();

    if (!footerRef.current) return;
    const ro = new ResizeObserver(() => {
      updateMetrics();
    });
    ro.observe(footerRef.current);

    window.addEventListener('resize', updateMetrics);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMetrics);
    };
  }, [updateMetrics]);

  // Direct high-performance 120 FPS scroll listener without React rerender overhead or CSS transition lag
  useEffect(() => {
    if (!isRevealActive || footerHeight === 0) {
      if (footerRef.current) {
        footerRef.current.style.visibility = 'visible';
        footerRef.current.style.pointerEvents = 'auto';
        footerRef.current.style.transform = 'none';
        footerRef.current.style.opacity = '1';
      }
      return;
    }

    let ticking = false;

    const updateFooterReveal = () => {
      if (!contentRef.current || !footerRef.current) {
        ticking = false;
        return;
      }
      const contentRect = contentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distancePastBottom = windowHeight - contentRect.bottom;

      if (distancePastBottom <= -120) {
        // Far above reveal zone
        footerRef.current.style.visibility = 'hidden';
        footerRef.current.style.pointerEvents = 'none';
      } else {
        // Within or near reveal zone
        footerRef.current.style.visibility = 'visible';
        footerRef.current.style.pointerEvents = distancePastBottom > 20 ? 'auto' : 'none';

        const clampedRevealed = Math.max(0, Math.min(footerHeight, distancePastBottom));
        const progress = clampedRevealed / footerHeight;

        // Direct hardware-accelerated transform with zero transition lag
        footerRef.current.style.transform = `translate3d(0, ${(1 - progress) * -16}px, 0)`;
        footerRef.current.style.opacity = `${0.9 + progress * 0.1}`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateFooterReveal);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateFooterReveal();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isRevealActive, footerHeight]);

  return (
    <div
      className="site-layout-root"
      data-footer-reveal={isRevealActive ? 'active' : 'inactive'}
      style={
        isRevealActive && footerHeight > 0
          ? ({ '--footer-reveal-height': `${footerHeight}px` } as React.CSSProperties)
          : undefined
      }
    >
      {/* Upper content layer sliding above footer */}
      <div
        ref={contentRef}
        className="site-content-layer"
        style={{
          marginBottom: isRevealActive && footerHeight > 0 ? `${footerHeight}px` : undefined,
          boxShadow: isRevealActive
            ? '0 32px 64px -16px rgba(15, 23, 42, 0.12), 0 12px 24px -8px rgba(15, 23, 42, 0.05)'
            : undefined,
        }}
      >
        {children}
      </div>

      {/* Footer Reveal layer anchored underneath */}
      <div
        ref={footerRef}
        className="site-footer-reveal-container"
        style={
          isRevealActive
            ? {
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 1,
                willChange: 'transform, opacity',
              }
            : {
                position: 'relative',
                zIndex: 1,
              }
        }
      >
        {footer}
      </div>
    </div>
  );
}
