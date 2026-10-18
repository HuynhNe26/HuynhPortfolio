'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/language-context';

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <header className={`hh-site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container hh-header-inner">
        {/* HH MONOGRAM LOGO */}
        <Link
          className="hh-brand-logo"
          href="/"
          aria-label="Nguyễn Hoàng Huynh, Home"
          onClick={(e) => {
            setOpen(false);
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
              try {
                history.pushState(null, '', '/');
              } catch {}
            }
          }}
        >
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="hh-logo-svg">
            <path d="M6 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
            <path d="M6 16H16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
            <path d="M16 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
            <path d="M16 16H26" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
            <path d="M26 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
          </svg>
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

        {/* RIGHT ACTIONS: LANG & LET'S TALK */}
        <div className="hh-header-right">
          {/* Language Toggle Switch (1 click to toggle) */}
          <button
            type="button"
            className={`hh-lang-toggle ${lang}`}
            onClick={toggleLang}
            aria-label={`Đổi ngôn ngữ (Hiện tại: ${lang === 'vi' ? 'Tiếng Việt' : 'English'})`}
            title={lang === 'vi' ? 'Bấm để chuyển sang English' : 'Click to switch to Tiếng Việt'}
          >
            <span className="hh-lang-toggle-thumb" aria-hidden="true" />
            <span className={`hh-lang-toggle-label ${lang === 'en' ? 'active' : ''}`}>EN</span>
            <span className={`hh-lang-toggle-label ${lang === 'vi' ? 'active' : ''}`}>VI</span>
          </button>

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
