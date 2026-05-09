"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Technical grid background */}
      <div className="absolute inset-0 technical-grid" style={{ zIndex: -2 }} />
      {/* Radial glow */}
      <div className="absolute inset-0 hero-glow" style={{ zIndex: -1 }} />

      <div className="max-w-4xl mx-auto text-center px-5">
        {/* Label */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <span
            className="font-[family-name:var(--font-mono)] text-xs tracking-[0.4em] uppercase"
            style={{ color: "rgba(170, 212, 249, 0.6)" }}
          >
            AI · DEV · APP · CONTENTS
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-cormorant)] leading-none mb-8"
          style={{
            fontSize: "clamp(4.5rem, 12vw, 7.5rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            fontStyle: "italic",
          }}
        >
          luna<span style={{ color: "var(--primary)" }}>frost</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-12"
          style={{
            width: "4rem",
            height: "1px",
            background: "rgba(66, 71, 77, 0.4)",
          }}
        />

        {/* Description */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-xl mx-auto leading-relaxed mb-16"
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.7",
            color: "var(--text-muted)",
          }}
        >
          AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 공간.
          <br />
          기술과 창작의 경계를 걷는 Moonyth의 기록입니다.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/blog"
            className="w-full sm:w-auto no-underline px-10 py-4 transition-all duration-300 rim-light"
            style={{
              background: "var(--primary-container)",
              color: "var(--on-primary-container)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}
          >
            블로그 보기
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto no-underline px-10 py-4 border transition-all duration-300"
            style={{
              borderColor: "var(--outline-variant)",
              color: "var(--text)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}
          >
            ABOUT
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span
          className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(194, 199, 206, 0.4)" }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, rgba(170, 212, 249, 0.4), transparent)",
          }}
        />
      </motion.div>
    </header>
  );
}
