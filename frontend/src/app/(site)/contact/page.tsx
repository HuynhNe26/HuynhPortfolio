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
          LET’S MAKE SOMETHING GOOD
        </p>
        <h1>
          A small hello.
          <br />
          A new possibility.
        </h1>
        <p>
          Have a project in mind, a question, or an interesting idea? I’d love to hear it.
        </p>
        <div className="contact-note">
          <span aria-hidden="true">
            ↗
          </span>
          <p>
            Tell me what you’re thinking.
            <br />
            We can figure out the details together.
          </p>
        </div>
      </div>
      <div className="form-panel">
        <h2>
          Start a conversation
        </h2>
        <p className="muted">
          Fields marked * are required.
        </p>
        <ApiForm endpoint="/api/contact" submitLabel="Send message">
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
