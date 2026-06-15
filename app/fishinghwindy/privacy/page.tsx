import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fishing Windy 개인정보처리방침",
  description: "Fishing Windy 개인정보처리방침",
};

export default function FishingWindyPrivacyPolicyPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/fishinghwindy-icon.png"
            alt="Fishing Windy"
            width={64}
            height={64}
            className="rounded-lg"
          />
          <h1
            className="font-[family-name:var(--font-inter)] text-4xl font-bold"
            style={{ color: "var(--text)" }}
          >
            Fishing Windy<br />
            <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>개인정보처리방침</span>
          </h1>
        </div>
        <div className="pb-4 mb-8" style={{ borderBottom: "3px solid var(--tertiary)" }} />
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
                  <li>• 위치 정보 (GPS) - 낚시 포인트별 날씨, 조류, 파도 정보 제공</li>
                  <li>• 기기 고유 식별자 - 익명 사용자 추적 및 알림 발송</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>선택 정보</h3>
                <ul className="space-y-2 leading-relaxed list-none">
                  <li>• 출조 일지 - 날짜, 시간, 위치, 조과 기록</li>
                  <li>• SOS 정보 - 응급 상황 시 위치 공유 및 긴급 연락처</li>
                  <li>• 알림 권한 - 기상특보, 조황 정보 알림 수신 동의</li>
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
              <li>• 낚시 포인트별 날씨, 조류, 파도 정보 제공</li>
              <li>• 출조 일지 저장 및 조황 통계 분석</li>
              <li>• 기상특보, 금어기, 안전 정보 알림</li>
              <li>• SOS 및 위치 공유를 통한 안전 지원</li>
              <li>• 공식 어황 데이터 기반 조황 예측</li>
              <li>• 앱 성능 개선 및 사용자 경험 향상</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              3. 정보 보유 기간
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• 출조 일지 및 기록 - 계정 삭제 시까지 보유</li>
              <li>• 위치 정보 - 앱 실행 시에만 수집, 저장되지 않음</li>
              <li>• 사용자 요청 시 즉시 삭제 가능</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              4. 제3자 공유
            </h2>
            <p className="leading-relaxed mb-4">
              본 앱은 다음 제3자 서비스를 활용합니다:
            </p>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• <strong style={{ color: "var(--text)" }}>기상청 API</strong> - 기상 데이터 제공</li>
              <li>• <strong style={{ color: "var(--text)" }}>해양수산부 API</strong> - 조황 데이터 제공</li>
              <li>• <strong style={{ color: "var(--text)" }}>Google Maps API</strong> - 낚시 포인트 지도 표시</li>
              <li>• <strong style={{ color: "var(--text)" }}>Apple App Store / Google Play</strong> - 앱 배포 및 분석</li>
            </ul>
            <p className="leading-relaxed mt-4">
              <strong>개인정보(이름, 이메일 등)는 수집하지 않으며 공유하지 않습니다.</strong>
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              5. 보안
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• HTTPS 암호화 통신 사용</li>
              <li>• 로컬 저장소에서 민감한 정보 암호화</li>
              <li>• 익명 인증으로 개인정보 최소화</li>
              <li>• 정기적 보안 감사 및 업데이트</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              6. 위치 정보
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• 위치 정보는 선택 사항입니다</li>
              <li>• 정확한 포인트 기반 날씨 정보 제공에만 사용됩니다</li>
              <li>• 앱 설정에서 언제든 위치 권한을 해제할 수 있습니다</li>
              <li>• SOS 기능 사용 시만 위치가 임시 저장됩니다</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              7. 사용자 권리
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• <strong style={{ color: "var(--text)" }}>접근권:</strong> 저장된 출조 일지 및 기록 조회</li>
              <li>• <strong style={{ color: "var(--text)" }}>수정권:</strong> 앱 내에서 기록 수정 가능</li>
              <li>• <strong style={{ color: "var(--text)" }}>삭제권:</strong> 개별 기록 삭제 또는 계정 삭제 시 전체 데이터 삭제</li>
              <li>• <strong style={{ color: "var(--text)" }}>거부권:</strong> 권한 설정에서 위치/알림 권한 언제든 해제 가능</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              8. 문의
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
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
              응답 시간: 평일 기준 3일 이내
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-6" style={{ color: "var(--tertiary)", marginTop: "30px" }}>
              9. 방침 변경
            </h2>
            <p className="leading-relaxed">
              본 방침은 예고 없이 변경될 수 있습니다. 주요 변경 시 앱 내 공지합니다.
            </p>
          </section>

          <div style={{ borderTop: "1px solid var(--border)", marginTop: "40px", paddingTop: "40px", textAlign: "center", color: "var(--text-muted)", fontSize: "12px" }}>
            <p>🎣 Fishing Windy | 낚시 포인트 날씨, 조황 가이드</p>
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
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            >
              <p className="font-medium" style={{ color: "var(--text)" }}>lunafrost</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>기본 개인정보처리방침</p>
            </Link>
            <Link
              href="/golfwindy/privacy"
              className="p-4 rounded-lg border no-underline transition-all duration-200 hover:bg-opacity-5 hover:border-tertiary"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            >
              <p className="font-medium" style={{ color: "var(--text)" }}>⛳ Golf Windy</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>골프 날씨 가이드</p>
            </Link>
            <Link
              href="/fishinghwindy/privacy"
              className="p-4 rounded-lg border no-underline"
              style={{
                borderColor: "var(--tertiary)",
                background: "rgba(0,122,255,0.05)",
                color: "var(--text)",
              }}
            >
              <p className="font-medium" style={{ color: "var(--tertiary)" }}>🎣 Fishing Windy</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>낚시 포인트 가이드</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
