import Link from 'next/link';

const READ_LINKS = [
  { label: '블로그', href: '/blog' },
  { label: 'AI 도구', href: '/tools' },
  { label: '앱', href: '/apps' },
  { label: '영상', href: '/youtube' },
];

const BUILD_LINKS = [
  { label: 'lunafrost Landing', href: '/apps' },
  { label: 'AlwaysPDF Tools', href: '/apps' },
  { label: 'TaskSnap', href: '/apps' },
  { label: 'AI 콘텐츠 스튜디오', href: '/tools' },
];

const ELSEWHERE_LINKS = [
  { label: '@Moonyth', href: 'https://www.youtube.com/@Moonyth' },
  { label: '@genai1001', href: 'https://www.youtube.com/@genai1001' },
  { label: 'GitHub', href: 'https://github.com/Jaden-CHI' },
];

const CONTACT_LINKS = [
  { label: 'moonyth.contact@gmail.com', href: '/contact' },
  { label: '협업 문의', href: '/contact' },
];

const LEGAL_LINKS = [
  { label: '개인정보처리방침', href: '/privacy-policy', bold: true },
  { label: '이용약관', href: '/terms' },
  { label: '저작권 정책', href: '/copyright' },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const isExternal = (href: string) => href.startsWith('http');
  return (
    <div className="space-y-4">
      <h3
        className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest font-semibold"
        style={{ color: 'var(--primary)' }}
      >
        {title}
      </h3>
      <ul className="space-y-3 list-none">
        {links.map(link => (
          <li key={link.label}>
            {isExternal(link.href) ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-sm transition-colors duration-300 footer-col-link"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="no-underline text-sm transition-colors duration-300 footer-col-link"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-5 md:px-16 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* 5-col sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="no-underline">
              <span
                className="font-[family-name:var(--font-inter)] font-bold block"
                style={{ fontSize: '18px', color: 'var(--primary)' }}
              >
                lunafrost
              </span>
              <span
                className="font-[family-name:var(--font-mono)] uppercase block mt-1"
                style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--text-muted)' }}
              >
                BY MOONYTH
              </span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              AI와 기술, 창작의 경계에서<br />탐구하는 Moonyth의 기록.
            </p>
          </div>

          <FooterColumn title="READ"      links={READ_LINKS} />
          <FooterColumn title="BUILD"     links={BUILD_LINKS} />
          <FooterColumn title="ELSEWHERE" links={ELSEWHERE_LINKS} />
          <FooterColumn title="CONTACT"   links={CONTACT_LINKS} />
        </div>

        {/* Grow rule separator */}
        <div className="grow-rule mb-8" />

        {/* Colophon */}
        <div className="mb-6">
          <p
            className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            COLOPHON · SET IN INTER &amp; JETBRAINS MONO · METADATA IN JETBRAINS MONO<br />
            BUILT WITH NEXT.JS · HOSTED ON VERCEL · CONTENT VIA NOTION CMS
          </p>
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span
            className="font-[family-name:var(--font-mono)] text-[10px]"
            style={{ color: 'var(--text-muted)' }}
          >
            © 2026 lunafrost — Moonyth. All rights reserved.
          </span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none">
            {LEGAL_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="no-underline transition-colors duration-300 footer-col-link font-[family-name:var(--font-mono)] text-[10px]"
                  style={{
                    color: 'var(--text-muted)',
                    fontWeight: link.bold ? 700 : 400,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .footer-col-link:hover { color: var(--tertiary) !important; }
      `}</style>
    </footer>
  );
}
