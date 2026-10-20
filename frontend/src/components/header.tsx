'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/language-context';
import { useTheme } from '@/context/theme-context';
import { smoothScrollToTop } from '@/lib/smooth-scroll';
import { LanguageDropdown } from '@/components/language-dropdown';

interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  targetId: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelKey: 'nav.home', href: '/', targetId: 'home' },
  { id: 'about', labelKey: 'nav.about', href: '/#about', targetId: 'about' },
  { id: 'projects', labelKey: 'nav.projects', href: '/#projects', targetId: 'projects' },
  { id: 'skills', labelKey: 'nav.experience', href: '/#skills', targetId: 'skills' },
  { id: 'education', labelKey: 'nav.education', href: '/#education', targetId: 'education' },
  { id: 'contact', labelKey: 'nav.contact', href: '/#contact', targetId: 'contact' },
];

// Sections in their exact vertical order on the homepage
const HOMEPAGE_SECTIONS = [
  'home',
  'about',
  'projects',
  'skills',
  'education',
  'contact',
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const isClickScrollingRef = useRef(false);
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // ScrollSpy listener for homepage
  useEffect(() => {
    // If not on homepage, let pathname determine active item
    if (pathname !== '/') return;

    // Check initial hash on mount (e.g. user arrived with /#about)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (HOMEPAGE_SECTIONS.includes(hash)) {
        setActiveSection(hash);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    }

    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // If a user just clicked a nav link, suppress spy until smooth scroll finishes
      if (isClickScrollingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;

          // 1. Near the top
          if (scrollY < 90) {
            setActiveSection('home');
            ticking = false;
            return;
          }

          // 2. Near the bottom (always highlight contact)
          if (windowHeight + scrollY >= docHeight - 80) {
            setActiveSection('contact');
            ticking = false;
            return;
          }

          // 3. Focal line check (160px from viewport top)
          const focalPoint = 160;
          let current = 'home';

          for (const id of HOMEPAGE_SECTIONS) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= focalPoint) {
                current = id;
              }
            }
          }

          setActiveSection(current);
          ticking = false;
        });

        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Click handler for nav links
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    setOpen(false);

    if (pathname === '/') {
      e.preventDefault();
      setActiveSection(item.targetId);
      isClickScrollingRef.current = true;

      if (item.targetId === 'home') {
        smoothScrollToTop(850);
        try {
          history.pushState(null, '', '/');
        } catch {}
      } else {
        const el = document.getElementById(item.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          try {
            history.pushState(null, '', `/#${item.targetId}`);
          } catch {}
        } else {
          window.location.href = item.href;
        }
      }

      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 850);
    }
  };

  // Determine if a nav item is currently active
  const isItemActive = (item: NavItem) => {
    if (pathname === '/') {
      return activeSection === item.targetId;
    }
    if (item.targetId === 'projects' && pathname.startsWith('/projects')) {
      return true;
    }
    if (item.targetId === 'contact' && pathname === '/contact') {
      return true;
    }
    if (item.targetId === 'about' && pathname === '/about') {
      return true;
    }
    return false;
  };

  return (
    <header className={`hh-site-header ${isScrolled || open ? 'is-scrolled' : ''}`}>
      <div className="container hh-header-inner">
        {/* HH MONOGRAM LOGO & BRAND NAME */}
        <Link
          className="hh-brand-logo"
          href="/"
          aria-label="Nguyễn Hoàng Huynh, Home"
          onClick={(e) => {
            setOpen(false);
            if (pathname === '/') {
              e.preventDefault();
              smoothScrollToTop(850);
              setActiveSection('home');
              try {
                history.pushState(null, '', '/');
              } catch {}
            }
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="hh-logo-svg">
            <path d="M6 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
            <path d="M6 16H16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
            <path d="M16 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
            <path d="M16 16H26" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
            <path d="M26 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
          </svg>
          <span className="hh-brand-name">NGUYỄN HOÀNG HUYNH</span>
        </Link>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="hh-menu-toggle"
          aria-expanded={open}
          aria-controls="hh-navigation"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className={`hh-bar ${open ? 'open' : ''}`} />
          <span className={`hh-bar ${open ? 'open' : ''}`} />
        </button>

        {/* CENTER NAVIGATION WITH DYNAMIC SCROLLSPY */}
        <nav id="hh-navigation" className={`hh-nav-menu ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`hh-nav-link ${active ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS: THEME, LANG & LET'S TALK */}
        <div className="hh-header-right">
          {/* Light / Dark Theme Toggle Switch */}
          <button
            type="button"
            className={`hh-theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label={
              lang === 'vi'
                ? `Chuyển sang giao diện ${theme === 'dark' ? 'sáng' : 'tối'}`
                : `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
            }
            title={
              lang === 'vi'
                ? theme === 'dark' ? 'Bật giao diện Sáng' : 'Bật giao diện Tối'
                : theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
            }
          >
            <span className="hh-theme-toggle-track" aria-hidden="true">
              <span className="hh-theme-toggle-thumb">
                {theme === 'dark' ? (
                  <svg className="hh-theme-icon moon-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg className="hh-theme-icon sun-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </span>
              <span className="hh-theme-slot sun" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                </svg>
              </span>
              <span className="hh-theme-slot moon" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </span>
            </span>
          </button>

          {/* Language Dropdown (VI, EN, ZH) */}
          <LanguageDropdown />

          <Link
            href="/#contact"
            className="hh-btn-lets-talk"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                setActiveSection('contact');
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  try {
                    history.pushState(null, '', '/#contact');
                  } catch {}
                }
              }
            }}
          >
            {t('nav.letsTalk')}
          </Link>
        </div>
      </div>
    </header>
  );
}
