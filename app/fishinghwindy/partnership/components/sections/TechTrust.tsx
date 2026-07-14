'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { fadeInUp, viewportOnce } from '../ui/motion'

const integrations = [
  { title: 'REST API', desc: '날씨 · 물때 · 적합도 데이터 제공' },
  { title: '딥링크', desc: '앱 간 컨텍스트 유지 이동' },
  { title: '임베드 위젯 / SDK', desc: '웹 · 앱에 바로 삽입' },
  { title: '화이트라벨', desc: '파트너 브랜드로 제공' },
]

const governance = [
  '개인정보 최소 수집 원칙',
  '목적 기반 분리 처리',
  '정보보안 실무 경력 보유',
  'ISMS · PCI-DSS 이해',
  '계약 범위 내 데이터 활용',
  '공식 공공 데이터 기반',
]

export default function TechTrust() {
  return (
    <section id="trust" className="bg-lightbg py-24">
      <div className="fw-container">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="연동 · 신뢰성" />
          <h2 className="fw-headline mt-5 text-textdark">
            가볍게 연동하고, <span className="text-ocean">안전하게 다룹니다</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* 연동 방식 */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="rounded-2xl bg-navy p-7 sm:p-8"
          >
            <h3 className="text-xl font-black text-white">연동 방식</h3>
            <ul className="mt-6 space-y-5">
              {integrations.map((it) => (
                <li key={it.title} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-white">{it.title}</p>
                    <p className="mt-0.5 text-[14px] text-sand">{it.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 데이터 거버넌스 */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="rounded-2xl border border-bordr bg-white p-7 shadow-[0_2px_12px_rgba(10,37,64,0.05)] sm:p-8"
          >
            <h3 className="text-xl font-black text-textdark">데이터 거버넌스 · 신뢰성</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {governance.map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-textmid">
                  <span className="mt-0.5 font-bold text-teal" aria-hidden="true">✓</span>
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}