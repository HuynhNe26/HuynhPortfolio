'use client';

import { createContext, useContext, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

const FieldErrors = createContext<Record<string, string[]>>({});

export function Field({ label, name, multiline = false, ...props }: {
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
}) {
  const errors = useContext(FieldErrors)[name];

  return (
    <div className="field">
      <label htmlFor={name}>
        {label}{props.required ? ' *' : ''}
      </label>
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

export function ApiForm({ endpoint, method = 'POST', children, submitLabel, redirectTo, transform = 'plain' }: {
  endpoint: string;
  method?: string;
  children: ReactNode;
  submitLabel: string;
  redirectTo?: string;
  transform?: 'plain' | 'project' | 'profile';
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [failed, setFailed] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);

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
        throw new Error(data.error || 'Unable to save. Please try again.');
      }

      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
      } else {
        setResult(data.message || 'Saved successfully.');

        if (endpoint === '/api/contact') {
          form.reset();
        }
        router.refresh();
      }
    } catch (error) {
      setFailed(true);
      setResult(error instanceof Error ? error.message : 'Unable to connect. Please try again.');
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
      <button className="button button-dark" disabled={pending} type="submit">
        {pending ? 'Please wait…' : submitLabel}
        <span aria-hidden="true">
          ↗
        </span>
      </button>
    </form>
  );
}

export function MutationButton({ endpoint, method, label, body, confirmMessage, redirectTo }: {
  endpoint: string;
  method: string;
  label: string;
  body?: object;
  confirmMessage?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function run() {
    if (confirmMessage && !window.confirm(confirmMessage)) {
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
        {pending ? 'Please wait…' : label}
      </button>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>)}
    </div>
  );
}
