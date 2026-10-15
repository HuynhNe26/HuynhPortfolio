import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link className="wordmark" href="/">
          NH HUYNH.
        </Link>
        <p>
          Designed with intention. Built with care.
        </p>
      </div>
      <div className="footer-meta">
        <span>
          © {new Date().getFullYear()} NH HUYNH
        </span>
        <Link href="/admin">
          Admin
        </Link>
        <a href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
