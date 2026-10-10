import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://moonyth.app/pangpangdefense/privacy" },
  title: "팡팡 디펜스 개인정보처리방침",
  description: "팡팡 디펜스 개인정보처리방침",
};

const sections = [
  {
    title: "1. 수집하는 개인정보",
    items: [
      "팡팡 디펜스는 이름, 이메일, 전화번호, 위치, 기기 식별자 등 어떠한 개인정보도 수집하지 않습니다.",
      "회원가입과 로그인 기능이 없습니다.",
    ],
  },
  {
    title: "2. 기기에 저장되는 정보",
    items: [
      "게임 진행 기록(코인, 아이템, 스테이지 별, 출석 기록, 도전 과제, 튜토리얼 완료 여부, 소리 설정)은 이용자의 기기 안에만 저장됩니다.",
      "이 정보는 개발자나 제3자에게 전송되지 않으며, 앱을 삭제하면 함께 삭제됩니다.",
    ],
  },
  {
    title: "3. 제3자 제공 및 외부 서비스",
    items: [
      "광고, 분석 도구, 결제 서비스 등 외부 서비스를 사용하지 않습니다.",
      "게임은 인터넷 연결 없이 동작하며, 개인정보를 제3자에게 제공하지 않습니다.",
    ],
  },
  {
    title: "4. 아동의 개인정보",
    items: ["연령과 관계없이 어떠한 개인정보도 수집하지 않습니다."],
  },
  {
    title: "5. 방침의 변경",
    items: ["이 방침이 바뀌면 앱 업데이트 또는 이 페이지를 통해 알려 드립니다."],
  },
];

export default function PangPangDefensePrivacyPolicyPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/pangpangdefense-icon.png"
            alt="팡팡 디펜스"
            width={64}
            height={64}
            className="rounded-lg"
          />
          <h1
            className="font-[family-name:var(--font-inter)] text-4xl font-bold"
            style={{ color: "var(--text)" }}
          >
            팡팡 디펜스<br />
            <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>개인정보처리방침</span>
          </h1>
        </div>
        <div className="pb-4 mb-8" style={{ borderBottom: "3px solid var(--tertiary)" }} />
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>
          시행일: 2026년 10월 4일
        </p>

        <div className="space-y-10" style={{ color: "var(--text-muted)" }}>
          <p className="leading-relaxed">
            Moonyth(이하 &quot;개발자&quot;)는 모바일 게임 「팡팡 디펜스」(이하 &quot;앱&quot;)를 제공하며,
            이용자의 개인정보를 소중히 여깁니다.
          </p>

          {sections.map((s) => (
            <div key={s.title} className="space-y-10">
              <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />
              <section>
                <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
                  {s.title}
                </h2>
                <ul className="space-y-2 leading-relaxed list-none">
                  {s.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </section>
            </div>
          ))}

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              6. 문의
            </h2>
            <p className="leading-relaxed">
              개인정보 관련 문의:
            </p>
            <p className="mt-4">
              <a
                href="mailto:moonyth.contact@gmail.com"
                className="transition-colors duration-200"
                style={{ color: "var(--tertiary)" }}
              >
                moonyth.contact@gmail.com
              </a>
            </p>
          </section>

          <div style={{ borderTop: "1px solid var(--border)", marginTop: "40px", paddingTop: "40px", textAlign: "center", color: "var(--text-muted)", fontSize: "12px" }}>
            <p>🏰 팡팡 디펜스 | 동물 블록 매치3 퍼즐 디펜스</p>
          </div>
        </div>

        {/* Privacy Policy Navigation */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm font-medium mb-4" style={{ color: "var(--text)" }}>
            다른 개인정보처리방침 보기
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/privacy-policy"
              className="p-4 rounded-lg border no-underline transition-all duration-200 hover:bg-opacity-5 hover:border-tertiary"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            >
              <p className="font-medium" style={{ color: "var(--text)" }}>lunafrost</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>기본 개인정보처리방침</p>
            </Link>
            <Link
              href="/golfwindy/privacy"
              className="p-4 rounded-lg border no-underline transition-all duration-200 hover:bg-opacity-5 hover:border-tertiary"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            >
              <p className="font-medium" style={{ color: "var(--text)" }}>⛳ Golf Windy</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>골프 날씨 가이드</p>
            </Link>
            <Link
              href="/pangpangdefense/privacy"
              className="p-4 rounded-lg border no-underline"
              style={{ borderColor: "var(--tertiary)", background: "rgba(0,122,255,0.05)", color: "var(--text)" }}
            >
              <p className="font-medium" style={{ color: "var(--tertiary)" }}>🏰 팡팡 디펜스</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>퍼즐 디펜스 게임</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
