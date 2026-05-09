import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 Moonyth에 대해",
};

export default function AboutPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1
          className="font-[family-name:var(--font-cormorant)] text-5xl font-light mb-12"
          style={{ color: "var(--text)" }}
        >
          About
        </h1>

        <div className="space-y-8">
          <section>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4"
              style={{ color: "var(--frost)" }}
            >
              Moonyth
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 공간입니다.
              기술과 창작의 경계를 걸으며, 직접 만들고 경험한 것들을 기록합니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-40" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4"
              style={{ color: "var(--frost)" }}
            >
              lunafrost란?
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              서리처럼 조용하지만 선명하게 — AI와 코드, 콘텐츠가 교차하는 지점을
              탐구하는 공간입니다. AI Tools, App Development, Content Strategy,
              YouTube 콘텐츠를 다룹니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-40" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4"
              style={{ color: "var(--frost)" }}
            >
              Contact
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              문의사항이 있으시면 블로그를 통해 연락해주세요.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
