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
                Nguyễn Hoàng Huynh
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
            <Link href="/projects">{t('nav.projects')}</Link>
            <Link href="/about">{t('nav.about')}</Link>
            <Link href="/#skills">{t('nav.experience')}</Link>
            <Link href="/contact">{t('nav.contact')}</Link>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">{lang === 'vi' ? 'Kết nối & Trực tiếp' : lang === 'zh' ? '保持联系' : 'Connect & Direct'}</span>
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
            <div className="footer-watermark-ambient-glow" />
            <svg
              viewBox="0 0 1700 160"
              className="footer-watermark-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* 1. Rich Modern Multi-stop Gradient Fill (GPU-cached) */}
                <linearGradient id="footerNameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
                  <stop offset="25%" stopColor="#4F46E5" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.85" />
                  <stop offset="75%" stopColor="#06B6D4" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.85" />
                </linearGradient>

                {/* 2. Base Outline Gradient */}
                <linearGradient id="footerBaseOutlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
                </linearGradient>

                {/* 3. Electric Running Laser Stroke Gradient */}
                <linearGradient id="footerLaserStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                  <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="75%" stopColor="#818CF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
                </linearGradient>

                {/* 4. Secondary Counter-Beam Gradient */}
                <linearGradient id="footerLaserStrokeGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                  <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="65%" stopColor="#EC4899" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Layer 1: Ambient Background Glow Text */}
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="watermark-glow-text"
              >
                NGUYỄN HOÀNG HUYNH
              </text>

              {/* Layer 2: Main Rich Gradient Fill */}
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="watermark-gradient-fill"
              >
                NGUYỄN HOÀNG HUYNH
              </text>

              {/* Layer 3: Base Clean Outline */}
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="watermark-base-outline"
              >
                NGUYỄN HOÀNG HUYNH
              </text>

              {/* Layer 4: Running Light Stroke Beam 1 */}
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="watermark-laser-stroke-1"
              >
                NGUYEN HOANG HUYNH
              </text>

              {/* Layer 5: Running Light Stroke Beam 2 (Counter pulse) */}
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="watermark-laser-stroke-2"
              >
                NGUYEN HOANG HUYNH
              </text>
            </svg>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Nguyễn Hoàng Huynh. {t('footer.rights')}
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
            {t('footer.top')}
          </a>
        </div>
      </div>
    </footer>
  );
}
