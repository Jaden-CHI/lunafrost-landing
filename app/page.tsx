import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ScrollVideoSection from "@/components/home/ScrollVideoSection";
import PortfolioCards from "@/components/home/PortfolioCards";

// 영상 URL을 여기서 설정하세요
// 로컬 파일: "/videos/hero.mp4" (public/videos/ 폴더에 넣으면 됩니다)
// 외부 URL: "https://..."
const HERO_VIDEO = "";        // Hero 섹션 배경 영상
const SCROLL_VIDEO = "";      // 스크롤 영상

export default function HomePage() {
  return (
    <>
      {/* Fixed background */}
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          {/* 1. Hero — 전체 화면 영상 배경 */}
          <HeroSection videoSrc={HERO_VIDEO || undefined} />

          {/* 2. Scroll Video — 스크롤 연동 영상 */}
          <ScrollVideoSection videoSrc={SCROLL_VIDEO || undefined} />

          {/* 3. Portfolio Cards */}
          <PortfolioCards />
        </main>

        <Footer />
      </div>
    </>
  );
}
