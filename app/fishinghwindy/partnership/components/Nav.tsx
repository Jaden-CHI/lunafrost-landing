'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '#summary', label: '제안 요약' },
  { href: '#service', label: '서비스' },
  { href: '#partners', label: '파트너' },
  { href: '#roadmap', label: '로드맵' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 스크롤 위치에 따라 활성 섹션 하이라이트
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? 'bg-navy shadow-lg' : 'bg-navy/40'
      }`}
      aria-label="주 메뉴"
    >
      <div className="fw-container flex h-16 items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 font-black text-white">
          <span aria-hidden="true">🎣</span>
          Fishing <span className="text-gold">Windy</span>
        </a>

        {/* 데스크톱 메뉴 */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-[14px] font-bold transition-colors ${
                active === l.href ? 'text-gold' : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 rounded-full bg-gold px-5 py-2 text-[14px] font-black text-navy transition hover:brightness-110"
          >
            문의하기
          </a>
        </div>

        {/* 모바일 햄버거 */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden bg-navy md:hidden"
          >
            <div className="fw-container flex flex-col gap-1 pb-5 pt-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-bold text-white/90 hover:bg-white/10"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-gold px-5 py-2.5 text-center font-black text-navy"
              >
                문의하기
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}