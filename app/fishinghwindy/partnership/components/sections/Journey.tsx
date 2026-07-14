'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { fadeInUp, viewportOnce } from '../ui/motion'

const steps = [
  {
    no: '①',
    title: '예약 · 출조 신청',
    players: '더피싱 · 선상24 · 어신 · 낚시해',
    highlight: false,
  },
  {
    no: '②',
    title: '출조 준비 · 날씨',
    players: '물때 · 파고 · 입질 · 출조 적합도',
    highlight: true,
  },
  {
    no: '③',
    title: '현장 낚시',
    players: '어신 · 낚시앱 · 조황 커뮤니티',
    highlight: false,
  },
  {
    no: '④',
    title: '구매 · 공유',
    players: '머털낚시 · 제일레져',
    highlight: false,
  },
]

function Arrow({ delay }: { delay: number }) {
  return (
    <motion.svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden="true"
      className="mx-1 hidden shrink-0 self-center text-gold lg:block"
      initial="initial"
      whileInView="animate"
      viewport={viewportOnce}
    >
      <motion.path
        d="M2 12h24m0 0l-7-7m7 7l-7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: {
            pathLength: 1,
            opacity: 1,
            transition: { delay, duration: 0.5, ease: 'easeOut' },
          },
        }}
      />
    </motion.svg>
  )
}

export default function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden bg-navy py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-white"
        style={{ opacity: 0.04 }}
      />
      <div className="fw-container relative">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="핵심 전략" tone="dark" />
          <h2 className="fw-headline mt-5 text-white">
            낚시인의 여정 — 그리고 <span className="text-gold">비어 있는 자리</span>
          </h2>
          <p className="mt-4 leading-[1.7] text-sand">
            예약 · 현장 · 구매는 각자 주인이 있지만, '출조 직전 + 날씨 · 물때' 구간은 비어 있습니다.
          </p>
        </motion.div>

        {/* 여정 플로우 */}
        <div className="mt-14 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
          {steps.map((step, i) => (
            <div key={step.no} className="contents">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.2, duration: 0.5, ease: 'easeOut' }}
                className={
                  step.highlight
                    ? 'relative flex-1 rounded-2xl border-2 border-gold bg-gold/10 p-6 lg:scale-105'
                    : 'flex-1 rounded-2xl border border-white/15 bg-white/5 p-6'
                }
              >
                {step.highlight && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-gold"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <p className={`text-sm font-bold ${step.highlight ? 'text-gold' : 'text-white/60'}`}>
                  {step.no} {step.title}
                </p>
                {step.highlight && (
                  <p className="mt-3 text-lg font-black text-gold">★ Fishing Windy</p>
                )}
                <p className={`mt-3 text-[13px] leading-relaxed ${step.highlight ? 'text-sand' : 'text-white/70'}`}>
                  {step.players}
                </p>
              </motion.div>
              {i < steps.length - 1 && <Arrow delay={0.3 + i * 0.2} />}
            </div>
          ))}
        </div>

        {/* 결론 박스 */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-12 rounded-r-2xl border-l-4 border-teal bg-white/5 p-6 sm:p-7"
        >
          <p className="leading-[1.8] text-white">
            <span className="font-black text-gold">결론:</span> Fishing Windy는 ②번 자리를 점유해 ① · ③ · ④
            파트너 모두에게 <span className="font-bold text-sand">'다음 단계로 넘어가는 다리'</span>가 됩니다 —{' '}
            <span className="font-black">경쟁이 아니라 보완.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}