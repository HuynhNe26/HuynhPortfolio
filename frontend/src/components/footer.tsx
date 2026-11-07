'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { smoothScrollToTop } from '@/lib/smooth-scroll';

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-top-accent-line" aria-hidden="true" />
      <div className="container footer-content">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Link className="footer-brand" href="/">
              <div className="footer-brand-badge">HH</div>
              <span className="footer-brand-name">
                {lang === 'zh' ? '阮黄兄 (Nguyen Hoang Huynh)' : lang === 'en' ? 'Nguyen Hoang Huynh' : 'Nguyễn Hoàng Huynh'}
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
            <span className="footer-col-title">{lang === 'vi' ? 'Điều hướng' : lang === 'zh' ? '快速导航' : 'Navigation'}</span>
            <Link href="/"><span className="hh-lang-text">{t('nav.home')}</span></Link>
            <Link href="/about"><span className="hh-lang-text">{t('nav.about')}</span></Link>
            <Link href="/projects"><span className="hh-lang-text">{t('nav.projects')}</span></Link>
            <Link href="/#education"><span className="hh-lang-text">{t('nav.education')}</span></Link>
            <Link href="/contact"><span className="hh-lang-text">{t('nav.contact')}</span></Link>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">{lang === 'vi' ? 'Kết nối & Trực tiếp' : lang === 'zh' ? '保持联系' : 'Connect & Direct'}</span>
            <a href="tel:+84937569205">
              <span>📞 +84 937 569 205</span>
            </a>
            <a href="mailto:nguyenhoanghuynh.vn@gmail.com">
              <span>Email ↗</span>
            </a>
            <a href="https://github.com/HuynhNe26" target="_blank" rel="noopener noreferrer">
              <span>GitHub ↗</span>
            </a>
            <Link href="/admin">
              <span className="hh-lang-text">{t('footer.admin')}</span>
              <span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()}{' '}
            {lang === 'zh'
              ? '阮黄兄 (Nguyen Hoang Huynh)'
              : lang === 'en'
              ? 'Nguyen Hoang Huynh'
              : 'Nguyễn Hoàng Huynh'}
            . {t('footer.rights')}
          </div>
          <a
            href="#top"
            className="footer-top-link"
            aria-label="Back to top"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollToTop();
              try {
                if (window.location.hash) {
                  history.pushState(null, '', window.location.pathname);
                }
              } catch {}
            }}
          >
            <span className="hh-lang-text">{t('footer.top')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
