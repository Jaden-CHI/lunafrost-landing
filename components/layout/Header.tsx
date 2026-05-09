import Link from "next/link";

export default function Header() {
  return (
    <nav
      className="relative z-10 flex justify-between items-center px-12 py-8 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <Link href="/" className="nav-logo no-underline">
        <span
          className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-widest"
          style={{ color: "var(--frost)" }}
        >
          lunafrost
        </span>
        <span
          className="font-light text-sm ml-2 tracking-[0.15em] uppercase align-middle"
          style={{ color: "var(--text-muted)" }}
        >
          by Moonyth
        </span>
      </Link>

      <ul className="flex gap-8 list-none">
        {[
          { href: "/blog", label: "블로그" },
          { href: "/tools", label: "AI 도구" },
          { href: "/apps", label: "앱" },
          { href: "/youtube", label: "YouTube" },
          { href: "/about", label: "About" },
        ].map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="nav-link text-sm tracking-[0.05em] no-underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <style>{`
        .nav-link { color: var(--text-muted); transition: color 0.2s; }
        .nav-link:hover { color: var(--frost); }
        .nav-logo { transition: opacity 0.2s; }
        .nav-logo:hover { opacity: 0.8; }
      `}</style>
    </nav>
  );
}
