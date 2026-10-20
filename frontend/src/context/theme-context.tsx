'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isSweeping: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'huynh_portfolio_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isSweeping] = useState(false);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    // 1. Check stored preference
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
        applyTheme(stored);
      } else {
        // 2. Check system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme: Theme = prefersDark ? 'dark' : 'light';
        setThemeState(initialTheme);
        applyTheme(initialTheme);
      }
    } catch {
      // Fallback in case localStorage access fails
    }
  }, []);

  const applyTheme = (targetTheme: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-theme', targetTheme);
    if (targetTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    if (isTransitioningRef.current) return;
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    // Modern Native View Transitions API: Pure Left-to-Right cinematic reveal
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      isTransitioningRef.current = true;

      const root = document.documentElement;
      root.setAttribute('data-theme-switching', 'true');
      root.setAttribute('data-theme-sweeping', 'true');

      try {
        const transition = (document as any).startViewTransition(() => {
          // Synchronously flush DOM and React updates before new snapshot is taken
          flushSync(() => {
            applyTheme(nextTheme);
            setThemeState(nextTheme);
          });
          try {
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
          } catch {}
        });

        transition.finished
          .catch(() => {})
          .finally(() => {
            root.removeAttribute('data-theme-sweeping');
            root.removeAttribute('data-theme-switching');
            isTransitioningRef.current = false;
          });
        return;
      } catch {
        root.removeAttribute('data-theme-sweeping');
        root.removeAttribute('data-theme-switching');
        isTransitioningRef.current = false;
      }
    }

    // Fallback for older browsers
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isSweeping }}>
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
