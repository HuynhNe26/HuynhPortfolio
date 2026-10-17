import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Nguyễn Hoàng Huynh — Full-Stack Web Developer',
    template: '%s — Nguyễn Hoàng Huynh',
  },
  description:
    'Personal developer portfolio of Nguyễn Hoàng Huynh, Information Technology student at Vietnam Aviation Academy. Showcasing AI Agentic RAG systems, full-stack applications, and engineering case studies.',
  authors: [{ name: 'Nguyễn Hoàng Huynh' }],
  openGraph: {
    type: 'website',
    siteName: 'Nguyễn Hoàng Huynh Portfolio',
    title: 'Nguyễn Hoàng Huynh — Full-Stack Web Developer',
    description: 'Building thoughtful digital experiences through design, code, and curiosity.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nguyễn Hoàng Huynh — Full-Stack Web Developer',
    description: 'Building thoughtful digital experiences through design, code, and curiosity.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body id="top">
        <LanguageProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
