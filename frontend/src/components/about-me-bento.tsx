'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TechIcon } from '@/components/tech-icon';
import { useLanguage } from '@/context/language-context';

interface AboutMeProps {
  email?: string;
}

const SKILLS_LIST = [
  { name: 'React', cat: 'Frontend' },
  { name: 'Next.js', cat: 'Frontend' },
  { name: 'Node.js', cat: 'Backend' },
  { name: 'TypeScript', cat: 'Frontend' },
  { name: 'PostgreSQL', cat: 'Database' },
  { name: 'MongoDB', cat: 'Database' },
  { name: 'Redis', cat: 'Database' },
  { name: 'Tailwind CSS', cat: 'Frontend' },
  { name: 'MoMo API', cat: 'Tools & APIs' },
  { name: 'Resend', cat: 'Tools & APIs' },
  { name: 'Cloudinary', cat: 'Tools & APIs' },
  { name: 'Gemini API', cat: 'Tools & APIs' },
  { name: 'LangChain', cat: 'Tools & APIs' },
  { name: 'WebSocket', cat: 'Backend' },
  { name: 'Git', cat: 'Tools & APIs' },
  { name: 'Docker', cat: 'Tools & APIs' },
];

/**
 * 1. ABOUT ME HERO SECTION
 * Placed directly above Featured Projects
 */
