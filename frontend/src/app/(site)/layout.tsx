import { Footer } from '@/components/footer';
import { FooterRevealWrapper } from '@/components/footer-reveal-wrapper';
import { Header } from '@/components/header';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <FooterRevealWrapper footer={<Footer />}>
      <Header />
      {children}
    </FooterRevealWrapper>
  );
}
