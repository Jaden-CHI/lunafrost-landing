'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { fadeInUp, viewportOnce } from '../ui/motion'

interface Scenario {
  icon: string
  title: string
  desc: string
}

interface TabContent {
  no: string
  tab: string
  headline: string
  insight: string
  scenarios: Scenario[]
  partnerEffects: string[]
  windyEffects: string[]
}

const tabs: TabContent[] = [
  {
    no: '01',
    tab: '① 낚시어선 예약',
    headline: '낚시어선 예약 — 예약 다음의 모든 것',
    insight:
      "인사이트: 예약 직후 낚시인은 곧바로 '출조 준비 모드'에 들어갑니다. 날씨를 확인하고, 물때를 계산하고, 채비를 점검하는 이 구간을 Fishing Windy가 담당하면 예약 플랫폼의 경험이 완성됩니다.",
    scenarios: [
      {
        icon: '📲',
        title: '예약 → 일정 자동 연동',
        desc: '예약 확정 시 출조 일정이 Fishing Windy에 자동 등록되어 날씨 · 물때 · 준비물 브리핑 제공',
      },
      {
        icon: '🌊',
        title: '날씨 알림 → 노쇼 감소',
        desc: '기상 악화 예측 시 선제 알림과 예약 변경 안내로 당일 취소 · 노쇼 최소화',
      },
      {
        icon: '⚓',
        title: '잔여 좌석 송객',
        desc: '출조 적합일에 잔여 좌석 정보를 고의도 사용자에게 노출해 막판 예약 전환',
      },
    ],
    partnerEffects: ['노쇼 · 당일 취소 감소', '예약 후 이탈 구간 커버', '출조 적합일 재예약 유도', '차별화된 예약 경험 제공'],
    windyEffects: ['예약 데이터 기반 일정 정확도 향상', 'CPA 송객 수익', '예약 플랫폼 사용자 유입', '실사용 시나리오 강화'],
  },
  {
    no: '02',
    tab: '② 낚시 정보·커뮤니티',
    headline: '낚시 정보 · 커뮤니티 — 조황과 날씨의 결합',
    insight:
      '인사이트: 조황 정보는 "결과"이고 날씨 · 물때는 "조건"입니다. 두 데이터가 만나면 "어떤 조건에서 잘 잡히는가"라는 낚시인이 가장 궁금해하는 질문에 답할 수 있습니다.',
    scenarios: [
      {
        icon: '🧩',
        title: '화이트라벨 날씨 위젯',
        desc: '커뮤니티 · 조황 페이지에 포인트별 날씨 · 물때 위젯을 임베드해 체류 시간 증가',
      },
      {
        icon: '🔄',
        title: '조과 기록 동기화',
        desc: '커뮤니티 조황과 Fishing Windy 출조 일지를 연동해 양쪽 데이터 동시 보강',
      },
      {
        icon: '📰',
        title: '공동 콘텐츠',
        desc: '"이번 주 출조 전망" 등 날씨 × 조황 결합 콘텐츠를 공동 발행해 상호 유입',
      },
    ],
    partnerEffects: ['날씨 · 물때 데이터 보강', '체류 시간 · 재방문 증가', '콘텐츠 차별화', '신규 사용자 확보'],
    windyEffects: ['조황 데이터로 입질 지표 고도화', '커뮤니티 사용자 유입', '위젯 노출로 브랜드 확산', '공동 콘텐츠 채널 확보'],
  },
  {
    no: '03',
    tab: '③ 낚시 쇼핑몰',
    headline: '낚시 쇼핑몰 — 구매 직전의 맥락을 잡다',
    insight:
      '인사이트: 낚시 용품 구매는 출조 일정과 날씨 조건이 정해진 뒤 일어납니다. "주말 감성돔 출조 확정"이라는 맥락을 아는 쪽이 가장 정확한 추천을 할 수 있습니다.',
    scenarios: [
      {
        icon: '🛒',
        title: '날씨 트리거 추천',
        desc: '출조 일정 · 대상 어종 · 날씨 조건에 맞춘 채비 · 장비 추천으로 고의도 송객',
      },
      {
        icon: '🏪',
        title: '스토어 모듈 입점',
        desc: '출조 체크리스트에 파트너 상품을 연결하는 제휴 커머스 모듈',
      },
      {
        icon: '🎯',
        title: '시즌 캠페인',
        desc: '금어기 해제 · 시즌 개막 타이밍에 맞춘 공동 프로모션 진행',
      },
    ],
    partnerEffects: ['전환율 높은 고의도 트래픽', '맥락 기반 객단가 상승', '시즌 수요 선점', '신규 고객 획득 비용 절감'],
    windyEffects: ['제휴 커머스 · CPA 수익', '체크리스트 기능 강화', '쇼핑몰 사용자 유입', '커머스 데이터 확보'],
  },
]

export default function PartnerScenarios() {
  const [active, setActive] = useState(0)
  const content = tabs[active]

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setActive((a) => Math.min(a + 1, tabs.length - 1)),
    onSwipedRight: () => setActive((a) => Math.max(a - 1, 0)),
    trackMouse: false,
  })

  return (
    <section id="scenarios" className="bg-white py-24">
      <div className="fw-container">
        {/* 탭 네비게이션 */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          role="tablist"
          aria-label="파트너별 제휴 시나리오"
          className="flex flex-wrap gap-2"
        >
          {tabs.map((t, i) => (
            <button
              key={t.no}
              role="tab"
              id={`scenario-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`scenario-panel-${i}`}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${
                active === i
                  ? 'bg-navy text-white'
                  : 'bg-lightbg text-textmid hover:bg-bordr/60'
              }`}
            >
              {t.tab}
            </button>
          ))}
        </motion.div>

        <div {...swipeHandlers} className="relative mt-10 min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              id={`scenario-panel-${active}`}
              aria-labelledby={`scenario-tab-${active}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* 대형 배경 번호 */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 right-0 select-none text-[120px] font-black leading-none text-navy/5 sm:text-[180px]"
              >
                {content.no}
              </span>

              <h2 className="fw-headline relative text-textdark">{content.headline}</h2>

              <div className="relative mt-7 rounded-2xl bg-navy p-6 sm:p-7">
                <p className="leading-[1.8] text-sand">
                  <span className="font-black text-gold">{content.insight.split(':')[0]}:</span>
                  {content.insight.slice(content.insight.indexOf(':') + 1)}
                </p>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {content.scenarios.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-bordr bg-white p-6 shadow-[0_2px_12px_rgba(10,37,64,0.05)]"
                  >
                    <p className="text-3xl" aria-hidden="true">
                      {s.icon}
                    </p>
                    <h3 className="mt-3 font-black text-textdark">{s.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.7] text-textmid">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div className="rounded-r-2xl border-l-4 border-[#2E9E5B] bg-lightbg p-6">
                  <h3 className="font-black text-textdark">파트너 효과</h3>
                  <ul className="mt-3 space-y-2">
                    {content.partnerEffects.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-[14px] leading-relaxed text-textmid">
                        <span className="mt-0.5 font-bold text-[#2E9E5B]" aria-hidden="true">✓</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-r-2xl border-l-4 border-sky bg-lightbg p-6">
                  <h3 className="font-black text-textdark">Fishing Windy 효과</h3>
                  <ul className="mt-3 space-y-2">
                    {content.windyEffects.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-[14px] leading-relaxed text-textmid">
                        <span className="mt-0.5 font-bold text-sky" aria-hidden="true">✓</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}