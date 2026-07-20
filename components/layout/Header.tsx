import Link from "next/link";

const NAV_ITEMS = [
  { ko: '블로그',  en: 'BLOG',     href: '/blog' },
  { ko: '스튜디오', en: 'STUDIO',   href: '/tools/image-rescaler' },
  { ko: 'AI 도구', en: 'AI TOOLS', href: '/tools' },
  { ko: '앱',      en: 'APPS',     href: '/apps' },
  { ko: '영상',    en: 'YOUTUBE',  href: '/youtube' },
  { ko: '소개',    en: 'ABOUT',    href: '/about' },
];

export default function Header() {
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
      <div className="flex justify-between items-center h-20 px-5 md:px-16 max-w-[1280px] mx-auto">
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
        <ul className="hidden md:flex items-center gap-8 list-none">
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
        <Link
          href="/contact"
          className="hidden md:inline-flex no-underline px-6 py-2.5 cta-primary rim-light font-[family-name:var(--font-mono)] uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.15em' }}
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
