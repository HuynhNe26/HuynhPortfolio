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
    <header className={`site-header ${isScrolled ? 'is-scrolled' : 'is-transparent'} ${open ? 'menu-open' : ''}`}>
      <div className="nav-shell">
        <Link className="pro-brand" href="/" aria-label="Nguyễn Hoàng Huynh, Home" onClick={() => setOpen(false)}>
          <div className="pro-brand-avatar" aria-hidden="true">
            <span>NH</span>
          </div>
          <div className="pro-brand-info">
            <span className="pro-brand-name">Nguyễn Hoàng Huynh</span>
            <span className="pro-brand-role">Software Engineer</span>
          </div>
        </Link>

        <div className="pro-status-badge" aria-label="Availability Status">
          <span className="pro-status-dot" />
          <span>{t('nav.status')}</span>
        </div>

        {/* Language Switcher */}
        <div className="lang-switcher" role="group" aria-label="Language Switcher">
          <button
            type="button"
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
            aria-label="Switch to English"
          >
            EN
          </button>
          <span className="lang-divider">/</span>
          <button
            type="button"
            className={`lang-btn ${lang === 'vi' ? 'active' : ''}`}
            onClick={() => setLang('vi')}
            aria-label="Chuyển sang Tiếng Việt"
          >
            VI
          </button>
        </div>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <Link
            href="/projects"
            aria-current={pathname.startsWith('/projects') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {t('nav.projects')}
          </Link>
          <Link
            href="/about"
            aria-current={pathname === '/about' ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {t('nav.about')}
          </Link>
          <Link href="/#stack" onClick={() => setOpen(false)}>
            {t('nav.stack')}
          </Link>
          <Link
            href="/admin"
            aria-current={pathname.startsWith('/admin') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {t('nav.cms')}
          </Link>
          <Link
            className="pro-nav-cta"
            href="/contact"
            aria-current={pathname === '/contact' ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            <span>{t('nav.contact')}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
