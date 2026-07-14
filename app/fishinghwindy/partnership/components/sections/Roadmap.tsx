'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { fadeInUp, staggerContainer, viewportOnce } from '../ui/motion'

const phases = [
  {
    label: 'PHASE 1',
    color: '#1A8FD1',
    title: '공동 마케팅',
    period: '0–1개월',
    items: ['채널 교차 홍보', '공동 콘텐츠 발행', '상호 딥링크 배너'],
  },
  {
    label: 'PHASE 2',
    color: '#0E4D7B',
    title: '데이터 · 위젯 POC',
    period: '1–3개월',
    items: ['API · 위젯 시범 연동', '예약 일정 연동 테스트', '효과 지표 측정'],
  },
  {
    label: 'PHASE 3',
    color: '#C9A84C',
    title: '수익화 · 확장',
    period: '3개월+',
    items: ['CPA · 수익쉐어 정산 개시', '연동 범위 확대', '공동 신규 기능 기획'],
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-white py-24">
      <div className="fw-container">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="로드맵" />
          <h2 className="fw-headline mt-5 text-textdark">
            리스크 없이 시작하는 <span className="text-ocean">3단계 협업</span>
          </h2>
        </motion.div>

        {/* 진행 바 */}
        <div className="relative mt-14 hidden h-1.5 overflow-hidden rounded-full bg-bordr/60 lg:block" aria-hidden="true">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #1A8FD1 0%, #0E4D7B 50%, #C9A84C 100%)' }}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-8 grid gap-5 lg:grid-cols-3"
        >
          {phases.map((p) => (
            <motion.div
              key={p.label}
              variants={fadeInUp}
              className="rounded-2xl border border-bordr bg-white p-7 shadow-[0_2px_12px_rgba(10,37,64,0.05)]"
              style={{ borderTop: `4px solid ${p.color}` }}
            >
              <p className="text-[12px] font-black tracking-[2px]" style={{ color: p.color }}>
                {p.label}
              </p>
              <h3 className="mt-2 text-xl font-black text-textdark">{p.title}</h3>
              <p className="mt-1 text-[13px] font-bold text-textlight">{p.period}</p>
              <ul className="mt-4 space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[14px] leading-relaxed text-textmid">
                    <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: p.color }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-10 rounded-r-2xl border-l-4 border-teal bg-lightbg p-6"
        >
          <p className="leading-[1.8] text-textmid">
            <span className="font-black text-teal">제안:</span> Phase 1 공동 마케팅으로 가볍게 시작 →{' '}
            <span className="font-bold text-textdark">효과 확인 후 단계적 확대</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}