'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { fadeInUp, staggerContainer, viewportOnce } from '../ui/motion'

const strengths = [
  { icon: '🛡️', title: '정보보안 전문성', desc: '보안 실무 경력 기반의 안전한 데이터 처리' },
  { icon: '⚙️', title: '풀스택 실행력', desc: '기획부터 배포까지 자체 실행' },
  { icon: '🌊', title: '고유 날씨 자산', desc: '포인트별 날씨 · 물때 인텔리전스' },
  { icon: '🚀', title: '빠른 파트너 대응', desc: '의사결정 단계 없이 즉시 실행' },
]

export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="fw-container">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="운영 주체" />
          <h2 className="fw-headline mt-5 text-textdark">
            작지만 빠른, <span className="text-ocean">Lunafrost</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="rounded-2xl bg-navy p-7 sm:p-9"
          >
            <p className="text-2xl font-black text-white">
              Fishing Windy <span className="text-gold">by Lunafrost</span>
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <h3 className="font-bold text-sand">인디 프로덕트 스튜디오</h3>
                <p className="mt-1 text-[15px] leading-[1.7] text-white/80">
                  기획 · 개발 · 운영을 자체적으로 빠르게 실행합니다.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-sand">확장 가능한 'Windy' 모델</h3>
                <p className="mt-1 text-[15px] leading-[1.7] text-white/80">
                  Golf Windy 등으로 확장 중 — 검증된 구조의 재현성.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {strengths.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeInUp}
                className="rounded-2xl border border-bordr bg-white p-6 shadow-[0_2px_12px_rgba(10,37,64,0.05)]"
              >
                <p className="text-2xl" aria-hidden="true">
                  {s.icon}
                </p>
                <h3 className="mt-3 font-black text-textdark">{s.title}</h3>
                <p className="mt-1.5 text-[14px] leading-[1.7] text-textmid">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}