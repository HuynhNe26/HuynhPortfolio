'use client';

import React from 'react';
import { ApiForm, Field } from '@/components/forms';
import { useLanguage } from '@/context/language-context';

export default function Contact() {
  const { t, lang } = useLanguage();

  return (
    <main id="main-content" className="container section contact-page">
      <div className="page-intro">
        <p className="eyebrow">{t('contactPage.eyebrow')}</p>
        <h1>
          {lang === 'vi' ? (
            <>
              Cùng nhau xây dựng sản phẩm
              <br />
              chất lượng vượt trội<span className="brand-dot">.</span>
            </>
          ) : (
            <>
              Let’s build something
              <br />
              exceptional together<span className="brand-dot">.</span>
            </>
          )}
        </h1>
        <p>{t('contactPage.desc')}</p>
        <div className="contact-channels-group">
          <a
            href="mailto:nguyenhoanghuynh.vn@gmail.com"
            className="contact-channel-card"
            title={lang === 'vi' ? 'Gửi email trực tiếp' : lang === 'zh' ? '发送邮件' : 'Send direct email'}
          >
            <div className="channel-icon-badge" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div className="channel-info">
              <span className="channel-label">{t('contactPage.directChannel')}</span>
              <span className="channel-val">nguyenhoanghuynh.vn@gmail.com</span>
            </div>
            <div className="channel-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </a>

          <a
            href="tel:+84937569205"
            className="contact-channel-card"
            title={lang === 'vi' ? 'Gọi điện thoại hoặc kết nối Zalo' : lang === 'zh' ? '拨打电话或添加 Zalo' : 'Direct Call or Zalo'}
          >
            <div className="channel-icon-badge" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="channel-info">
              <span className="channel-label">{t('contactPage.phoneDirect')}</span>
              <span className="channel-val">+84 937 569 205</span>
            </div>
            <div className="channel-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      <div className="form-panel">
        <h2>{t('contactPage.formTitle')}</h2>
        <p className="muted">{t('contactPage.formSubtitle')}</p>
        <ApiForm endpoint="/api/contact" submitLabel={t('contactPage.fieldSubmit')}>
          <Field label={t('contactPage.fieldName')} name="name" required minLength={2} maxLength={100} autoComplete="name" />
          <Field label={t('contactPage.fieldEmail')} name="email" type="email" required maxLength={254} autoComplete="email" />
          <Field label={t('contactPage.fieldMsg')} name="message" multiline required minLength={20} maxLength={5000} />
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">
              Leave this field empty
            </label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <p className="privacy-note">
            {lang === 'vi'
              ? 'Họ tên, email và nội dung tin nhắn được bảo mật riêng tư và chỉ dùng để phản hồi liên hệ. Vui lòng không chia sẻ thông tin tài khoản hay mật khẩu nhạy cảm.'
              : 'Your name, email, and message are stored privately and used to respond to your enquiry. Email notifications are delivered through Resend. Please don’t include sensitive information.'}
          </p>
        </ApiForm>
      </div>
    </main>
  );
}
