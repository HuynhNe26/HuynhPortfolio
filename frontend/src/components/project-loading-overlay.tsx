'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage, type Language } from '@/context/language-context';
import { useTheme, type Theme } from '@/context/theme-context';

interface ProjectLoadingContextType {
  isLoading: boolean;
  showLoading: (targetSlug?: string) => void;
  hideLoading: () => void;
}

const ProjectLoadingContext = createContext<ProjectLoadingContextType | undefined>(undefined);

export function useProjectLoading() {
  const context = useContext(ProjectLoadingContext);
  if (!context) {
    return {
      isLoading: false,
      showLoading: () => {},
      hideLoading: () => {},
    };
  }
  return context;
}

interface ProjectLoadingViewProps {
  lang?: Language;
  theme?: Theme;
  isFullPage?: boolean;
  onDismiss?: () => void;
}

/**
 * 3 Undulating Dots + Name Loading Component
 * Supports:
 * - Light and Dark modes
 * - 3 languages (vi, en, zh)
 * - English name without diacritics: "Nguyen Hoang Huynh"
 * - Vietnamese name: "Hoàng Huynh"
 * - Chinese name: "阮黄兄"
 */
export function ProjectLoadingView({
  lang: propLang,
  theme: propTheme,
  isFullPage = false,
  onDismiss,
}: ProjectLoadingViewProps) {
  const langContext = useLanguage();
  const themeContext = useTheme();

  const activeLang: Language = propLang || langContext?.lang || 'vi';
  const activeTheme: Theme = propTheme || themeContext?.theme || 'light';

  // Localized Name:
  // - vi: "Hoàng Huynh" (as requested: "trên hình 3 chấm đó có tên Hoàng Huynh")
  // - en: "Nguyen Hoang Huynh" (without diacritics as requested: "Sửa lại ngôn ngữ tiếng anh thì tên tôi viết không dấu. nó sẽ thành Nguyen Hoang Huynh.")
  // - zh: "阮黄兄"
  const displayName =
    activeLang === 'en'
      ? 'Nguyen Hoang Huynh'
      : activeLang === 'zh'
      ? '阮黄兄'
      : 'Hoàng Huynh';

  // Localized Subtitle / Status Text:
  const statusMessage =
    activeLang === 'en'
      ? 'Opening project details...'
      : activeLang === 'zh'
      ? '正在打开项目详情...'
      : 'Đang mở chi tiết dự án...';

  const accessibleLabel =
    activeLang === 'en'
      ? `Loading project details for ${displayName}...`
      : activeLang === 'zh'
      ? `正在载入 ${displayName} 的项目详情...`
      : `Đang tải chi tiết dự án của ${displayName}...`;

  return (
    <div
      className={`hh-project-loading-wrapper ${isFullPage ? 'is-fullpage' : 'is-overlay'} theme-${activeTheme}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={accessibleLabel}
    >
      {/* AMBIENT LIGHT / GLOW SPHERES IN BACKDROP */}
      <div className="hh-loading-ambient-orb orb-primary" aria-hidden="true" />
      <div className="hh-loading-ambient-orb orb-secondary" aria-hidden="true" />

      {/* CENTRAL FLOATING HUD CARD */}
      <div className="hh-loading-card">
        {/* HH MONOGRAM BADGE WITH BREATHING HALO */}
        <div className="hh-loading-brand-badge" aria-hidden="true">
          <div className="hh-loading-brand-ring" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hh-loading-logo-svg"
          >
            <path d="M6 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M6 16H16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M16 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M16 16H26" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M26 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* 1. TÊN NẰM TRÊN HÌNH 3 CHẤM (HOÀNG HUYNH / NGUYEN HOANG HUYNH / 阮黄兄) */}
        <div className="hh-loading-name-block">
          <h2 className="hh-loading-name" data-lang={activeLang}>
            {displayName}
          </h2>
          {activeLang === 'zh' && (
            <span className="hh-loading-sub-latin" aria-hidden="true">
              Nguyen Hoang Huynh
            </span>
          )}
        </div>

        {/* SUBTITLE STATUS */}
        <p className="hh-loading-status-text">
          {statusMessage}
        </p>

        {/* 2. HIỆU ỨNG LOADING HÌNH 3 CHẤM UỐN LƯỢN (3 UNDULATING SINE-WAVE DOTS) */}
        <div className="hh-undulate-dots-wrapper" aria-hidden="true">
          {/* SINE-WAVE ILLUMINATED TRACK UNDER THE 3 DOTS */}
          <svg
            className="hh-undulate-track-svg"
            viewBox="0 0 160 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="hhWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--hh-wave-stop1, #2563EB)" stopOpacity="0.2" />
                <stop offset="30%" stopColor="var(--hh-wave-stop2, #38BDF8)" stopOpacity="0.9" />
                <stop offset="50%" stopColor="var(--hh-wave-stop3, #818CF8)" stopOpacity="1" />
                <stop offset="70%" stopColor="var(--hh-wave-stop4, #EC4899)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--hh-wave-stop5, #2563EB)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M 12 18 C 36 2, 54 34, 80 18 C 106 2, 124 34, 148 18"
              stroke="url(#hhWaveGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              className="hh-undulate-path"
            />
          </svg>

          {/* THE 3 UNDULATING DOTS IN HARMONIC WAVE MOTION */}
          <div className="hh-undulate-dots-row">
            <span className="hh-undulate-dot dot-1" />
            <span className="hh-undulate-dot dot-2" />
            <span className="hh-undulate-dot dot-3" />
          </div>
        </div>

        {/* OPTIONAL DISMISS BUTTON (ONLY IF TAKES UNUSUALLY LONG) */}
        {onDismiss && (
          <button
            type="button"
            className="hh-loading-close-btn"
            onClick={onDismiss}
            aria-label="Close loading overlay"
            title="Đóng hiệu ứng loading"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Global Project Loading Overlay Provider
 * Intercepts clicks on project detail links and displays the 3 undulating dots + name effect.
 */
export function ProjectLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showLoading = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsLoading(true);

    // Safety timeout: automatically dismiss after 6 seconds in case of network issue
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  const hideLoading = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const minDuration = 650; // Ensure at least 650ms for smooth undulating wave cycle
    const remaining = Math.max(0, minDuration - elapsed);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, remaining);
  }, []);

  // When pathname changes (navigation completes), smoothly hide loading
  useEffect(() => {
    if (isLoading) {
      hideLoading();
    }
  }, [pathname, hideLoading, isLoading]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  // Global click interceptor for any project detail link: /projects/[slug]
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't intercept if modifier keys were pressed (open in new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      // Ignore links with target="_blank"
      if (anchor.target === '_blank') return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Match /projects/[slug] where slug is non-empty and not "all"
      const match = href.match(/^\/projects\/([^/?#]+)/);
      if (match && match[1]) {
        // If clicking link to the current page we are already on, skip
        if (typeof window !== 'undefined' && window.location.pathname === href) {
          return;
        }
        showLoading();
      }
    };

    // ESC key listener to quickly dismiss if user wishes
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLoading(false);
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showLoading]);

  return (
    <ProjectLoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && (
        <ProjectLoadingView
          isFullPage={false}
          onDismiss={() => setIsLoading(false)}
        />
      )}
    </ProjectLoadingContext.Provider>
  );
}
