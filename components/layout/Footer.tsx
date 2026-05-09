import Link from "next/link";

const footerLinks = [
  { href: "/privacy-policy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/copyright", label: "저작권 정책" },
  { href: "/blog", label: "블로그" },
];

export default function Footer() {
  return (
    <footer
      className="w-full pt-24 pb-16 border-t"
      style={{
        background: "var(--surface)",
        borderColor: "rgba(66, 71, 77, 0.15)",
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-5 md:px-16 max-w-[1280px] mx-auto">
        <span
          className="font-[family-name:var(--font-mono)] text-xs"
          style={{ color: "rgba(194, 199, 206, 0.5)" }}
        >
          © 2025 lunafrost — Moonyth. All rights reserved.
        </span>

        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 list-none">
          {footerLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="no-underline transition-colors duration-300 footer-link"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "rgba(194, 199, 206, 0.6)",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .footer-link:hover { color: var(--primary) !important; }
      `}</style>
    </footer>
  );
}
