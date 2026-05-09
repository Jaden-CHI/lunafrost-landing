import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative z-10 px-12 py-10 border-t flex justify-between items-center flex-wrap gap-4"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        © 2025 lunafrost — Moonyth. All rights reserved.
      </p>
      <ul className="flex gap-6 list-none">
        {[
          { href: "/privacy-policy", label: "개인정보처리방침" },
          { href: "/terms", label: "이용약관" },
          { href: "/copyright", label: "저작권 정책" },
          { href: "/blog", label: "블로그" },
        ].map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="footer-link text-sm no-underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <style>{`
        .footer-link { color: var(--text-muted); transition: color 0.2s; }
        .footer-link:hover { color: var(--frost); }
      `}</style>
    </footer>
  );
}
