import type { Metadata } from 'next';
import { ApiForm, Field } from '@/components/forms';

export const metadata: Metadata = {
  title: 'Let’s talk'
};

export default function Contact() {
  return (
    <main id="main-content" className="container section contact-page">
      <div className="page-intro">
        <p className="eyebrow">
          GET IN TOUCH
        </p>
        <h1>
          Let’s build something
          <br />
          exceptional together<span className="brand-dot">.</span>
        </h1>
        <p>
          Have a software project, an internship opportunity, or a technical inquiry in mind? I’m always open to discussing new engineering challenges.
        </p>
        <div className="contact-note">
          <span aria-hidden="true" style={{ fontSize: '28px' }}>
            ✉️
          </span>
          <p>
            Direct communication channel.
            <br />
            Responses typically sent within 24 hours.
          </p>
        </div>

        <div className="contact-note" style={{ marginTop: '16px' }}>
          <span aria-hidden="true" style={{ fontSize: '28px' }}>
            📞
          </span>
          <p>
            Direct Phone &amp; WhatsApp:
            <br />
            <a href="tel:+84937569205" className="text-link" style={{ fontSize: '16px', fontWeight: 700 }}>
              +84 937 569 205
            </a>
          </p>
        </div>
      </div>
      <div className="form-panel">
        <h2>
          Send a Message
        </h2>
        <p className="muted">
          Fill in your details below and I'll get back to you promptly.
        </p>
        <ApiForm endpoint="/api/contact" submitLabel="Send Message →">
          <Field label="Your name" name="name" required minLength={2} maxLength={100} autoComplete="name" />
          <Field label="Email address" name="email" type="email" required maxLength={254} autoComplete="email" />
          <Field label="What do you have in mind?" name="message" multiline required minLength={20} maxLength={5000} />
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">
              Leave this field empty
            </label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <p className="privacy-note">
            Your name, email, and message are stored privately and used to respond to your enquiry. Email notifications are delivered through Resend. Please don’t include sensitive information.
          </p>
        </ApiForm>
      </div>
    </main>
  );
}
