'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { fadeInUp, staggerContainer, viewportOnce } from '../ui/motion'

const assets = [
  {
    no: '01',
    icon: '🌊',
    title: '날씨 · 물때 인텔리전스',
    desc: "낚시 포인트별 바람 · 파고 · 물때 · 입질 점수와 '출조 적합도'. 경쟁 낚시 앱들이 통합하지 못하는 고유 영역.",
  },
  {
    no: '02',
    icon: '📅',
    title: '출조 준비(Pre-trip) 선점',
    desc: '예약 직후~출조 전, 낚시인의 의도가 가장 높은 구간 점유. 송객 · 커머스 · 알림의 최적 타이밍.',
  },
  {
    no: '03',
    icon: '📊',
    title: '조과 · 통계 데이터',
    desc: '출조 일지, 조과 기록, 예측/통계 대시보드. 파트너의 타겟 마케팅에 활용 가능한 행동 데이터.',
  },
  {
    no: '04',
    icon: '📍',
    title: '위치 기반 커머스 접점',
    desc: '포인트 위치 · 출조 일정 · 날씨를 묶은 맥락 추천. 선상 예약까지 확장 가능한 고의도 커머스 트리거.',
  },
]

export default function CoreAssets() {
  return (
    <section id="assets" className="bg-white py-24">
      <div className="fw-container">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="핵심 자산" />
          <h2 className="fw-headline mt-5 text-textdark">
            Fishing Windy가 파트너에게 제공하는 <span className="text-ocean">4가지 자산</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          {assets.map((a) => (
            <motion.div
              key={a.no}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group rounded-2xl border border-bordr bg-white p-7 shadow-[0_2px_12px_rgba(10,37,64,0.05)] transition-colors hover:border-ocean"
            >
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-black tracking-[2px] text-golddeep">{a.no}</span>
                <span className="text-2xl" aria-hidden="true">
                  {a.icon}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-textdark">{a.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-textmid">{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}