import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube",
  description: "AI 트렌드, 생성형 AI 활용법, 앱 개발 과정을 담은 YouTube 채널 — Moonyth & GenAI1001",
};

const channels = [
  {
    handle: "@Moonyth",
    url: "https://www.youtube.com/@Moonyth",
    subscribeUrl: "https://www.youtube.com/@Moonyth?sub_confirmation=1",
    description:
      "AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 Moonyth의 메인 채널. 기술과 창작의 경계에서 직접 만들고 기록합니다.",
    series: [
      { tag: "AI Tools", title: "AI 도구 리뷰", description: "최신 생성형 AI 도구를 직접 써보고 실무 활용법을 정리합니다." },
      { tag: "Dev Log", title: "앱 개발 과정", description: "아이디어부터 배포까지, 실제 앱을 만드는 전 과정을 기록합니다." },
    ],
  },
  {
    handle: "@genai1001",
    url: "https://www.youtube.com/@genai1001",
    subscribeUrl: "https://www.youtube.com/@genai1001?sub_confirmation=1",
    description:
      "생성형 AI의 최전선을 탐구하는 채널. AI 도구 활용법부터 콘텐츠 자동화 워크플로우까지 깊이 파고듭니다.",
    series: [
      { tag: "Workflow", title: "콘텐츠 자동화", description: "Claude, GPT 등 AI API를 활용해 콘텐츠 제작 파이프라인을 구축하는 방법을 다룹니다." },
      { tag: "Tutorial", title: "GenAI 튜토리얼", description: "생성형 AI 도구를 처음 접하는 분들을 위한 단계별 가이드를 제공합니다." },
    ],
  },
];

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function YouTubePage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 py-16">

        {/* Page header */}
        <div className="mb-16">
          <p
            className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "rgba(170, 212, 249, 0.6)" }}
          >
            YouTube
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] text-5xl font-light italic mb-4"
            style={{ color: "var(--text)" }}
          >
            영상으로 기록하는 탐구
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            AI와 개발, 콘텐츠 창작의 과정을 두 채널에 나눠 담습니다.
          </p>
        </div>

        {/* Channels */}
        <div className="space-y-16">
          {channels.map((channel, idx) => (
            <div key={channel.handle}>
              {/* Channel card */}
              <div
                className="p-10 border mb-6"
                style={{
                  borderColor: "rgba(66, 71, 77, 0.2)",
                  background: "rgba(24, 28, 34, 0.4)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                  <div>
                    <h2
                      className="font-[family-name:var(--font-cormorant)] text-3xl italic mb-3"
                      style={{ color: "var(--text)" }}
                    >
                      {channel.handle}
                    </h2>
                    <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--text-muted)" }}>
                      {channel.description}
                    </p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 no-underline px-5 py-2.5 border transition-all duration-300"
                      style={{
                        borderColor: "rgba(170, 212, 249, 0.3)",
                        color: "var(--primary)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      <YoutubeIcon />
                      채널 보기
                    </a>
                    <a
                      href={channel.subscribeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 no-underline px-5 py-2.5 transition-all duration-300 rim-light"
                      style={{
                        background: "var(--primary-container)",
                        color: "var(--on-primary-container)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      구독하기
                    </a>
                  </div>
                </div>

                {/* Series */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t"
                  style={{ borderColor: "rgba(66, 71, 77, 0.15)" }}
                >
                  {channel.series.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <span
                        className="font-[family-name:var(--font-mono)] text-[10px] tracking-widest uppercase flex-shrink-0 self-start mt-0.5 px-2 py-1 border"
                        style={{
                          borderColor: "rgba(170, 212, 249, 0.2)",
                          color: "rgba(170, 212, 249, 0.6)",
                          background: "rgba(170, 212, 249, 0.05)",
                        }}
                      >
                        {item.tag}
                      </span>
                      <div>
                        <p
                          className="font-[family-name:var(--font-cormorant)] text-lg mb-1"
                          style={{ color: "var(--text)" }}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {idx < channels.length - 1 && (
                <div className="w-10 h-px opacity-20" style={{ background: "var(--frost-dim)" }} />
              )}
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </>
  );
}
