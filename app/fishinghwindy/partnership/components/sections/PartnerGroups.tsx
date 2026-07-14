'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { fadeInUp, staggerContainer, viewportOnce } from '../ui/motion'

const groups = [
  {
    no: '①',
    color: '#1A8FD1',
    title: '낚시어선 예약 플랫폼',
    sub: '더피싱 · 선상24 · 어신 · 낚시해',
    summary: '예약 직후 출조 일정 자동 연동으로 노쇼 감소 · 재방문 유도',
    detail:
      '예약이 확정되는 순간부터 출조일까지, Fishing Windy가 날씨 · 물때 · 준비물 알림을 담당합니다. 기상 악화 시 예약 변경을 선제 안내해 노쇼를 줄이고, 출조 가능일 추천으로 재예약을 유도합니다. 잔여 좌석 정보를 받아 고의도 사용자에게 송객할 수도 있습니다.',
  },
  {
    no: '②',
    color: '#0B7A75',
    title: '낚시 정보 · 커뮤니티',
    sub: '어신 · 낚시 조황 플랫폼',
    summary: '현장 조황 정보와 사전 날씨 · 물때를 데이터로 연동',
    detail:
      '커뮤니티의 실시간 조황과 Fishing Windy의 사전 날씨 · 물때 데이터를 상호 연동하면, "이 조건에서 잘 잡혔다"는 데이터 스토리가 완성됩니다. 화이트라벨 날씨 위젯 제공으로 커뮤니티 체류 시간을 늘리고, 조과 기록 동기화로 양쪽 데이터가 함께 풍부해집니다.',
  },
  {
    no: '③',
    color: '#C9A84C',
    title: '낚시 용품 쇼핑몰',
    sub: '머털낚시 · 제일레져 · 싸파 · 엠피싱',
    summary: '날씨 · 출조 일정 트리거 커머스로 고의도 구매 유도',
    detail:
      '출조 일정과 날씨 조건이 확정된 낚시인은 구매 의도가 가장 높은 상태입니다. "이번 주말 파고 낮음 · 감성돔 시즌" 같은 맥락에 맞춘 채비 · 장비 추천으로 전환율 높은 트래픽을 보냅니다. CPA 또는 제휴 커머스 모듈로 정산합니다.',
  },
  {
    no: '④',
    color: '#E8833A',
    title: '해양 안전 · 공공 기관',
    sub: '해양수산부 · 해양경찰청 · 국립해양조사원',
    summary: '기상특보 · 출조 신고 · 금어기 정보 공식 연동으로 앱 신뢰도 강화',
    detail:
      '공공 데이터 기반의 기상특보 · 금어기 · 출조 신고 정보를 공식 연동해 낚시인의 안전과 법규 준수를 돕습니다. 기관 입장에서는 낚시인에게 안전 정보를 전달하는 실질적 채널을 확보하고, Fishing Windy는 공신력을 얻습니다.',
  },
]

export default function PartnerGroups() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="partners" className="bg-lightbg py-24">
      <div className="fw-container">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="제휴 대상" />
          <h2 className="fw-headline mt-5 text-textdark">
            4개 파트너군과 <span className="text-ocean">핵심 제휴 포인트</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-12 space-y-4"
        >
          {groups.map((g, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={g.title}
                variants={fadeInUp}
                className="overflow-hidden rounded-2xl border border-bordr bg-white shadow-[0_2px_12px_rgba(10,37,64,0.05)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-black text-white"
                    style={{ backgroundColor: g.color }}
                  >
                    {g.no}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-black text-textdark">
                      {g.title} <span className="ml-1 text-[13px] font-bold text-textlight">{g.sub}</span>
                    </span>
                    <span className="mt-0.5 block text-[14px] text-textmid">→ {g.summary}</span>
                  </span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-textlight"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <p
                        className="border-t border-bordr px-6 py-5 text-[15px] leading-[1.8] text-textmid"
                        style={{ borderLeft: `4px solid ${g.color}` }}
                      >
                        {g.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}