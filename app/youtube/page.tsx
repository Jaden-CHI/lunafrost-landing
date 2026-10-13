import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://moonyth.app/youtube" },
  title: "YouTube",
  description: "AI, 앱 개발, 콘텐츠 제작과 출판 프로젝트를 담은 Moonyth의 YouTube 채널 모음",
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
  {
    handle: "@jipilmug",
    url: "https://www.youtube.com/@jipilmug",
    subscribeUrl: "https://www.youtube.com/@jipilmug?sub_confirmation=1",
    description:
      "출판 브랜드 LUNAFROST의 이야기와 작품 세계를 영상으로 전하는 채널. 장편 과학 미스터리 스릴러 《미궁 속 그림자》의 공식 티저와 짧은 서사를 선보입니다.",
    series: [
      { tag: "Book Trailer", title: "작품 공식 티저", description: "《미궁 속 그림자》의 사건과 분위기를 짧고 밀도 높은 영상으로 소개합니다." },
      { tag: "Story Shorts", title: "짧은 서사", description: "소설 속 단서와 질문을 Shorts 형식으로 전하며 작품 세계로 안내합니다." },
    ],
  },
  {
    handle: "@moonyth-lunafrost",
    url: "https://www.youtube.com/@moonyth-lunafrost",
    subscribeUrl: "https://www.youtube.com/@moonyth-lunafrost?sub_confirmation=1",
    description:
      "콘텐츠를 만드는 Moonyth와 콘텐츠를 선보이는 LUNAFROST의 프로젝트 채널. 직접 개발하고 출시한 앱과 웹서비스의 핵심 경험을 영상으로 소개합니다.",
    series: [
      { tag: "App Showcase", title: "출시 앱 쇼케이스", description: "Golf Windy, Fishing Windy, WellDay, Memoham 등 출시 제품의 기능과 사용 장면을 보여줍니다." },
      { tag: "Web Product", title: "웹서비스 이야기", description: "직접 기획하고 구축한 웹서비스와 디지털 제품을 만드는 과정과 결과를 기록합니다." },
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

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-16">

        {/* Page header */}
        <div className="mb-16">
          <p
            className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--tertiary)" }}
          >
            YouTube
          </p>
          <h1
            className="font-[family-name:var(--font-inter)] text-4xl sm:text-5xl font-bold mb-4 break-keep"
            style={{ color: "var(--text)" }}
          >
            영상으로 기록하는 탐구
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            AI와 개발, 콘텐츠 창작과 출판 프로젝트를 채널별 주제에 맞춰 기록합니다.
          </p>
        </div>

        {/* Channels */}
        <div className="space-y-16">
          {channels.map((channel, idx) => (
            <div key={channel.handle}>
              {/* Channel card */}
              <div
                className="p-5 sm:p-10 border mb-6"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                  <div>
                    <h2
                      className="font-[family-name:var(--font-inter)] text-3xl font-bold mb-3"
                      style={{ color: "var(--text)" }}
                    >
                      {channel.handle}
                    </h2>
                    <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--text-muted)" }}>
                      {channel.description}
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-shrink-0">
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 no-underline px-5 py-2.5 border transition-all duration-300"
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
                      className="inline-flex items-center justify-center gap-2 no-underline px-5 py-2.5 transition-all duration-300 rim-light"
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
                          className="font-[family-name:var(--font-inter)] text-lg font-semibold mb-1"
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
                <div className="w-10 h-px opacity-20" style={{ background: "var(--border)" }} />
              )}
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </>
  );
}
