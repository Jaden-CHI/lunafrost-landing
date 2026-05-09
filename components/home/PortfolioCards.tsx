"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "lunafrost Landing",
    category: "Web · Next.js",
    description:
      "카페24 워드프레스에서 Vercel Next.js로 전환한 개인 브랜드 플랫폼. Notion CMS 연동, ISR 적용.",
    tech: ["Next.js 16", "Tailwind CSS", "Notion API", "Vercel"],
    status: "운영 중",
    href: "/apps",
    accent: "#c8dff5",
  },
  {
    title: "AlwaysPDF Tools",
    category: "App · Chrome Extension",
    description:
      "PDF 작업을 브라우저에서 바로 처리하는 크롬 확장 프로그램. OCR, 변환, 편집 기능 탑재.",
    tech: ["Chrome MV3", "Tesseract.js", "TypeScript"],
    status: "출시",
    href: "/apps",
    accent: "#8fb8dc",
  },
  {
    title: "AI 콘텐츠 스튜디오",
    category: "Tool · AI Workflow",
    description:
      "YouTube 쇼츠, 블로그 자동화 파이프라인. Claude API + 영상 생성 도구를 연결한 워크플로우.",
    tech: ["Claude API", "Python", "Automation"],
    status: "개발 중",
    href: "/tools",
    accent: "#6ba3cf",
  },
];

function Card({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      <Link href={project.href} className="no-underline group block">
        <div
          className="relative p-8 rounded-2xl border overflow-hidden transition-all duration-500 h-full"
          style={{
            borderColor: "rgba(200,223,245,0.1)",
            background: "var(--surface)",
          }}
        >
          {/* Spotlight on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at 50% 50%, ${project.accent}08, transparent 60%)`,
            }}
          />

          {/* Top row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                {project.category}
              </p>
              <h3
                className="font-[family-name:var(--font-cormorant)] text-2xl font-normal transition-colors duration-300"
                style={{ color: project.accent }}
              >
                {project.title}
              </h3>
            </div>
            <span
              className="text-xs px-3 py-1 rounded-full border flex-shrink-0 ml-4"
              style={{
                borderColor: `${project.accent}40`,
                color: project.accent,
              }}
            >
              {project.status}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(200,223,245,0.05)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div
            className="flex items-center gap-2 text-xs tracking-wider uppercase transition-all duration-300 group-hover:gap-3"
            style={{ color: project.accent }}
          >
            <span>자세히 보기</span>
            <span>→</span>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
            style={{ background: `linear-gradient(90deg, ${project.accent}60, transparent)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioCards() {
  return (
    <section className="py-32 px-6" style={{ background: "var(--dark)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--frost-dim)" }}
          >
            Portfolio
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--text)",
            }}
          >
            만들어온 것들
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Card key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/apps"
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase no-underline transition-all duration-300"
            style={{ color: "var(--text-muted)" }}
          >
            <span>모든 프로젝트</span>
            <div
              className="w-8 h-px transition-all duration-300"
              style={{ background: "var(--frost-dim)" }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
