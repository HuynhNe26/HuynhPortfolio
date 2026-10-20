'use client';

import { useEffect } from 'react';

/**
 * ScrollRevealProvider
 * High-performance IntersectionObserver orchestrator that manages
 * progressive lazy loading and scroll reveal animations across all sections.
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    // If user prefers reduced motion, reveal everything immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.hh-reveal').forEach((el) => el.classList.add('hh-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hh-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // Target major cards, section headings, and custom reveal elements
    const elements = document.querySelectorAll(
      '.hh-reveal, .hh-about-card, .hh-project-card, .hh-skills-card, .hh-edu-card, .hh-cert-card, .hh-contact-card, .hh-section-heading'
    );

    elements.forEach((el) => {
      el.classList.add('hh-reveal');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
