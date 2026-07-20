import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PortfolioCards from '@/components/home/PortfolioCards';
import AboutSection from '@/components/home/AboutSection';
import LatestArticles from '@/components/home/LatestArticles';
import Newsletter from '@/components/home/Newsletter';
import ImageRescalerSpotlight from '@/components/home/ImageRescalerSpotlight';
import { LensCursor } from '@/components/ui/LensCursor';
import { ScrollAnimations } from '@/components/ScrollAnimations';

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)' }}>
      <Header />
      <main>
        <HeroSection />
        <ImageRescalerSpotlight />
        <LatestArticles />
        <PortfolioCards />
        <AboutSection />
        <Newsletter />
      </main>
      <Footer />
      <LensCursor />
      <ScrollAnimations />
    </div>
  );
}
