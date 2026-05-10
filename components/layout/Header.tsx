import Link from "next/link";

const navLinks = [
  { href: "/blog", label: "블로그" },
  { href: "/tools", label: "AI 도구" },
  { href: "/apps", label: "앱" },
  { href: "/youtube", label: "YouTube" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <nav
      className="sticky top-0 w-full z-50 border-b"
      style={{
        background: "rgba(16, 20, 26, 0.85)",
        borderColor: "rgba(66, 71, 77, 0.15)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div className="flex justify-between items-center h-20 px-5 md:px-16 max-w-[1280px] mx-auto">
        <Link href="/" className="no-underline flex items-baseline gap-2">
          <span
            className="font-[family-name:var(--font-cormorant)] text-xl tracking-tighter"
            style={{ color: "var(--text)" }}
          >
            lunafrost
          </span>
          <span
            className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] opacity-40"
            style={{ color: "var(--text)" }}
          >
            BY MOONYTH
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((item) => (
            <li key={item.href} className="relative group">
              <Link
                href={item.href}
                className="no-underline text-sm font-medium transition-colors duration-300"
                style={{ color: "var(--text-muted)" }}
              >
                {item.label}
              </Link>
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "var(--primary)" }}
              />
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex no-underline px-6 py-2.5 border text-xs uppercase tracking-[0.15em] transition-all duration-300 rim-light"
          style={{
            borderColor: "rgba(170, 212, 249, 0.3)",
            color: "var(--primary)",
          }}
        >
          Contact
        </Link>
      </div>

      <style>{`
        li:hover a { color: var(--text) !important; }
      `}</style>
    </nav>
  );
}
