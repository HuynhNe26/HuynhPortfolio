'use client';

import { createContext, useContext, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/language-context';

const FieldErrors = createContext<Record<string, string[]>>({});

export function Field({ label, name, multiline = false, hint, ...props }: {
  label: string;
  name: string;
  multiline?: boolean;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
}) {
  const errors = useContext(FieldErrors)[name];

  return (
    <div className="field">
      <label htmlFor={name}>
        <span className="hh-lang-text">{label}</span>
        {props.required ? ' *' : ''}
      </label>
      {hint && <p className="field-hint">{hint}</p>}
      {multiline ? (
        <textarea id={name} name={name} rows={6} aria-invalid={Boolean(errors)} aria-describedby={errors ? `${name}-error` : undefined} {...props} />
      ) : (
        <input id={name} name={name} aria-invalid={Boolean(errors)} aria-describedby={errors ? `${name}-error` : undefined} {...props} />
      )}

      {errors && (
        <p id={`${name}-error`} className="field-error">
          {errors.join(' ')}
        </p>
      )}
    </div>
  );
}

export const FormField = Field;

export function ApiForm({ endpoint, method = 'POST', children, submitLabel, redirectTo, transform = 'plain' }: {
  endpoint: string;
  method?: string;
  children: ReactNode;
  submitLabel: string;
  redirectTo?: string;
  transform?: 'plain' | 'project' | 'profile';
}) {
  const router = useRouter();
  const { lang } = useLanguage();
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [failed, setFailed] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);

  const waitLabel =
    lang === 'vi' ? 'Đang gửi…' : lang === 'zh' ? '正在发送…' : 'Please wait…';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values: Record<string, unknown> = Object.fromEntries(new FormData(form));

    if (transform === 'project') {
      values.year = Number(values.year);
      values.technologies = String(values.technologies).split(',').map((item) => item.trim()).filter(Boolean);
      values.featured = values.featured === 'on';
      values.published = values.published === 'on';
    }

    if (transform === 'profile') {
      values.skills = String(values.skills).split(',').map((item) => item.trim()).filter(Boolean);
    }

    setPending(true);
    setResult('');
    setErrors({});
    setFailed(false);

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors(data.fields || {});
        throw new Error(
          data.error ||
            (lang === 'vi'
              ? 'Không thể gửi lúc này. Vui lòng thử lại.'
              : lang === 'zh'
              ? '无法提交，请稍后重试。'
              : 'Unable to save. Please try again.')
        );
      }

      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
      } else {
        setResult(
          data.message ||
            (lang === 'vi'
              ? 'Đã gửi thành công! Cảm ơn bạn đã liên hệ.'
              : lang === 'zh'
              ? '发送成功！感谢您的联系。'
              : 'Saved successfully.')
        );

        if (endpoint === '/api/contact') {
          form.reset();
        }
        router.refresh();
      }
    } catch (error) {
      setFailed(true);
      setResult(
        error instanceof Error
          ? error.message
          : lang === 'vi'
          ? 'Không thể kết nối máy chủ. Vui lòng thử lại.'
          : lang === 'zh'
          ? '网络连接失败，请稍后重试。'
          : 'Unable to connect. Please try again.'
      );
    } finally {
      setPending(false);
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }

  return (
    <form onSubmit={submit} className="editor-form">
      <FieldErrors.Provider value={errors}>
        <fieldset disabled={pending}>
          {children}
        </fieldset>
      </FieldErrors.Provider>
      <div ref={feedback} tabIndex={-1} role="status" aria-live="polite" className={result ? `form-feedback ${failed ? 'form-error' : 'form-success'}` : ''}>
        {result}
        {Object.keys(errors).length > 0 && (
          <ul>
            {Object.entries(errors).map(([field, messages]) => (
              <li key={field}>
                <a href={`#${field}`}>
                  {field}: {messages.join(' ')}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="button button-dark form-submit-btn" disabled={pending} type="submit">
        <span className="hh-lang-text">{pending ? waitLabel : submitLabel}</span>
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export function MutationButton({ endpoint, method, label, body, confirmMessage, confirm, redirectTo }: {
  endpoint: string;
  method: string;
  label: string;
  body?: object;
  confirmMessage?: string;
  confirm?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const { lang } = useLanguage();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const waitLabel =
    lang === 'vi' ? 'Đang xử lý…' : lang === 'zh' ? '处理中…' : 'Please wait…';

  async function run() {
    const confirmation = confirm || confirmMessage;
    if (confirmation && !window.confirm(confirmation)) {
      return;
    }

    setPending(true);
    setError('');

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body || {}),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The action failed.');
      }

      if (redirectTo) {
        router.push(redirectTo);
      }

      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button type="button" className="button button-outline" onClick={run} disabled={pending}>
        <span className="hh-lang-text">{pending ? waitLabel : label}</span>
      </button>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>)}
    </div>
  );
}
