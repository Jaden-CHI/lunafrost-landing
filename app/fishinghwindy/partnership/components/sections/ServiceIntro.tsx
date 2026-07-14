'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import StatCounter from '../ui/StatCounter'
import { fadeInUp, staggerContainer, viewportOnce } from '../ui/motion'

const features = [
  {
    icon: '🌊',
    title: '날씨 · 출조 적합도',
    desc: '포인트별 바람 · 파고 · 물때를 종합한 출조 가능여부와 입질 지표 제공',
  },
  {
    icon: '🕐',
    title: '시간대별 예보 · 추천 출조 시간',
    desc: '하루 중 입질 확률이 높은 시간대를 추천하는 시간대별 정밀 예보',
  },
  {
    icon: '📋',
    title: '출조 일지 · 조과 기록',
    desc: '출조 기록과 조과를 남기고 날씨 조건과 함께 통계로 확인',
  },
  {
    icon: '⚓',
    title: '항구 · 포인트 정보',
    desc: '전국 항구 · 낚시 포인트 데이터베이스와 위치 기반 탐색',
  },
  {
    icon: '🛡️',
    title: '안전 · 법규 정보',
    desc: '기상특보 · 금어기 · 출조 신고 등 안전 및 법규 정보 안내',
  },
]

export default function ServiceIntro() {
  return (
    <section id="service" className="bg-lightbg py-24">
      <div className="fw-container">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="서비스 소개" />
          <h2 className="fw-headline mt-5 text-textdark">
            Fishing Windy — 낚시 날씨 · 출조 준비 앱
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 기능 리스트 */}
          <motion.ul
            variants={staggerContainer(0.1)}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="space-y-6"
          >
            {features.map((f) => (
              <motion.li key={f.title} variants={fadeInUp} className="flex gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-[0_2px_8px_rgba(10,37,64,0.08)]"
                  aria-hidden="true"
                >
                  {f.icon}
                </span>
                <div>
                  <h3 className="font-black text-textdark">{f.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.7] text-textmid">{f.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* 시장 통계 카운터 */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="flex flex-col justify-center gap-5"
          >
            <motion.div variants={fadeInUp}>
              <StatCounter
                value={720}
                suffix="만+"
                label="국내 낚시 인구"
                sub="2025년 기준, 해양수산부"
                variant="gold"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <StatCounter
                value={2.78}
                suffix="조"
                decimals={2}
                label="낚시 산업 시장 규모"
                sub="2조 7,809억 원 · 2023년 기준"
                variant="teal"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <StatCounter
                value={500}
                suffix="만+"
                label="연간 낚시어선 이용객"
                sub="2024년 · 10년간 70% 증가"
                variant="ocean"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}