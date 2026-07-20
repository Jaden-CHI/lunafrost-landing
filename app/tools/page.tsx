import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools",
  description: "최신 AI 도구와 서비스를 직접 사용하고 분석한 리뷰",
};

const toolCategories = [
  { title: "코딩 AI", icon: "◈", count: 0 },
  { title: "콘텐츠 생성", icon: "◇", count: 0 },
  { title: "이미지/비디오", icon: "◆", count: 0 },
];

const featuredTools = [
  {
    title: "Image Rescaler",
    description: "AI Studio 스타일의 업스케일 데모를 바로 체험할 수 있는 작업 공간입니다.",
    href: "/tools/image-rescaler",
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

        <div className="mb-8 grid gap-4 md:grid-cols-1">
          {featuredTools.map((tool) => (
            <a
              key={tool.title}
              href={tool.href}
              className="rounded-[24px] border p-6 transition hover:-translate-y-1"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--tertiary)" }}>
                Featured Demo
              </div>
              <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold" style={{ color: "var(--text)" }}>
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.75]" style={{ color: "var(--text-muted)" }}>
                {tool.description}
              </p>
            </a>
          ))}
        </div>

        <div
          className="text-center py-24 border rounded-lg"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p className="text-lg mb-2">곧 업데이트됩니다</p>
          <p className="text-sm">AI 도구 리뷰 콘텐츠를 준비 중입니다.</p>
        </div>
      </main>

      <Footer />
    </>
  );
}
