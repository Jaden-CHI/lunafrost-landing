'use client'

/** 하단 그라디언트 바 (ocean → teal → sky, 4px) */
export default function GradientBar() {
  return (
    <div
      aria-hidden="true"
      className="h-1 w-full"
      style={{ background: 'linear-gradient(90deg, #0E4D7B 0%, #0B7A75 50%, #1A8FD1 100%)' }}
    />
  )
}