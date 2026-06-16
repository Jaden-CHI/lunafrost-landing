import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps & Projects",
  description: "AI를 활용해 만든 앱과 프로젝트 쇼케이스",
};

const projects = [
  {
    title: "lunafrost Landing",
    description: "AI 기반 개인 브랜드 플랫폼. Next.js + Tailwind + Vercel로 구축.",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "Notion API"],
    status: "운영 중",
    link: "https://moonyth.app",
    icon: "/lunafrost-icon-64.png",
  },
  {
    title: "AlwaysPDF Tools",
    description: "PDF 작업을 브라우저에서 바로 처리하는 크롬 확장 프로그램. OCR, 변환, 편집 등 12가지 기능 탑재.",
    tech: ["Chrome MV3", "Tesseract.js", "TypeScript"],
    status: "출시 완료",
    link: "",
  },
  {
    title: "TaskSnap",
    description: "Todoist의 단순함과 ClickUp의 파워를 결합한 스마트 태스크 매니저. 브라우저 안에서 바로 사용하는 생산성 도구.",
    tech: ["Chrome MV3", "TypeScript"],
    status: "출시 완료",
    link: "https://chromewebstore.google.com/detail/TaskSnap/ipdbelmbiebiejclgnpnphbcbmhijogn",
    icon: "/tasksnap-icon-64.png",
  },
  {
    title: "WellDay",
    description: "일일 수분 섭취량 관리와 약 복용 알림을 한 곳에서 관리하는 건강 관리 앱. iOS와 Android 모두에서 간편한 인터페이스로 매일의 건강 습관을 형성하도록 지원합니다.",
    tech: ["React Native", "Expo", "TypeScript"],
    status: "iOS/Android 출시",
    links: [
      { name: "App Store", url: "https://apps.apple.com/kr/app/wellday/id6748712466" },
      { name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.moonyth.DailyCareApp" }
    ],
    icon: "/wellday-icon-64.png",
  },
  {
    title: "Golf Windy",
    description: "골프 라운드 일정과 날씨, 바람 정보를 한눈에 확인하는 iOS 앱. 라운드 당일 조건 확인과 근처 식당 추천을 함께 제공합니다.",
    tech: ["Flutter", "Firebase", "Kakao Map API"],
    status: "App Store 출시",
    link: "https://apps.apple.com/kr/app/golf-windy/id6776418580",
    icon: "/golfwindy-icon-64.png",
  },
  {
    title: "Fishing Windy",
    description: "낚시 포인트별 날씨, 조류, 파도 정보를 실시간으로 제공하는 낚시 가이드 앱. 출조 일정 관리, 조황 기록, SOS 안전 기능까지 한 곳에서 제공합니다.",
    tech: ["Flutter", "Firebase", "Weather API"],
    status: "출시 예정",
    icon: "/fishinghwindy-logo-thumb.png",
  },
];

export default function AppsPage() {
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
            Apps & Projects
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            AI를 활용해 직접 만들어가는 앱과 서비스들
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="p-8 rounded-lg border"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {project.icon ? (
                    <Image
                      src={project.icon}
                      alt={`${project.title} icon`}
                      width={48}
                      height={48}
                      className="rounded-xl border"
                      style={{ borderColor: "var(--border)" }}
                    />
                  ) : null}
                  <h3
                    className="font-[family-name:var(--font-inter)] text-2xl font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    {project.title}
                  </h3>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded border"
                  style={{ borderColor: "rgba(0,122,255,0.2)", color: "var(--tertiary)" }}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.links ? (
                <div className="flex gap-4 flex-wrap">
                  {project.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm no-underline transition-colors duration-200"
                      style={{ color: "var(--tertiary)" }}
                    >
                      {link.name} →
                    </a>
                  ))}
                </div>
              ) : project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm no-underline transition-colors duration-200"
                  style={{ color: "var(--tertiary)" }}
                >
                  방문하기 →
                </a>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
