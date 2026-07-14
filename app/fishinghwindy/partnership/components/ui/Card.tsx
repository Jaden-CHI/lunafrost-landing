'use client'

import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** 좌측 컬러 보더 (효과 카드용) */
  accent?: string
  className?: string
}

export default function Card({ children, accent, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-bordr bg-white p-6 shadow-[0_2px_12px_rgba(10,37,64,0.05)] ${className}`}
      style={accent ? { borderLeft: `4px solid ${accent}` } : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}