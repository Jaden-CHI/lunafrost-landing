import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const staggerContainer = (stagger = 0.1): Variants => ({
  initial: {},
  animate: { transition: { staggerChildren: stagger } },
})

export const viewportOnce = { once: true, amount: 0.2 } as const
