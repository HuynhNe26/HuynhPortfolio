'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Link className="footer-brand" href="/">
              <div className="footer-brand-badge">NH</div>
              <span className="footer-brand-name">
                Nguyễn Hoàng Huynh <span className="brand-dot">// SYSTEMS</span>
              </span>
            </Link>
            <p className="footer-tagline">
              {t('footer.tagline')}
            </p>
            <div className="footer-status-pill">
              <span className="pro-status-dot" />
              <span>{t('footer.available')}</span>
            </div>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Navigation</span>
            <Link href="/projects">{t('nav.projects')}</Link>
            <Link href="/about">{t('nav.about')}</Link>
            <Link href="/#stack">{t('nav.stack')}</Link>
            <Link href="/contact">{t('nav.contact')}</Link>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Connect &amp; Direct</span>
            <a href="tel:+84937569205">
              📞 +84 937 569 205
            </a>
            <a href="mailto:nguyenhoanghuynh.vn@gmail.com">
              Email ↗
            </a>
            <a href="https://github.com/HuynhNe26" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <Link href="/admin">
              {t('footer.admin')} ↗
            </Link>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-meta-pill">
            <span>CORE: NEXT.JS 16 • REACT 19 • NEON POSTGRESQL</span>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Nguyễn Hoàng Huynh. {t('footer.rights')}
          </div>
          <a href="#top" className="footer-top-link" aria-label="Back to top">
            {t('footer.top')}
          </a>
        </div>
      </div>
    </footer>
  );
}
