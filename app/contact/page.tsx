import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Moonyth에게 연락하기 — moonyth.contact@gmail.com",
};

export default function ContactPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="mb-16">
          <p
            className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--tertiary)" }}
          >
            Contact
          </p>
          <h1
            className="font-[family-name:var(--font-inter)] text-5xl font-bold mb-6"
            style={{ color: "var(--text)" }}
          >
            연락하기
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            협업, 문의, 피드백 무엇이든 편하게 보내주세요.
          </p>
        </div>

        <div
          className="p-12 border"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          <p
            className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--tertiary)" }}
          >
            Email
          </p>
          <a
            href="mailto:moonyth.contact@gmail.com"
            className="font-[family-name:var(--font-inter)] font-bold no-underline transition-colors duration-300 block mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--text)",
            }}
          >
            moonyth.contact@gmail.com
          </a>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            보통 1–2일 내에 답변드립니다.
          </p>
        </div>

      </main>

      <Footer />
    </>
  );
}
