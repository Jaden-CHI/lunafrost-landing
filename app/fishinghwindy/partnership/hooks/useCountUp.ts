import { useEffect, useState } from 'react'

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * start가 true가 된 시점부터 target까지 easeOut 보간으로 카운트업.
 * prefers-reduced-motion이면 즉시 target을 반환.
 */
export function useCountUp(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1)
      setValue(target * easeOut(progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value
}
