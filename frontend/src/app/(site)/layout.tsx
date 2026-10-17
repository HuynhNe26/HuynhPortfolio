import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-layout-root">
      <Header />
      <div className="site-content-layer">
        {children}
      </div>
      <Footer />
    </div>
  );
}
