import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import PortfolioCards from "@/components/home/PortfolioCards";
import AboutSection from "@/components/home/AboutSection";

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--dark)" }}>
      <Header />
      <main>
        <HeroSection />
        <PortfolioCards />
        {/* Separator */}
        <div className="flex items-center justify-center border-t" style={{ borderColor: "rgba(66, 71, 77, 0.1)" }}>
          <div
            className="rounded-full -translate-y-1/2"
            style={{ width: "0.5rem", height: "0.5rem", background: "rgba(170, 212, 249, 0.2)" }}
          />
        </div>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
