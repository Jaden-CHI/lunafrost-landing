'use client'

import { useCountUp } from '../../hooks/useCountUp'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface StatCounterProps {
  /** 카운트업 목표값 */
  value: number
  /** 목표값 앞뒤 표기 (예: '만+', '조') */
  suffix?: string
  /** 소수점 자릿수 */
  decimals?: number
  label: string
  sub?: string
  variant: 'gold' | 'teal' | 'ocean'
}

const variantClass: Record<StatCounterProps['variant'], { box: string; num: string; label: string; sub: string }> = {
  gold: {
    box: 'bg-white border border-bordr',
    num: 'text-golddeep',
    label: 'text-textdark',
    sub: 'text-textlight',
  },
  teal: {
    box: 'bg-teal',
    num: 'text-white',
    label: 'text-white',
    sub: 'text-white/70',
  },
  ocean: {
    box: 'bg-ocean',
    num: 'text-white',
    label: 'text-white',
    sub: 'text-white/70',
  },
}

export default function StatCounter({ value, suffix = '', decimals = 0, label, sub, variant }: StatCounterProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.4 })
  const current = useCountUp(value, isIntersecting)
  const c = variantClass[variant]

  return (
    <div ref={ref} className={`rounded-2xl px-7 py-6 ${c.box}`}>
      <p className={`text-4xl font-black tracking-[-0.5px] sm:text-[42px] ${c.num}`}>
        {current.toLocaleString('ko-KR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </p>
      <p className={`mt-2 text-base font-bold ${c.label}`}>{label}</p>
      {sub && <p className={`mt-0.5 text-[13px] ${c.sub}`}>{sub}</p>}
    </div>
  )
}