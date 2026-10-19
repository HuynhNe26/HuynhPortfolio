'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

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
            <span className="footer-col-title">{lang === 'vi' ? 'Điều hướng' : 'Navigation'}</span>
            <Link href="/projects">{t('nav.projects')}</Link>
            <Link href="/about">{t('nav.about')}</Link>
            <Link href="/#skills">{t('nav.experience')}</Link>
            <Link href="/contact">{t('nav.contact')}</Link>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">{lang === 'vi' ? 'Kết nối & Trực tiếp' : 'Connect & Direct'}</span>
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

        {/* MONUMENTAL RUNNING STROKE WATERMARK SIGNATURE */}
        <div className="footer-watermark-row" aria-hidden="true">
          <div className="footer-watermark-wrap">
            <svg
              viewBox="0 0 1440 140"
              className="footer-watermark-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="footerStrokeFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25">
                    <animate attributeName="stop-color" values="#2563EB;#38BDF8;#818CF8;#EC4899;#2563EB" dur="10s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.85">
                    <animate attributeName="stop-color" values="#38BDF8;#818CF8;#EC4899;#2563EB;#38BDF8" dur="10s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="70%" stopColor="#818CF8" stopOpacity="0.95">
                    <animate attributeName="stop-color" values="#818CF8;#EC4899;#2563EB;#38BDF8;#818CF8" dur="10s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.25">
                    <animate attributeName="stop-color" values="#2563EB;#38BDF8;#818CF8;#EC4899;#2563EB" dur="10s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
                <linearGradient id="footerBaseFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0F172A" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0.015" />
                </linearGradient>
              </defs>

              {/* 1. Base Subtle Fill */}
              <text
                x="50%"
                y="68%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="watermark-fill-text"
              >
                NGUYỄN HOÀNG HUYNH
              </text>

              {/* 2. Base Subtle Outline */}
              <text
                x="50%"
                y="68%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="watermark-outline-base"
              >
                NGUYỄN HOÀNG HUYNH
              </text>

              {/* 3. Dynamic Running Light Stroke */}
              <text
                x="50%"
                y="68%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="watermark-running-stroke"
              >
                NGUYỄN HOÀNG HUYNH
              </text>
            </svg>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-meta-pill">
            <span>CORE: NEXT.JS 16 • REACT 19 • NEON POSTGRESQL</span>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Nguyễn Hoàng Huynh. {t('footer.rights')}
          </div>
          <a
            href="#top"
            className="footer-top-link"
            aria-label="Back to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {t('footer.top')}
          </a>
        </div>
      </div>
    </footer>
  );
}
