'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import Card from '../ui/Card'
import { fadeInUp, staggerContainer, viewportOnce } from '../ui/motion'

const summaryCards = [
  {
    icon: '🎣',
    title: '우리가 가진 것',
    items: ['포인트별 날씨 데이터', '물때 · 파고 · 입질 지표', '출조 일지 · 조과 통계', '안전 정보 · 금어기 안내', 'SOS · 출조 체크리스트'],
  },
  {
    icon: '🎁',
    title: '파트너가 얻는 것',
    items: ['고의도(High-intent) 송객', '날씨 알림 기반 노쇼 감소', '날씨 · 행동 데이터 보완', '출조 전 신규 고객 접점', '날씨 트리거 구매 유도'],
  },
  {
    icon: '🤝',
    title: '협업 형태',
    items: ['REST API 연동', '화이트라벨 날씨 위젯', 'CPA · 수익쉐어 정산', '공동 마케팅 · 콘텐츠', '앱 간 딥링크 연동'],
  },
]

export default function Summary() {
  return (
    <section id="summary" className="bg-white py-24">
      <div className="fw-container">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="제안 요약" />
          <h2 className="fw-headline mt-5 text-textdark">
            기존 낚시 플랫폼들이 <span className="text-ocean">비워둔 자리</span>를 잡습니다
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-10 rounded-2xl bg-navy p-7 sm:p-9"
        >
          <p className="text-lg font-bold leading-[1.7] text-white sm:text-xl">
            Fishing Windy는 낚시인의 <span className="text-gold">'출조 직전(Pre-trip)'</span>과{' '}
            <span className="text-gold">'날씨 · 물때'</span>라는 접점을 점유합니다.
          </p>
          <p className="mt-2 leading-[1.7] text-sand">
            예약 · 현장 조황 · 구매를 잇는, 가장 앞단의 보완 레이어입니다.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-8 grid gap-5 md:grid-cols-3"
        >
          {summaryCards.map((card) => (
            <motion.div key={card.title} variants={fadeInUp}>
              <Card className="h-full">
                <p className="text-3xl" aria-hidden="true">
                  {card.icon}
                </p>
                <h3 className="mt-3 text-lg font-black text-textdark">{card.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[15px] leading-relaxed text-textmid">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}