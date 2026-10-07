'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LiveClock } from '@/components/ui/LiveClock';

const CURRENTLY = '모바일 앱 · 브라우저 확장 프로그램';

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
    <header className="relative min-h-[calc(100svh-5rem)] flex flex-col items-center justify-center overflow-hidden py-20 sm:py-24">
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
      <div className="w-full max-w-3xl mx-auto text-center px-5 sm:px-6 relative z-10">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-8 sm:mb-12">
          <span
            className="font-[family-name:var(--font-mono)] text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.4em] leading-6"
            style={{ color: 'var(--tertiary)' }}
          >
            MOBILE APP · BROWSER EXTENSION · AI
          </span>
        </motion.div>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="font-[family-name:var(--font-inter)] text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[7rem] font-bold leading-[0.95] mb-2 tracking-tight"
          style={{ color: 'var(--primary)' }}
        >
          luna<span style={{ fontWeight: 400, color: 'var(--tertiary)' }}>frost</span>
        </motion.h1>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div
            className="font-[family-name:var(--font-mono)] mt-4 mb-8 sm:mb-12 text-[8px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.5em]"
            style={{ color: 'var(--text-muted)' }}
          >
            37.5665° N · 126.9780° E
          </div>
        </motion.div>

        <motion.p
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="max-w-xl mx-auto text-[16px] sm:text-[18px] leading-[1.75] mb-10 sm:mb-14 break-keep"
          style={{ color: 'var(--text-muted)' }}
        >
          iOS·Android 모바일 앱과 브라우저 확장 프로그램을 만들고,<br className="hidden sm:block" />{' '}
          AI와 생산성 도구의 가능성을 기록하는 Moonyth의 공간입니다.
        </motion.p>

        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-7 sm:gap-10"
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
        className="absolute bottom-5 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-4"
      >
        <span
          className="font-[family-name:var(--font-mono)] uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--text-muted)' }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-6 sm:h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(0,122,255,0.3), transparent)' }}
        />
      </motion.div>
    </header>
  );
}
