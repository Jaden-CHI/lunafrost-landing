'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { fadeInUp, staggerContainer, viewportOnce } from '../ui/motion'

const models = [
  { icon: '🔗', title: '데이터 · API 제휴', desc: '날씨 · 물때 · 출조 적합도 데이터를 API로 제공' },
  { icon: '💰', title: '송객 수수료', desc: '예약 · 구매 전환 기준 CPA 정산' },
  { icon: '🏷️', title: '화이트라벨 위젯', desc: '파트너 브랜드로 임베드하는 날씨 위젯' },
  { icon: '🛍️', title: '제휴 커머스', desc: '체크리스트 · 추천 연동 수익쉐어' },
  { icon: '📣', title: '공동 마케팅', desc: '콘텐츠 · 프로모션 · 채널 교차 홍보' },
]

const mapping = [
  { no: '①', color: '#1A8FD1', group: '낚시어선 예약', models: ['API', '송객(CPA)', '공동마케팅'] },
  { no: '②', color: '#0B7A75', group: '낚시 정보 · 커뮤니티', models: ['API', '위젯', '공동마케팅'] },
  { no: '③', color: '#C9A84C', group: '낚시 쇼핑몰', models: ['API', '송객', '제휴 커머스'] },
  { no: '④', color: '#E8833A', group: '해양 안전 · 공공', models: ['데이터 연동', '공동 안전 콘텐츠'] },
]

export default function RevenueModel() {
  return (
    <section id="revenue" className="relative overflow-hidden bg-navy py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-[380px] w-[380px] rounded-full bg-white"
        style={{ opacity: 0.04 }}
      />
      <div className="fw-container relative">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="협업 · 수익 모델" tone="dark" />
          <h2 className="fw-headline mt-5 text-white">
            유연하게 조합하는 <span className="text-gold">5가지 협업 모델</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {models.map((m) => (
            <motion.div
              key={m.title}
              variants={fadeInUp}
              className="rounded-2xl border border-white/15 bg-white/5 p-5"
            >
              <p className="text-2xl" aria-hidden="true">
                {m.icon}
              </p>
              <h3 className="mt-3 text-[15px] font-black text-white">{m.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-white/70">{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 파트너 매핑 그리드 */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-8 grid gap-4 md:grid-cols-2"
        >
          {mapping.map((row) => (
            <motion.div
              key={row.group}
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4"
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-navy"
                style={{ backgroundColor: row.color }}
              >
                {row.no}
              </span>
              <span className="font-bold text-white">{row.group}</span>
              <span className="text-white/40" aria-hidden="true">→</span>
              <span className="flex flex-wrap gap-1.5">
                {row.models.map((m) => (
                  <span key={m} className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold text-sand">
                    {m}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}