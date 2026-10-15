import Link from 'next/link';
import { ApiForm, Field } from '@/components/forms';

export default function Login() {
  return (
    <main id="main-content" className="login-page">
      <Link className="wordmark" href="/">
        NH HUYNH.
      </Link>
      <div className="form-panel login-panel">
        <p className="eyebrow">
          A SPACE FOR YOUR WORK
        </p>
        <h1>
          Welcome back.
        </h1>
        <p className="muted">
          Sign in to manage your portfolio.
        </p>
        <ApiForm endpoint="/api/auth/login" submitLabel="Sign in" redirectTo="/admin">
          <Field name="email" label="Email address" type="email" autoComplete="username" required maxLength={254} />
          <Field name="password" label="Password" type="password" autoComplete="current-password" required maxLength={256} />
        </ApiForm>
      </div>
      <Link className="text-link" href="/">
        ← Back to portfolio
      </Link>
    </main>
  );
}
