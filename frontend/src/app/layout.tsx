import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from '@/context/theme-context';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('huynh_portfolio_theme');
                  var theme = (stored === 'dark' || stored === 'light')
                    ? stored
                    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body id="top">
        <ThemeProvider>
          <LanguageProvider>
            <a className="skip-link" href="#main-content">
              Skip to content
            </a>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
