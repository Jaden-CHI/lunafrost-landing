import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://moonyth.app/tools" },
  title: "AI Tools",
  description: "Moonyth가 직접 제작하고 운영하는 실용적인 웹 도구",
};

export default function ToolsPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-16">
        <div className="mb-12">
          <h1
            className="font-[family-name:var(--font-inter)] text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: "var(--text)" }}
          >
            AI Tools
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            직접 제작하고 운영하는 실용적인 웹 도구를 소개합니다.
          </p>
        </div>

        <a
          href="/stream-converter"
          className="group block rounded-[24px] border p-6 no-underline transition duration-300 hover:-translate-y-1 sm:p-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div className="mb-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--tertiary)" }}>
            Live Tool · Media Utility
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-inter)] text-2xl font-semibold" style={{ color: "var(--text)" }}>
                Stream Converter
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-[1.75]" style={{ color: "var(--text-muted)" }}>
                미디어 링크를 분석해 오디오와 영상 형식으로 변환하는 셀프 호스팅 도구입니다.
              </p>
            </div>
            <span
              className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "var(--tertiary)" }}
            >
              도구 열기 →
            </span>
          </div>
        </a>
      </main>

      <Footer />
    </>
  );
}
