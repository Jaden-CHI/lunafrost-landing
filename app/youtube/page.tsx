import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube",
  description: "AI 트렌드, 생성형 AI 활용법, 앱 개발 과정을 담은 YouTube 채널 — @genai1001",
};

const series = [
  {
    title: "AI 도구 리뷰",
    description: "최신 생성형 AI 도구를 직접 써보고 실무에서 쓸 수 있는 방법을 정리합니다.",
    tag: "AI Tools",
  },
  {
    title: "앱 개발 과정",
    description: "아이디어부터 배포까지, 실제 앱을 만드는 전 과정을 기록합니다.",
    tag: "Dev Log",
  },
  {
    title: "콘텐츠 자동화",
    description: "Claude, GPT 등 AI API를 활용해 콘텐츠 제작 파이프라인을 구축하는 방법을 다룹니다.",
    tag: "Workflow",
  },
];

export default function YouTubePage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 py-16">

        {/* Channel header */}
        <div className="mb-16">
          <p
            className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "rgba(170, 212, 249, 0.6)" }}
          >
            YouTube Channel
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] text-5xl font-light italic mb-6"
            style={{ color: "var(--text)" }}
          >
            @genai1001
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-muted)" }}>
            생성형 AI의 최전선을 탐구합니다. AI 도구 활용법, 앱 개발 과정, 콘텐츠 자동화 워크플로우까지 —
            기술과 창작이 만나는 지점을 직접 만들고 기록합니다.
          </p>
          <a
            href="https://www.youtube.com/@genai1001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 no-underline px-8 py-3 border transition-all duration-300 rim-light"
            style={{
              borderColor: "rgba(170, 212, 249, 0.3)",
              color: "var(--primary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            채널 바로가기
          </a>
        </div>

        {/* Divider */}
        <div className="w-10 h-px mb-16 opacity-30" style={{ background: "var(--frost-dim)" }} />

        {/* Content series */}
        <div className="mb-12">
          <p
            className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] uppercase mb-10"
            style={{ color: "rgba(170, 212, 249, 0.6)" }}
          >
            주요 콘텐츠
          </p>
          <div className="space-y-6">
            {series.map((item) => (
              <div
                key={item.title}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-8 border transition-colors duration-300"
                style={{
                  borderColor: "rgba(66, 71, 77, 0.2)",
                  background: "rgba(24, 28, 34, 0.4)",
                }}
              >
                <span
                  className="font-[family-name:var(--font-mono)] text-[10px] tracking-widest uppercase flex-shrink-0 self-start mt-1 px-2 py-1 border"
                  style={{
                    borderColor: "rgba(170, 212, 249, 0.2)",
                    color: "rgba(170, 212, 249, 0.6)",
                    background: "rgba(170, 212, 249, 0.05)",
                  }}
                >
                  {item.tag}
                </span>
                <div>
                  <h3
                    className="font-[family-name:var(--font-cormorant)] text-xl mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-16 p-10 border text-center"
          style={{
            borderColor: "rgba(66, 71, 77, 0.2)",
            background: "rgba(24, 28, 34, 0.4)",
          }}
        >
          <p
            className="font-[family-name:var(--font-cormorant)] text-2xl italic mb-3"
            style={{ color: "var(--text)" }}
          >
            구독하고 최신 영상을 받아보세요
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            새 영상이 올라올 때마다 알림을 받으려면 구독과 벨을 눌러주세요.
          </p>
          <a
            href="https://www.youtube.com/@genai1001?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 no-underline px-10 py-4 transition-all duration-300"
            style={{
              background: "var(--primary-container)",
              color: "var(--on-primary-container)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            구독하기
          </a>
        </div>

      </main>

      <Footer />
    </>
  );
}
