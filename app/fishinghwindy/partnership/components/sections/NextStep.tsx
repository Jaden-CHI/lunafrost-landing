'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOnce } from '../ui/motion'

const steps = [
  { icon: '👥', title: '30분 소개 미팅', desc: '서비스 데모와 제휴 방향 논의' },
  { icon: '🧩', title: 'POC 범위 합의', desc: '가볍게 시작할 시범 연동 범위 확정' },
  { icon: '🚀', title: '파일럿 실행', desc: '효과 측정 후 단계적 확장' },
]

export default function NextStep() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 text-white"
      style={{ background: 'linear-gradient(160deg, #0A2540 0%, #0E4D7B 70%, #0B7A75 100%)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full bg-white"
        style={{ opacity: 0.04 }}
      />
      <div className="fw-container relative text-center">
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-gold">Next Step</p>
          <h2 className="fw-headline mt-5 text-white">함께 만들 다음 단계</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-[1.8] text-sand">
            리스크 없는 공동 마케팅부터 시작하고, 효과가 확인되면 데이터 연동과 수익화로 확장합니다.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeInUp}
              className="rounded-2xl border border-white/15 bg-white/5 p-7"
            >
              <p className="text-3xl" aria-hidden="true">
                {s.icon}
              </p>
              <h3 className="mt-3 font-black text-white">{s.title}</h3>
              <p className="mt-1.5 text-[14px] text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mx-auto mt-12 max-w-2xl rounded-2xl bg-gold px-7 py-6 text-navy"
        >
          <p className="font-black">제휴 문의</p>
          <p className="mt-1 text-[15px] font-bold">
            moonyth.contact@gmail.com · moonyth.app · Fishing Windy by Lunafrost
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={viewportOnce}>
          <a
            href="mailto:moonyth.contact@gmail.com?subject=%5BFishing%20Windy%5D%20%EC%A0%9C%ED%9C%B4%20%EB%AF%B8%ED%8C%85%20%EC%8B%A0%EC%B2%AD"
            className="mt-10 inline-block rounded-full bg-gold px-10 py-4 text-lg font-black text-navy transition hover:brightness-110"
          >
            미팅 신청하기 →
          </a>
        </motion.div>
      </div>
    </section>
  )
}