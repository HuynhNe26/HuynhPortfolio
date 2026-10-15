import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link className="wordmark" href="/">
          <span className="brand-symbol" aria-hidden="true">&gt;_</span>
          <span>NH HUYNH <span className="brand-dot">// SYSTEMS</span></span>
        </Link>
        <p>
          Engineered for performance, resilience, and visual craftsmanship.
        </p>
      </div>
      <div className="footer-meta">
        <span>
          CORE: NEXT.JS 16 • REACT 19 • NEON POSTGRESQL
        </span>
        <span>
          © {new Date().getFullYear()} NGUYỄN HOÀNG HUYNH
        </span>
        <Link href="/admin">
          Admin Console
        </Link>
        <a href="#main-content">
          Top ↑
        </a>
      </div>
    </footer>
  );
}
