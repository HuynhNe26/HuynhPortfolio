import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="error-page">
      <p className="eyebrow">
        404 / A LITTLE OFF THE PATH
      </p>
      <h1>
        Nothing to see here.
      </h1>
      <p>
        This page may have moved or hasn’t been published yet.
      </p>
      <Link className="button button-dark" href="/">
        Back to home ↗
      </Link>
    </main>
  );
}
