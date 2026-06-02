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
          className="font-[family-name:var(--font-inter)] text-4xl font-bold mb-4"
          style={{ color: "var(--text)" }}
        >
          Golf Windy 개인정보처리방침
        </h1>
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>
          최종 업데이트: 2026년 6월 3일
        </p>

        <div className="space-y-10" style={{ color: "var(--text-muted)" }}>

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              1. 개요
            </h2>
            <p className="leading-relaxed">
              Golf Windy(이하 "앱")는 골프 라운드 스케줄 관리 및 날씨 정보 제공 서비스입니다. 본 개인정보처리방침은 앱 이용 시 수집되는 개인정보의 처리 방식을 설명합니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              2. 수집하는 정보
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>2.1 필수 정보</h3>
                <ul className="space-y-2 leading-relaxed list-none">
                  <li>• <strong>위치 정보 (GPS):</strong> 라운드 당일 근처 식당 추천을 위한 사용자의 현재 위치</li>
                  <li>• <strong>기기 고유 식별자:</strong> 익명 사용자 추적 및 알림 발송을 위한 Firebase 토큰</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>2.2 선택 정보</h3>
                <ul className="space-y-2 leading-relaxed list-none">
                  <li>• <strong>라운드 일정:</strong> 날짜, 시간, 골프장명, 알림 설정</li>
                  <li>• <strong>알림 권한:</strong> 날씨 변화 알림 수신 동의</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border text-sm" style={{ borderColor: "var(--border)", background: "rgba(200,223,245,0.03)" }}>
                <strong style={{ color: "var(--tertiary)" }}>중요:</strong> 개인정보(이름, 이메일 등)는 수집하지 않습니다.
              </div>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              3. 정보 수집 목적
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• 골프장 날씨 정보 제공</li>
              <li>• 라운드 일정 관리 및 알림 발송</li>
              <li>• 근처 식당 추천 (카카오맵 API 활용)</li>
              <li>• 서비스 개선 및 통계 분석</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              4. 정보 처리 및 보관
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>4.1 저장소</h3>
                <ul className="space-y-2 leading-relaxed list-none">
                  <li>• <strong>사용자 데이터:</strong> Firebase Realtime Database (Google Cloud)</li>
                  <li>• <strong>위치 정보:</strong> 앱 실행 시에만 수집, 저장되지 않음</li>
                  <li>• <strong>알림 토큰:</strong> Firebase Cloud Messaging에서 관리</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>4.2 보유 기간</h3>
                <ul className="space-y-2 leading-relaxed list-none">
                  <li>• 사용자가 앱을 삭제할 때까지</li>
                  <li>• 사용자 요청 시 즉시 삭제 가능</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              5. 제3자 공유
            </h2>
            <p className="leading-relaxed mb-4">
              본 앱은 다음 제3자 서비스를 활용합니다:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="text-left p-2" style={{ color: "var(--text)" }}>서비스</th>
                    <th className="text-left p-2" style={{ color: "var(--text)" }}>목적</th>
                    <th className="text-left p-2" style={{ color: "var(--text)" }}>공유 정보</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="p-2">Google Firebase</td>
                    <td className="p-2">데이터 저장, 알림</td>
                    <td className="p-2">익명 식별자, 일정 데이터</td>
                  </tr>
                  <tr>
                    <td className="p-2">카카오맵 API</td>
                    <td className="p-2">식당 추천</td>
                    <td className="p-2">위치 정보 (좌표)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed mt-4">
              <strong>개인정보(이름, 이메일 등)는 수집하지 않으며 공유하지 않습니다.</strong>
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              6. 사용자 권리
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• <strong>접근권:</strong> 저장된 일정 데이터 조회 가능</li>
              <li>• <strong>수정권:</strong> 앱 내에서 일정 수정 가능</li>
              <li>• <strong>삭제권:</strong> 개별 일정 삭제 또는 앱 삭제 시 전체 데이터 삭제</li>
              <li>• <strong>동의 철회:</strong> 권한 설정에서 위치/알림 권한 언제든 해제 가능</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              7. 보안
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• HTTPS 암호화 통신 사용</li>
              <li>• Firebase 보안 규칙으로 데이터 접근 제한</li>
              <li>• 익명 인증으로 개인정보 최소화</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              8. 연락처
            </h2>
            <p className="leading-relaxed">
              개인정보처리방침 관련 문의:
            </p>
            <p className="mt-4">
              <a
                href="mailto:zeus1249@gmail.com"
                className="transition-colors duration-200"
                style={{ color: "var(--tertiary)" }}
              >
                zeus1249@gmail.com
              </a>
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              9. 방침 변경
            </h2>
            <p className="leading-relaxed">
              본 방침은 예고 없이 변경될 수 있습니다. 변경 시 앱 내 공지합니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section className="p-4 rounded-lg border text-sm" style={{ borderColor: "var(--border)", background: "rgba(200,223,245,0.03)" }}>
            <p style={{ color: "var(--text)" }}>
              본 개인정보처리방침에 동의하시면 앱을 이용하실 수 있습니다.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
