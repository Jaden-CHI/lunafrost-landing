import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
                <h3
                  className="font-[family-name:var(--font-inter)] text-2xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {project.title}
                </h3>
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

              {project.link && (
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
