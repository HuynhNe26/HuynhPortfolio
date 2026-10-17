import Link from 'next/link';
import { ApiForm, Field } from '@/components/forms';

export default function Login() {
  return (
    <main id="main-content" className="hh-login">
      <div className="hh-login-card">
        <Link href="/" className="hh-login-logo" aria-label="Về trang chủ">
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M6 7V25M6 16H16M16 7V25M16 16H26M26 7V25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </Link>
        <h1>Admin Login</h1>
        <p className="hh-login-sub">Đăng nhập để quản lý portfolio của bạn</p>

        <ApiForm endpoint="/api/auth/login" submitLabel="Đăng nhập" redirectTo="/admin">
          <Field name="email" label="Email" type="email" placeholder="admin@example.com" autoComplete="username" required maxLength={254} />
          <Field name="password" label="Mật khẩu" type="password" placeholder="••••••••" autoComplete="current-password" required maxLength={256} />
          <label className="hh-login-remember">
            <input type="checkbox" defaultChecked />
            <span>Ghi nhớ đăng nhập</span>
          </label>
        </ApiForm>
      </div>

      <Link className="hh-login-back" href="/">
        ← Quay lại portfolio
      </Link>
    </main>
  );
}
