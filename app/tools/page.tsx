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

export default function ToolsPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 py-16">
        <div className="mb-12">
          <h1
            className="font-[family-name:var(--font-cormorant)] text-5xl font-light mb-4"
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
                className="font-[family-name:var(--font-cormorant)] text-xl font-normal mb-1"
                style={{ color: "var(--frost)" }}
              >
                {cat.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {cat.count}개의 도구
              </p>
            </div>
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