export function AboutMeSection({ email = 'nguyenhoanghuynh.vn@gmail.com' }: AboutMeProps) {
  const { t } = useLanguage();

  return (
    <section id="about" data-section="about" className="hh-about-section">
      <div className="container">
        {/* ABOUT ME HERO CARD + PHOTO WITH FLOATING BADGES */}
        <div className="hh-bento-card hh-about-card">
          <div className="hh-about-left">
            <div className="hh-eyebrow-pill">
              <span className="hh-avatar-icon">👤</span>
              <span>{t('bento.about.eyebrow')}</span>
            </div>

            <h2 className="hh-about-heading">
              {t('bento.about.heading1')}
              <br />
              {t('bento.about.heading2')}
            </h2>

            <p className="hh-about-text">
              {t('bento.about.bio')}
            </p>

            <ul className="hh-about-info-list">
              <li>
                <span className="info-icon" aria-hidden="true">🎂</span>
                <span>26/08/2005</span>
              </li>
              <li>
                <span className="info-icon" aria-hidden="true">📍</span>
                <span>Đồng Nai, Việt Nam</span>
              </li>
              <li>
                <span className="info-icon" aria-hidden="true">📞</span>
                <a href="tel:+84937569205">+84 937 569 205</a>
              </li>
              <li>
                <span className="info-icon" aria-hidden="true">✉️</span>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>

            <div className="hh-about-actions">
              <a
                href={`mailto:${email}?subject=Request CV - Nguyễn Hoàng Huynh`}
                className="hh-btn-download-cv"
              >
                <span>{t('bento.about.downloadCv')}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hh-about-right">
            <div className="hh-about-photo-wrapper">
              <Image
                src="/avatar.jpg"
                alt="Nguyễn Hoàng Huynh"
                width={480}
                height={520}
                className="hh-about-photo"
              />

              {/* FLOATING BADGE 1: 3rd year IT Student */}
              <div className="hh-floating-badge badge-top-right">
                <span className="badge-icon">🎓</span>
                <div className="badge-text">
                  <strong>{t('bento.badge.student')}</strong>
                  <span>{t('bento.badge.studentSub')}</span>
                </div>
              </div>

              {/* FLOATING BADGE 2: Passionate about Web Development */}
              <div className="hh-floating-badge badge-bottom-right">
                <span className="badge-heart-icon">💖</span>
                <div className="badge-text">
                  <span>{t('bento.badge.passionate')}</span>
                  <strong>{t('bento.badge.passionateSub')}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. SKILLS, EDUCATION & CONTACT BENTO
 * Placed below Featured Projects
 */
export function SkillsEducationContact({ email = 'nguyenhoanghuynh.vn@gmail.com' }: AboutMeProps) {
  const { t } = useLanguage();
  const [activeSkillCat, setActiveSkillCat] = useState('All');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formPending, setFormPending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const skillTabs = [
    { id: 'All', label: t('bento.skills.all') },
    { id: 'Frontend', label: t('bento.skills.frontend') },
    { id: 'Backend', label: t('bento.skills.backend') },
    { id: 'Database', label: t('bento.skills.database') },
    { id: 'Tools & APIs', label: t('bento.skills.tools') },
  ];

  const filteredSkills = SKILLS_LIST.filter((s) => {
    if (activeSkillCat === 'All') return true;
    return s.cat === activeSkillCat;
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormPending(true);
    setFormError('');
    setFormSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMessage,
        }),
      });

      if (!res.ok) {
        throw new Error('Không thể gửi tin nhắn. Vui lòng thử lại sau.');
      }

      setFormSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    } catch (err: any) {
      setFormError(err.message || 'Lỗi gửi tin nhắn.');
    } finally {
      setFormPending(false);
    }
  };

  return (
    <section className="hh-bento-section">
      <div className="container hh-bento-grid-container">
        {/* ROW 1: MY SKILLS TECH MATRIX (DARK BENTO TILE) */}
        <div id="skills" data-section="skills" className="hh-bento-card hh-skills-card">
          <span id="experience" className="sr-only" aria-hidden="true" />
          <div className="hh-skills-header">
            <div>
              <h3 className="hh-skills-title">{t('bento.skills.title')}</h3>
              <p className="hh-skills-subtitle">{t('bento.skills.subtitle')}</p>
            </div>

            <div className="hh-skills-filter-tabs" role="tablist">
              {skillTabs.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`hh-skill-tab ${activeSkillCat === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveSkillCat(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hh-skills-icons-grid">
            {filteredSkills.map((s) => (
              <div key={s.name} className="hh-skill-icon-tile">
                <div className="skill-icon-box">
                  <TechIcon name={s.name} className="skill-svg-icon" />
                </div>
                <span className="skill-tile-name">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: EDUCATION & CERTIFICATES */}
        <div id="education" className="hh-bento-subgrid-2">
          {/* EDUCATION CARD */}
          <div className="hh-bento-card hh-edu-card">
            <div className="hh-card-top-row">
              <h3>{t('bento.edu.title')}</h3>
              <Link href="/about" className="hh-link-more">
                {t('bento.more')}
              </Link>
            </div>

            <div className="hh-edu-item">
              <div className="hh-edu-logo" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div className="hh-edu-details">
                <h4>{t('bento.edu.school')}</h4>
                <p className="edu-major">{t('bento.edu.major')}</p>
                <div className="edu-meta">
                  <span>{t('bento.edu.period')}</span>
                  <span className="meta-dot">•</span>
                  <span className="gpa-highlight">{t('bento.edu.gpa')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CERTIFICATES CARD */}
          <div className="hh-bento-card hh-cert-card">
            <div className="hh-card-top-row">
              <h3>{t('bento.cert.title')}</h3>
              <Link href="/about" className="hh-link-more">
                {t('bento.more')}
              </Link>
            </div>

            <div className="hh-edu-item">
              <div className="hh-cert-badge-logo" aria-hidden="true">
                <span className="ets-logo-txt">ETS</span>
              </div>
              <div className="hh-edu-details">
                <h4>{t('bento.cert.name')}</h4>
                <p className="edu-major">{t('bento.cert.issuer')}</p>
                <div className="edu-meta">
                  <span>{t('bento.cert.date')}</span>
                  <span className="meta-dot">•</span>
                  <span className="score-highlight">{t('bento.cert.score')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: GET IN TOUCH CONTACT CARD */}
        <div id="contact" className="hh-bento-card hh-contact-card">
          <div className="hh-contact-intro">
            <div className="hh-eyebrow-pill">
              <span>{t('bento.contact.eyebrow')}</span>
            </div>
            <h3 className="hh-contact-title">{t('bento.contact.title')}</h3>
            <p className="hh-contact-desc">
              {t('bento.contact.desc')}
            </p>
          </div>

          <form onSubmit={handleSendMessage} className="hh-contact-form">
            {formSuccess && (
              <div className="hh-form-alert success">
                {t('bento.contact.success')}
              </div>
            )}
            {formError && (
              <div className="hh-form-alert error">
                ⚠️ {formError}
              </div>
            )}

            <div className="hh-form-field">
              <input
                type="text"
                placeholder={t('bento.contact.namePlaceholder')}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>

            <div className="hh-form-field">
              <input
                type="email"
                placeholder={t('bento.contact.emailPlaceholder')}
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
              />
            </div>

            <div className="hh-form-field">
              <textarea
                rows={4}
                placeholder={t('bento.contact.msgPlaceholder')}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="hh-btn-send-message" disabled={formPending}>
              <span>{formPending ? t('bento.contact.sending') : t('bento.contact.sendBtn')}</span>
              <span className="send-icon" aria-hidden="true">🚀</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/**
 * Backwards compatibility export
 */
export function AboutMeBento({ email }: AboutMeProps) {
  return (
    <>
      <AboutMeSection email={email} />
      <SkillsEducationContact email={email} />
    </>
  );
}
