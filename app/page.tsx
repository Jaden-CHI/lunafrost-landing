import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ScrollVideoSection from "@/components/home/ScrollVideoSection";
import PortfolioCards from "@/components/home/PortfolioCards";

const HERO_YOUTUBE_ID = "63s2T25_11I";
const SCROLL_YOUTUBE_ID = "tvJ1JHT-63s";

export default function HomePage() {
  return (
    <>
      {/* Fixed background */}
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          {/* 1. Hero — 전체 화면 영상 배경 */}
          <HeroSection youtubeId={HERO_YOUTUBE_ID} />

          {/* 2. Scroll Video — 스크롤 연동 영상 */}
          <ScrollVideoSection youtubeId={SCROLL_YOUTUBE_ID} />

          {/* 3. Portfolio Cards */}
          <PortfolioCards />
        </main>

        <Footer />
      </div>
    </>
  );
}
