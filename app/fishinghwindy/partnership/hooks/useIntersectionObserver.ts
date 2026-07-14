import { useEffect, useRef, useState } from 'react'

/** 요소가 뷰포트에 진입하면 true를 반환 (once=true면 한 번만) */
export function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.3 },
  once = true,
) {
  const ref = useRef<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        if (once) observer.disconnect()
      } else if (!once) {
        setIsIntersecting(false)
      }
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once])

  return { ref, isIntersecting }
}
