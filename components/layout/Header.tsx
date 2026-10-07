"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { ko: '블로그',  en: 'BLOG',     href: '/blog' },
  { ko: '스튜디오', en: 'STUDIO',   href: '/tools/image-rescaler' },
  { ko: 'AI 도구', en: 'AI TOOLS', href: '/tools' },
  { ko: '앱',      en: 'APPS',     href: '/apps' },
  { ko: '영상',    en: 'YOUTUBE',  href: '/youtube' },
  { ko: '소개',    en: 'ABOUT',    href: '/about' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 w-full z-50 border-b"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="flex justify-between items-center h-20 px-5 lg:px-16 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link href="/" className="no-underline flex items-baseline gap-2">
          <span
            className="font-[family-name:var(--font-inter)] font-bold"
            style={{ fontSize: '20px', color: 'var(--primary)' }}
          >
            lunafrost
          </span>
          <span
            className="font-[family-name:var(--font-mono)] uppercase hidden sm:inline"
            style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'var(--text-muted)' }}
          >
            BY MOONYTH
          </span>
        </Link>

        {/* Nav links — 한·영 dual label */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {NAV_ITEMS.map(item => (
            <li key={item.en} className="relative group">
              <Link href={item.href} className="no-underline flex flex-col items-start">
                <span
                  className="text-[14px] font-medium transition-colors duration-300"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.ko}
                </span>
                <span
                  className="font-[family-name:var(--font-mono)] uppercase transition-colors duration-300"
                  style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'var(--text-muted)' }}
                >
                  {item.en}
                </span>
              </Link>
              {/* underline */}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: 'var(--tertiary)' }}
              />
            </li>
          ))}
        </ul>

        {/* Contact — primary fill */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex no-underline px-6 py-2.5 cta-primary rim-light font-[family-name:var(--font-mono)] uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.15em' }}
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(open => !open)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border bg-white"
          style={{ borderColor: 'var(--border)', color: 'var(--primary)' }}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`${menuOpen ? 'block' : 'hidden'} lg:hidden border-t px-5 pb-6 pt-4`}
        style={{ borderColor: 'var(--border)', background: 'rgba(255, 255, 255, 0.98)' }}
      >
        <ul className="grid grid-cols-2 gap-2 list-none">
          {NAV_ITEMS.map(item => (
            <li key={item.en}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-14 flex-col justify-center rounded-md px-4 no-underline transition-colors hover:bg-[var(--surface-low)] focus-visible:bg-[var(--surface-low)]"
              >
                <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                  {item.ko}
                </span>
                <span
                  className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.en}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="cta-primary mt-4 flex min-h-12 w-full justify-center no-underline font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em]"
        >
          Contact
        </Link>
      </div>

      <style>{`
        .group:hover a span:first-child { color: var(--primary) !important; }
        .group:hover a span:last-child  { color: var(--tertiary) !important; }
      `}</style>
    </nav>
  );
}
