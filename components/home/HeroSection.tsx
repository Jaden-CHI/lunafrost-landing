'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LiveClock } from '@/components/ui/LiveClock';

const CURRENTLY = 'AI 에이전트 시스템 설계';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

function CornerMeta({
  position,
  children,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  children: React.ReactNode;
}) {
  const posClass = {
    'top-left':     'top-8 left-6 md:left-16 items-start text-left',
    'top-right':    'top-8 right-6 md:right-16 items-end text-right',
    'bottom-left':  'bottom-8 left-6 md:left-16 items-start text-left',
    'bottom-right': 'bottom-8 right-6 md:right-16 items-end text-right',
  }[position];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className={`absolute flex flex-col gap-1 hidden lg:flex ${posClass}`}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" style={{ zIndex: -2 }} />
      <div className="absolute inset-0 hero-glow" style={{ zIndex: -1 }} />

      {/* 4-corner meta */}
      <CornerMeta position="top-left">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] uppercase font-semibold" style={{ color: 'var(--tertiary)' }}>
          VOL.05 · 2026
        </div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
          LOG · MOONYTH
        </div>
      </CornerMeta>

      <CornerMeta position="top-right">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--text-muted)' }}>
          SEOUL · KST
        </div>
        <LiveClock />
      </CornerMeta>

      <CornerMeta position="bottom-left">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
          NOW · WRITING
        </div>
        <div className="text-[13px]" style={{ color: 'var(--text)' }}>
          {CURRENTLY}
        </div>
      </CornerMeta>

      <CornerMeta position="bottom-right">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
          ARCHIVE
        </div>
        <div className="text-[13px] text-right" style={{ color: 'var(--text-muted)' }}>
          글 · 도구 · 앱<br />프로젝트
        </div>
      </CornerMeta>

      {/* Center */}
      <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-12">
          <span
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.4em]"
            style={{ color: 'var(--tertiary)' }}
          >
            AI · DEV · APP · CONTENTS
          </span>
        </motion.div>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="font-[family-name:var(--font-inter)] font-bold leading-[0.95] mb-2 tracking-tight"
          style={{ fontSize: 'clamp(4.5rem, 12vw, 7rem)', color: 'var(--primary)' }}
        >
          luna<span style={{ fontWeight: 400, color: 'var(--tertiary)' }}>frost</span>
        </motion.h1>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div
            className="font-[family-name:var(--font-mono)] mt-4 mb-12"
            style={{ fontSize: '9px', letterSpacing: '0.5em', color: 'var(--text-muted)' }}
          >
            37.5665° N · 126.9780° E
          </div>
        </motion.div>

        <motion.p
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="max-w-xl mx-auto leading-[1.7] mb-14"
          style={{ fontSize: '18px', color: 'var(--text-muted)' }}
        >
          AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 공간.<br />
          기술과 창작의 경계를 걷는 Moonyth의 기록입니다.
        </motion.p>

        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-10"
        >
          <Link
            href="/blog"
            className="cta-primary rim-light font-[family-name:var(--font-mono)] uppercase w-full sm:w-auto justify-center"
            style={{ padding: '1rem 2.5rem', fontSize: '11px', letterSpacing: '0.1em' }}
          >
            블로그 보기
          </Link>
          <Link
            href="/about"
            className="cta-secondary font-[family-name:var(--font-mono)] uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
          >
            소개 보기 →
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span
          className="font-[family-name:var(--font-mono)] uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--text-muted)' }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(0,122,255,0.3), transparent)' }}
        />
      </motion.div>
    </header>
  );
}
