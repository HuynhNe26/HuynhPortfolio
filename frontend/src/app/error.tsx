'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }: { error: Error; reset: () => void; }) {
  return (
    <main id="main-content" className="error-page">
      <p className="eyebrow">
        A TEMPORARY INTERRUPTION
      </p>
      <h2>
        This content is taking a break.
      </h2>
      <p>
        Please try again in a moment.
      </p>
      <button className="button button-dark" onClick={reset}>
        Try again
      </button>
      <Link className="button button-outline" href="/">
        Return home
      </Link>
    </main>
  );
}
