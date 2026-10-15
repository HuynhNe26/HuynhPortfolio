import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: {
    default: 'NH HUYNH — Design minded. Engineering driven.',
    template: '%s — NH HUYNH',
  },
  description: 'Thoughtful interfaces. Dependable engineering. Explore the work and thinking of NH HUYNH.',
  openGraph: {
    type: 'website',
    siteName: 'NH HUYNH',
    title: 'NH HUYNH — Developer Portfolio',
    description: 'Thoughtfully designed. Carefully built.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
