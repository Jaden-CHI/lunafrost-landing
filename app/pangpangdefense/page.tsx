import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "팡팡 디펜스 | 고객 지원",
  description: "귀여운 동물 블록을 맞춰 외계인을 막는 오프라인 매치3 퍼즐 디펜스 게임, 팡팡 디펜스 고객 지원 페이지",
};

const faqs = [
  {
    q: "게임 기록이 사라졌어요.",
    a: "진행 기록은 기기 안에만 저장됩니다. 앱을 삭제하거나 기기를 바꾸면 기록이 초기화되며 복구할 수 없습니다.",
  },
  {
    q: "튜토리얼을 다시 보고 싶어요.",
    a: "스테이지 선택 화면의 '튜토리얼' 버튼을 누르면 언제든 다시 볼 수 있습니다.",
  },
  {
    q: "소리를 끄고 싶어요.",
    a: "게임 중 왼쪽 위 일시정지 버튼을 누른 뒤 '소리' 버튼으로 켜고 끌 수 있습니다.",
  },
  {
    q: "인터넷 연결이 필요한가요?",
    a: "아니요. 팡팡 디펜스는 인터넷 연결 없이 플레이할 수 있으며, 광고와 결제가 없습니다.",
  },
];

export default function PangPangDefenseSupportPage() {
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
            <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>고객 지원</span>
          </h1>
        </div>
        <div className="pb-4 mb-8" style={{ borderBottom: "3px solid var(--tertiary)" }} />

        <div className="space-y-10" style={{ color: "var(--text-muted)" }}>
          <p className="leading-relaxed">
            귀여운 동물 블록을 맞춰 하늘에서 내려오는 외계인을 막는 퍼즐 디펜스 게임입니다.
            적 바로 옆에서 같은 동물 3개를 맞춰 공격하고, 특수 블록과 아이템으로 10개 스테이지의 성을 지켜 보세요.
          </p>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>Q. {f.q}</h3>
                  <p className="leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              문의하기
            </h2>
            <p className="leading-relaxed">
              버그 제보, 제안, 그 밖의 문의는 이메일로 보내 주세요. 사용 중인 기기 기종과 OS 버전을 함께 적어 주시면 더 빠르게 도와드릴 수 있습니다.
            </p>
            <p className="mt-4">
              <a
                href="mailto:moonyth.contact@gmail.com?subject=%5B%ED%8C%A1%ED%8C%A1%20%EB%94%94%ED%8E%9C%EC%8A%A4%5D%20%EB%AC%B8%EC%9D%98"
                className="transition-colors duration-200"
                style={{ color: "var(--tertiary)" }}
              >
                moonyth.contact@gmail.com
              </a>
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <Link href="/pangpangdefense/privacy" style={{ color: "var(--tertiary)" }}>
              개인정보처리방침 보기 →
            </Link>
          </section>

          <div style={{ borderTop: "1px solid var(--border)", marginTop: "40px", paddingTop: "40px", textAlign: "center", color: "var(--text-muted)", fontSize: "12px" }}>
            <p>🏰 팡팡 디펜스 | 동물 블록 매치3 퍼즐 디펜스</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
