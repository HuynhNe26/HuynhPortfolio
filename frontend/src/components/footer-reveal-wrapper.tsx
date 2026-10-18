'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface FooterRevealWrapperProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function FooterRevealWrapper({ children, footer }: FooterRevealWrapperProps) {
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [isRevealActive, setIsRevealActive] = useState<boolean>(false);
  const [revealProgress, setRevealProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

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

  // Monitor scroll position to calculate reveal progress & toggle visibility/pointer events
  useEffect(() => {
    if (!isRevealActive || footerHeight === 0) {
      setIsVisible(true);
      setRevealProgress(1);
      return;
    }

    const handleScroll = () => {
      if (!contentRef.current) return;
      const contentRect = contentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // contentRect.bottom is distance from top of viewport to bottom of content
      // When contentRect.bottom <= windowHeight, the bottom of content has scrolled into or above viewport
      const distancePastBottom = windowHeight - contentRect.bottom;

      if (distancePastBottom <= -200) {
        // Far above footer reveal zone
        setIsVisible(false);
        setRevealProgress(0);
      } else {
        // Within or near reveal zone
        setIsVisible(true);
        const clampedRevealed = Math.max(0, Math.min(footerHeight, distancePastBottom));
        const progress = clampedRevealed / footerHeight;
        setRevealProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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
                visibility: isVisible ? 'visible' : 'hidden',
                pointerEvents: isVisible && revealProgress > 0.1 ? 'auto' : 'none',
                transform: `translateY(${(1 - revealProgress) * -16}px)`,
                opacity: 0.85 + revealProgress * 0.15,
                transition: 'transform 0.06s linear, opacity 0.06s linear',
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
