'use client';

import React, { createContext, useContext, useEffect, useRef, useState, startTransition } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isSweeping: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'huynh_portfolio_theme';
const FREEZE_STYLE_ID = 'hh-theme-freeze-style';

function applyThemeToDom(targetTheme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', targetTheme);
  root.classList.toggle('dark', targetTheme === 'dark');
  root.classList.toggle('light', targetTheme === 'light');
  root.style.colorScheme = targetTheme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const themeRef = useRef<Theme>('light');
  const cleanupRafRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') {
        themeRef.current = stored;
        setThemeState(stored);
        applyThemeToDom(stored);
      } else {
        const prefersDark =
          window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme: Theme = prefersDark ? 'dark' : 'light';
        themeRef.current = initialTheme;
        setThemeState(initialTheme);
        applyThemeToDom(initialTheme);
      }
    } catch {
      // Fallback in case localStorage access fails
    }

    return () => {
      if (cleanupRafRef.current) {
        cancelAnimationFrame(cleanupRafRef.current);
      }
    };
  }, []);

  const switchThemeFast = (nextTheme: Theme) => {
    if (typeof document === 'undefined') {
      themeRef.current = nextTheme;
      setThemeState(nextTheme);
      return;
    }

    // Cancel any pending unfreeze from rapid clicking
    if (cleanupRafRef.current) {
      cancelAnimationFrame(cleanupRafRef.current);
      cleanupRafRef.current = null;
    }

    // 1. Freeze expensive per-element CSS transitions in a single stylesheet pass
    //    while keeping the header thumb slide smooth. Avoids Retina dual-framebuffer
    //    ViewTransition rasterization & backdrop-filter lag on macOS Safari / Chrome.
    let freezeStyle = document.getElementById(FREEZE_STYLE_ID) as HTMLStyleElement | null;
    if (!freezeStyle) {
      freezeStyle = document.createElement('style');
      freezeStyle.id = FREEZE_STYLE_ID;
      freezeStyle.textContent =
        '*, *::before, *::after { transition: none !important; } .hh-theme-toggle-thumb, .hh-theme-icon { transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s ease, color 0.2s ease !important; }';
      document.head.appendChild(freezeStyle);
    }

    // 2. Apply CSS variable theme switch in one atomic DOM mutation
    themeRef.current = nextTheme;
    applyThemeToDom(nextTheme);

    // 3. Schedule non-blocking React state reconciliation so browser paints immediately
    startTransition(() => {
      setThemeState(nextTheme);
    });

    // 4. Remove freeze stylesheet after the painted frame completes
    cleanupRafRef.current = requestAnimationFrame(() => {
      cleanupRafRef.current = requestAnimationFrame(() => {
        const el = document.getElementById(FREEZE_STYLE_ID);
        if (el) el.remove();
        cleanupRafRef.current = null;
      });
    });

    // 5. Persist preference off the critical paint path
    setTimeout(() => {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {}
    }, 0);
  };

  const setTheme = (newTheme: Theme) => {
    if (newTheme === themeRef.current) return;
    switchThemeFast(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme: Theme = themeRef.current === 'dark' ? 'light' : 'dark';
    switchThemeFast(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isSweeping: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
