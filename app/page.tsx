import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const cards = [
  {
    icon: "◈",
    title: "AI 트렌드",
    description:
      "최신 AI 도구와 서비스를 직접 사용하고 분석한 실용적인 인사이트를 공유합니다.",
    href: "/tools",
  },
  {
    icon: "◇",
    title: "앱 개발",
    description:
      "비개발자의 시선으로 AI를 활용해 실제 서비스를 만들어가는 과정을 기록합니다.",
    href: "/apps",
  },
  {
    icon: "◆",
    title: "콘텐츠 제작",
    description:
      "YouTube 쇼츠, 블로그, 자동화 파이프라인으로 콘텐츠를 만드는 방법을 탐구합니다.",
    href: "/youtube",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(60,100,160,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 80% 80%, rgba(30,60,110,0.15) 0%, transparent 60%),
            var(--dark)
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(200,223,245,0.03) 1px, transparent 1px),
              linear-gradient(45deg, rgba(200,223,245,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Header />

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-8 py-24">
        <p
          className="text-xs tracking-[0.25em] uppercase mb-8 opacity-80 animate-fade-up"
          style={{ color: "var(--frost-dim)", animationDelay: "0.1s" }}
        >
          AI · Dev · App · Contents
        </p>

        <h1
          className="font-[family-name:var(--font-cormorant)] font-light leading-none mb-2 animate-fade-up"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            color: "var(--text)",
            animationDelay: "0.2s",
          }}
        >
          luna<em style={{ fontStyle: "italic", color: "var(--frost)" }}>frost</em>
        </h1>

        <div
          className="w-10 h-px mx-auto my-8 opacity-40 animate-fade-up"
          style={{ background: "var(--frost-dim)", animationDelay: "0.45s" }}
        />

        <p
          className="max-w-lg mx-auto mb-12 text-base leading-relaxed animate-fade-up"
          style={{ color: "var(--text-muted)", animationDelay: "0.35s" }}
        >
          AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 공간.
          <br />
          기술과 창작의 경계를 걷는 Moonyth의 기록입니다.
        </p>

        <div
          className="flex gap-3 flex-wrap justify-center animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          {["AI Tools", "App Development", "Content Strategy", "YouTube"].map(
            (tag) => (
              <span
                key={tag}
                className="text-xs tracking-[0.1em] uppercase px-4 py-1.5 rounded-full border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  background: "rgba(200,223,245,0.04)",
                }}
              >
                {tag}
              </span>
            )
          )}
        </div>
      </main>

      {/* Feature cards */}
      <div
        className="relative z-10 grid border-t border-b"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1px",
          background: "var(--border)",
          borderColor: "var(--border)",
        }}
      >
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="feature-card no-underline"
          >
            <div className="px-8 py-10 h-full">
              <div className="text-2xl mb-4 opacity-70">{card.icon}</div>
              <h3
                className="font-[family-name:var(--font-cormorant)] text-xl font-normal mb-2"
                style={{ color: "var(--frost)" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
}
