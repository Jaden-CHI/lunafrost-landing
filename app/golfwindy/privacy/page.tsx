import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Windy 개인정보처리방침",
  description: "Golf Windy 개인정보처리방침",
};

export default function GolfWindyPrivacyPolicyPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1
          className="font-[family-name:var(--font-inter)] text-4xl font-bold mb-4 pb-4"
          style={{ color: "var(--text)", borderBottom: "3px solid var(--tertiary)" }}
        >
          ⛳ Golf Windy 개인정보처리방침
        </h1>
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>
          시행일: 2026년 6월
        </p>

        <div className="space-y-10" style={{ color: "var(--text-muted)" }}>

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              1. 수집하는 개인정보
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>필수 정보</h3>
                <ul className="space-y-2 leading-relaxed list-none">
                  <li>• Firebase 인증 정보 (익명 로그인)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>선택 정보</h3>
                <ul className="space-y-2 leading-relaxed list-none">
                  <li>• 위치 정보 (식당 추천, 지도 표시)</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              2. 정보 사용 목적
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• 골프 일정 관리 및 동기화</li>
              <li>• 날씨 정보 제공</li>
              <li>• 근처 식당 추천</li>
              <li>• 알림 기능</li>
              <li>• 앱 성능 개선</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              3. 정보 보유 기간
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• 계정 삭제 시까지 보유</li>
              <li>• 삭제 요청 시 즉시 삭제</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              4. 제3자 제공
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• <strong style={{ color: "var(--text)" }}>Google Firebase</strong> - 데이터 저장, 인증, 실시간 데이터베이스</li>
              <li>• <strong style={{ color: "var(--text)" }}>Kakao Map API</strong> - 식당 정보 제공</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              5. 보안
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• SSL 암호화 통신 사용</li>
              <li>• 개인정보는 안전하게 보호됨</li>
              <li>• 권한 없는 접근 방지</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              6. 위치 정보
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• 위치 정보는 선택 사항입니다</li>
              <li>• 식당 추천 시에만 사용됩니다</li>
              <li>• 앱 설정에서 언제든 비활성화 가능합니다</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              7. 문의
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
            <p>⛳ Golf Windy | 골프 라운드 날씨 가이드</p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
