"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "lunafrost Landing",
    category: "WEB · NEXT.JS",
    description:
      "카페24 워드프레스에서 Vercel Next.js로 전환한 개인 브랜드 플랫폼. Notion CMS 연동 및 고성능 ISR 적용.",
    tech: ["Next.js 14", "Tailwind CSS", "Notion API"],
    status: "운영 중",
    statusVariant: "neutral",
    href: "/apps",
  },
  {
    title: "AlwaysPDF Tools",
    category: "APP · CHROME EXTENSION",
    description:
      "PDF 작업을 브라우저에서 바로 처리하는 강력한 확장 프로그램. OCR, 변환, 편집 기능을 한곳에.",
    tech: ["Chrome MV3", "Tesseract.js", "TypeScript"],
    status: "출시 완료",
    statusVariant: "primary",
    href: "/apps",
  },
  {
    title: "AI 콘텐츠 스튜디오",
    category: "TOOL · AI WORKFLOW",
    description:
      "YouTube 쇼츠 및 블로그 자동화 파이프라인. Claude API와 영상 제작 도구를 연동한 지능형 워크플로우.",
    tech: ["Claude API", "Python", "Automation"],
    status: "개발 중",
    statusVariant: "neutral",
    href: "/tools",
  },
];

function StatusBadge({ label, variant }: { label: string; variant: string }) {
  const isPrimary = variant === "primary";
  return (
    <span
      className="px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] tracking-wider uppercase flex-shrink-0"
      style={{
        background: isPrimary ? "rgba(170, 212, 249, 0.15)" : "rgba(49, 53, 60, 0.6)",
        border: `1px solid ${isPrimary ? "rgba(170, 212, 249, 0.3)" : "rgba(66, 71, 77, 0.5)"}`,
        color: isPrimary ? "var(--primary)" : "var(--text-muted)",
      }}
    >
      {label}
    </span>
  );
}

function Card({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full border transition-all duration-500"
      style={{
        padding: "3rem",
        borderColor: "rgba(66, 71, 77, 0.2)",
        background: "rgba(24, 28, 34, 0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Top row */}
      <div className="flex justify-between items-start mb-8 gap-4">
        <div className="space-y-1">
          <span
            className="block font-[family-name:var(--font-mono)] text-[11px] tracking-wider uppercase"
            style={{ color: "rgba(170, 212, 249, 0.7)" }}
          >
            {project.category}
          </span>
          <h3
            className="font-[family-name:var(--font-cormorant)] text-xl"
            style={{ color: "var(--text)" }}
          >
            {project.title}
          </h3>
        </div>
        <StatusBadge label={project.status} variant={project.statusVariant} />
      </div>

      {/* Description */}
      <p
        className="leading-relaxed mb-10 flex-grow"
        style={{ fontSize: "0.9375rem", color: "rgba(194, 199, 206, 0.8)" }}
      >
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2.5 mb-12">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 border"
            style={{
              background: "rgba(49, 53, 60, 0.6)",
              borderColor: "rgba(66, 71, 77, 0.3)",
              color: "var(--text)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        href={project.href}
        className="no-underline w-full inline-flex items-center justify-between px-6 py-4 border transition-all duration-300"
        style={{
          borderColor: "rgba(66, 71, 77, 0.3)",
          color: "var(--text)",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)",
        }}
      >
        <style>{`
          .group:hover .card-cta {
            background: var(--primary) !important;
            color: var(--on-primary) !important;
            border-color: var(--primary) !important;
          }
        `}</style>
        <span className="card-cta" style={{ display: "contents" }}>
          자세히 보기
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </motion.article>
  );
}

export default function PortfolioCards() {
  return (
    <section
      className="py-40 px-5 md:px-16"
      style={{ maxWidth: "1280px", margin: "0 auto" }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="space-y-4">
          <span
            className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase"
            style={{ color: "rgba(170, 212, 249, 0.6)" }}
          >
            PORTFOLIO
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-normal"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3rem)", color: "var(--text)" }}
          >
            만들어온 것들
          </h2>
        </div>
        <Link
          href="/apps"
          className="no-underline flex items-center gap-4 transition-colors duration-300"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}
        >
          모든 프로젝트
          <div
            className="h-px transition-colors duration-300"
            style={{ width: "3rem", background: "var(--outline-variant)" }}
          />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <Card key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
