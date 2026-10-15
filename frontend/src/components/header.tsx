'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="wordmark" href="/" aria-label="NH Huynh, home" onClick={() => setOpen(false)}>
          <span className="brand-symbol" aria-hidden="true">
            nh.
          </span>
          <span>
            NH HUYNH
            <span className="brand-dot">
              .
            </span>
          </span>
        </Link>
        <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <Link href="/projects" aria-current={pathname.startsWith('/projects') ? 'page' : undefined} onClick={() => setOpen(false)}>
            Work
          </Link>
          <Link href="/#about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link className="nav-contact" href="/contact" aria-current={pathname === '/contact' ? 'page' : undefined} onClick={() => setOpen(false)}>
            Let’s talk
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
