import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube",
  description: "AI 활용법, 앱 개발 과정을 담은 YouTube 콘텐츠",
};

export default function YouTubePage() {
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
            YouTube
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            AI 활용법, 앱 개발 과정을 담은 영상 콘텐츠
          </p>
        </div>

        <div
          className="text-center py-24 border rounded-lg"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p className="text-lg mb-2">YouTube 채널 준비 중</p>
          <p className="text-sm">곧 영상 콘텐츠로 찾아뵙겠습니다.</p>
        </div>
      </main>

      <Footer />
    </>
  );
}
