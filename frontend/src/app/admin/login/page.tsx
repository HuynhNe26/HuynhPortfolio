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
          <Field name="email" label="Email" type="email" placeholder="admin@example.com" defaultValue="admin@nhhuynh.dev" autoComplete="username" required maxLength={254} />
          <Field name="password" label="Mật khẩu" type="password" placeholder="••••••••" defaultValue="admin123" autoComplete="current-password" required maxLength={256} />
          <label className="hh-login-remember">
            <input type="checkbox" defaultChecked />
            <span>Ghi nhớ đăng nhập</span>
          </label>
        </ApiForm>

        <div style={{ marginTop: '16px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(241, 245, 249, 0.85)', border: '1px solid #E2E8F0', fontSize: '12.5px', color: '#475569', textAlign: 'center', lineHeight: '1.5' }}>
          <span>Tài khoản phát triển: </span>
          <strong style={{ color: '#0F172A' }}>admin@nhhuynh.dev</strong>
          <span style={{ margin: '0 6px', color: '#CBD5E1' }}>|</span>
          <span>Mật khẩu: </span>
          <strong style={{ color: '#0F172A' }}>admin123</strong>
        </div>
      </div>

      <Link className="hh-login-back" href="/">
        ← Quay lại portfolio
      </Link>
    </main>
  );
}
