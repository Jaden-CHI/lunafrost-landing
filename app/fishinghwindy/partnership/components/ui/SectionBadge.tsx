'use client'

interface SectionBadgeProps {
  label: string
  tone?: 'light' | 'dark' | 'gold'
}

const toneClass: Record<NonNullable<SectionBadgeProps['tone']>, string> = {
  light: 'bg-ocean/10 text-ocean',
  dark: 'bg-white/10 text-sand',
  gold: 'bg-gold/15 text-gold',
}

export default function SectionBadge({ label, tone = 'light' }: SectionBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[2px] ${toneClass[tone]}`}
    >
      {label}
    </span>
  )
}