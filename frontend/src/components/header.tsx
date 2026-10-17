'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`hh-site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container hh-header-inner">
        {/* HH MONOGRAM LOGO */}
        <Link className="hh-brand-logo" href="/" aria-label="Nguyễn Hoàng Huynh, Home" onClick={() => setOpen(false)}>
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

        {/* CENTER NAVIGATION */}
        <nav id="hh-navigation" className={`hh-nav-menu ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          <Link
            href="/"
            className={`hh-nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="hh-nav-link"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/projects"
            className={`hh-nav-link ${pathname.startsWith('/projects') ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/#skills"
            className="hh-nav-link"
            onClick={() => setOpen(false)}
          >
            Experience
          </Link>
          <Link
            href="/#education"
            className="hh-nav-link"
            onClick={() => setOpen(false)}
          >
            Education
          </Link>
          <Link
            href="/contact"
            className={`hh-nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>

        {/* RIGHT ACTIONS: LANG & LET'S TALK */}
        <div className="hh-header-right">
          {/* Language Switcher */}
          <div className="hh-lang-pill" role="group" aria-label="Language">
            <button
              type="button"
              className={`hh-lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <span className="hh-lang-sep">/</span>
            <button
              type="button"
              className={`hh-lang-btn ${lang === 'vi' ? 'active' : ''}`}
              onClick={() => setLang('vi')}
            >
              VI
            </button>
          </div>

          <Link href="/contact" className="hh-btn-lets-talk">
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
