import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools",
  description: "최신 AI 도구와 서비스를 직접 사용하고 분석한 리뷰",
};

const toolCategories = [
  { title: "코딩 AI", icon: "◈", count: 0 },
  { title: "콘텐츠 생성", icon: "◇", count: 1 },
  { title: "이미지/비디오", icon: "◆", count: 0 },
];

const tools = [
  {
    title: "AI 콘텐츠 스튜디오",
    description:
      "AI로 쇼츠 영상(스크립트·음성·이미지·동영상)을 자동 생성하는 도구",
    category: "콘텐츠 생성",
    icon: "▶",
    href: "https://ai-content-studio-rho.vercel.app",
  },
];

export default function ToolsPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 py-16">
        <div className="mb-12">
          <h1
            className="font-[family-name:var(--font-inter)] text-5xl font-bold mb-4"
            style={{ color: "var(--text)" }}
          >
            AI Tools
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            최신 AI 도구와 서비스를 직접 사용하고 분석한 실용적인 리뷰
          </p>
        </div>

        {/* Category overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {toolCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-6 rounded-lg border"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="text-2xl mb-3 opacity-70">{cat.icon}</div>
              <h3
                className="font-[family-name:var(--font-inter)] text-xl font-bold mb-1"
                style={{ color: "var(--tertiary)" }}
              >
                {cat.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {cat.count}개의 도구
              </p>
            </div>
          ))}
        </div>

        {/* Tool cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.title}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pf-card p-6 flex flex-col gap-4 no-underline group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl opacity-80">{tool.icon}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "rgba(0,122,255,0.15)",
                    color: "var(--tertiary)",
                  }}
                >
                  {tool.category}
                </span>
              </div>

              <h3
                className="font-[family-name:var(--font-inter)] text-lg font-bold transition-colors duration-200 group-hover:text-[var(--tertiary)]"
                style={{ color: "var(--text)" }}
              >
                {tool.title}
              </h3>

              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "var(--text-muted)" }}
              >
                {tool.description}
              </p>

              <div
                className="text-xs flex items-center gap-1 mt-auto"
                style={{ color: "var(--tertiary)" }}
              >
                바로가기 →
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
