'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { staggerContainer } from '../ui/motion'

const partnerTags = [
  '어신',
  '더피싱',
  '선상24',
  '낚시해(海)',
  '머털낚시',
  '제일레져',
  '낚시 예약 플랫폼',
  '낚시 쇼핑몰',
]

const itemUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden text-white"
      style={{ background: 'linear-gradient(150deg, #0A2540 0%, #0E4D7B 100%)' }}
    >
      {/* 반투명 원형 장식 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-white"
        style={{ opacity: 0.04 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-40 h-[220px] w-[220px] rounded-full bg-white"
        style={{ opacity: 0.04 }}
      />

      <motion.div
        className="fw-container relative py-28"
        variants={staggerContainer(0.15)}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={itemUp}>
          <SectionBadge label="Partnership Proposal · 제휴 · 협업 제안" tone="gold" />
        </motion.div>

        <motion.h1
          variants={itemUp}
          className="mt-6 text-5xl font-black tracking-[-0.5px] sm:text-6xl lg:text-7xl"
        >
          Fishing{' '}
          <span className="text-gold">Windy</span>
        </motion.h1>

        <motion.p variants={itemUp} className="mt-6 text-xl font-bold leading-relaxed text-white sm:text-2xl">
          출조 전, 날씨부터 조황까지
          <br />
          낚시 <span className="text-gold">'출조 준비 + 날씨 인텔리전스'</span> 플랫폼
        </motion.p>

        <motion.p variants={itemUp} className="mt-4 text-base leading-[1.7] text-sand sm:text-lg">
          전국 낚시 포인트 데이터 · 물때 · 파고 · 입질 지표 · 출조 가능여부
        </motion.p>

        <motion.div variants={itemUp} className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-1 rounded-full bg-gold px-4 py-1.5 text-[13px] font-bold text-navy">
            제안 대상
          </span>
          {partnerTags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
              className="rounded-full border border-white/25 px-4 py-1.5 text-[13px] text-white/90"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.p variants={itemUp} className="mt-14 text-sm text-white/60">
          Lunafrost Inc. · moonyth.contact@gmail.com ·{' '}
          <a
            href="https://moonyth.app"
            target="_blank"
            rel="noreferrer"
            className="text-sky underline-offset-4 hover:underline"
          >
            moonyth.app
          </a>{' '}
          · 2026
        </motion.p>
      </motion.div>

      {/* 스크롤 유도 화살표 */}
      <motion.a
        href="#summary"
        aria-label="다음 섹션으로 스크롤"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  )
}