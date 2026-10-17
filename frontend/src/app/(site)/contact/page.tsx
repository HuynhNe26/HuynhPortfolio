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
        <div className="contact-note">
          <span aria-hidden="true" style={{ fontSize: '28px' }}>
            ✉️
          </span>
          <p>
            {t('contactPage.directChannel')}
          </p>
        </div>

        <div className="contact-note" style={{ marginTop: '16px' }}>
          <span aria-hidden="true" style={{ fontSize: '28px' }}>
            📞
          </span>
          <p>
            {t('contactPage.phoneDirect')}
            <br />
            <a href="tel:+84937569205" className="text-link" style={{ fontSize: '16px', fontWeight: 700 }}>
              +84 937 569 205
            </a>
          </p>
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
