import { Footer } from '@/components/footer';
import { FooterRevealWrapper } from '@/components/footer-reveal-wrapper';
import { Header } from '@/components/header';
import { ScrollRevealProvider } from '@/components/scroll-reveal-provider';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <FooterRevealWrapper footer={<Footer />}>
      <ScrollRevealProvider />
      <Header />
      {children}
    </FooterRevealWrapper>
  );
}
