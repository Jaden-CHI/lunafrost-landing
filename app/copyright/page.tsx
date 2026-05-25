import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "저작권 정책",
  description: "lunafrost 저작권 정책 (Copyright Policy)",
};

export default function CopyrightPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1
          className="font-[family-name:var(--font-inter)] text-4xl font-bold mb-2"
          style={{ color: "var(--text)" }}
        >
          저작권 정책
        </h1>
        <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
          Copyright Policy
        </p>
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>
          운영자: Moonyth | 사이트: moonyth.app
        </p>

        <div className="space-y-10" style={{ color: "var(--text-muted)" }}>

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              1. 기본 원칙
            </h2>
            <p className="leading-relaxed">
              moonyth.app(이하 "사이트")에 게시된 모든 콘텐츠(글, 이미지, 영상, 코드 등)의 저작권은 운영자 Moonyth 또는 해당 콘텐츠의 원저작자에게 있습니다. 본 저작권 정책은 사이트 내 콘텐츠의 이용 범위와 조건을 규정합니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              2. AI 생성 이미지 저작권
            </h2>
            <div className="space-y-3 leading-relaxed">
              <p>
                본 사이트에는 Midjourney, Adobe Firefly 등 AI 도구로 생성된 이미지가 포함될 수 있습니다. 이에 관한 저작권 정책은 다음과 같습니다.
              </p>
              <ul className="space-y-2">
                <li>• AI 생성 이미지의 저작권은 현행 법령에 따라 운영자에게 귀속되는 것을 원칙으로 합니다.</li>
                <li>• 단, 각 AI 서비스의 이용약관에 따라 저작권 귀속이 달라질 수 있습니다.</li>
                <li>• AI 생성 이미지를 사용할 경우 별도 표기가 없는 한 해당 이미지도 본 저작권 정책의 적용을 받습니다.</li>
              </ul>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              3. 콘텐츠 이용 안내
            </h2>
            <div className="space-y-3 leading-relaxed">
              <p className="font-medium" style={{ color: "var(--text)" }}>허용되는 이용</p>
              <ul className="space-y-2 mb-4">
                <li>• 비상업적 목적의 개인 학습 및 참고</li>
                <li>• 출처(moonyth.app)를 명확히 표기한 경우의 공유 및 인용</li>
                <li>• 교육적 목적의 소량 인용 (단, 출처 표기 필수)</li>
              </ul>
              <p className="font-medium" style={{ color: "var(--text)" }}>제한되는 이용</p>
              <ul className="space-y-2">
                <li>• 상업적 목적의 무단 사용</li>
                <li>• 콘텐츠의 무단 전재 및 복제</li>
                <li>• 원저작자 표기 없는 배포</li>
              </ul>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              4. 금지 행위
            </h2>
            <p className="leading-relaxed mb-3">다음의 행위는 명시적으로 금지됩니다.</p>
            <ul className="space-y-2 leading-relaxed">
              <li>① 운영자의 사전 서면 동의 없이 사이트 콘텐츠를 상업적으로 이용하는 행위</li>
              <li>② 콘텐츠를 변형·편집하여 원작자를 오인하게 만드는 행위</li>
              <li>③ 크롤링, 스크래핑 등의 방법으로 콘텐츠를 대량 수집하는 행위</li>
              <li>④ 사이트 콘텐츠를 AI 학습 데이터로 무단 활용하는 행위</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              5. 문의
            </h2>
            <p className="leading-relaxed mb-3">
              저작권 관련 문의 또는 이용 허가 요청은 아래로 연락해 주세요.
            </p>
            <a
              href="mailto:moonyth.blog@gmail.com"
              className="text-sm no-underline transition-colors duration-200"
              style={{ color: "var(--tertiary)" }}
            >
              → moonyth.blog@gmail.com
            </a>
          </section>

          <div
            className="mt-12 pt-8 border-t text-sm text-center"
            style={{ borderColor: "var(--border)" }}
          >
            본 저작권 정책은 사전 고지 없이 변경될 수 있습니다.
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
