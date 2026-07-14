'use client'

import { motion } from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'
import { fadeInUp, viewportOnce } from '../ui/motion'

const modelTagColor: Record<string, string> = {
  API: 'bg-sky/15 text-ocean',
  '송객(CPA)': 'bg-gold/20 text-golddeep',
  송객: 'bg-gold/20 text-golddeep',
  위젯: 'bg-teal/15 text-teal',
  공동마케팅: 'bg-ocean/10 text-ocean',
  제휴커머스: 'bg-gold/20 text-golddeep',
  데이터연동: 'bg-sky/15 text-ocean',
  공동콘텐츠: 'bg-teal/15 text-teal',
}

const rows = [
  {
    no: '①',
    color: '#1A8FD1',
    group: '낚시어선 예약',
    partnership: '예약→일정 연동, 날씨 알림, 잔여 송객',
    effects: '노쇼 감소, 재유입',
    models: ['API', '송객(CPA)'],
  },
  {
    no: '②',
    color: '#0B7A75',
    group: '낚시 정보 · 커뮤니티',
    partnership: '날씨 위젯, 조과 동기화, 공동 콘텐츠',
    effects: '데이터 보강, 사용자 확보',
    models: ['위젯', '공동마케팅'],
  },
  {
    no: '③',
    color: '#C9A84C',
    group: '낚시 쇼핑몰',
    partnership: '날씨 트리거 추천, 스토어 모듈',
    effects: '고의도 트래픽, 전환율 향상',
    models: ['제휴커머스', '송객'],
  },
  {
    no: '④',
    color: '#E8833A',
    group: '해양 안전 · 공공',
    partnership: '기상특보 · 금어기 데이터 연동',
    effects: '앱 신뢰도 강화',
    models: ['데이터연동', '공동콘텐츠'],
  },
]

function ModelTag({ name }: { name: string }) {
  return (
    <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${modelTagColor[name] ?? 'bg-bordr text-textmid'}`}>
      {name}
    </span>
  )
}

export default function ExpectedEffects() {
  return (
    <section id="effects" className="bg-lightbg py-24">
      <div className="fw-container">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <SectionBadge label="기대 효과" />
          <h2 className="fw-headline mt-5 text-textdark">
            파트너별 기대 효과 <span className="text-ocean">한눈에</span>
          </h2>
        </motion.div>

        {/* 데스크톱: 테이블 */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-12 hidden overflow-x-auto rounded-2xl border border-bordr bg-white shadow-[0_2px_12px_rgba(10,37,64,0.05)] md:block"
        >
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="px-6 py-4 font-bold">파트너군</th>
                <th scope="col" className="px-6 py-4 font-bold">핵심 제휴</th>
                <th scope="col" className="px-6 py-4 font-bold">파트너 기대 효과</th>
                <th scope="col" className="px-6 py-4 font-bold">우선 모델</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.group} className="border-t border-bordr align-top">
                  <td className="px-6 py-5 font-bold text-textdark">
                    <span className="mr-2" style={{ color: row.color }} aria-hidden="true">{row.no}</span>
                    {row.group}
                  </td>
                  <td className="px-6 py-5 leading-relaxed text-textmid">{row.partnership}</td>
                  <td className="px-6 py-5 leading-relaxed text-textmid">{row.effects}</td>
                  <td className="px-6 py-5">
                    <span className="flex flex-wrap gap-1.5">
                      {row.models.map((m) => (
                        <ModelTag key={m} name={m} />
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* 모바일: 카드형 */}
        <div className="mt-10 space-y-4 md:hidden">
          {rows.map((row) => (
            <motion.div
              key={row.group}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={viewportOnce}
              className="rounded-2xl border border-bordr bg-white p-5 shadow-[0_2px_12px_rgba(10,37,64,0.05)]"
              style={{ borderLeft: `4px solid ${row.color}` }}
            >
              <h3 className="font-black text-textdark">
                {row.no} {row.group}
              </h3>
              <dl className="mt-3 space-y-2 text-[14px]">
                <div>
                  <dt className="font-bold text-textlight">핵심 제휴</dt>
                  <dd className="text-textmid">{row.partnership}</dd>
                </div>
                <div>
                  <dt className="font-bold text-textlight">기대 효과</dt>
                  <dd className="text-textmid">{row.effects}</dd>
                </div>
              </dl>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {row.models.map((m) => (
                  <ModelTag key={m} name={m} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}