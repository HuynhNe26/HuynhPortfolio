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
            &gt;_
          </span>
          <span>
            NH HUYNH
            <span className="brand-dot"> // DEV</span>
          </span>
        </Link>

        <div className="nav-system-status" aria-label="System status">
          <span className="status-dot" />
          <span>SYS: ONLINE // SGN REGION</span>
        </div>

        <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <Link href="/projects" aria-current={pathname.startsWith('/projects') ? 'page' : undefined} onClick={() => setOpen(false)}>
            <span>01.</span> Work
          </Link>
          <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined} onClick={() => setOpen(false)}>
            <span>02.</span> About
          </Link>
          <Link className="nav-contact" href="/contact" aria-current={pathname === '/contact' ? 'page' : undefined} onClick={() => setOpen(false)}>
            Initialize Contact
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
