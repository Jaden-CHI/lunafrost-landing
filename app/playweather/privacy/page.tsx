import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PlayWeather 개인정보처리방침",
  description: "PlayWeather 개인정보처리방침",
};

export default function PlayWeatherPrivacyPolicyPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1
          className="font-[family-name:var(--font-inter)] text-4xl font-bold mb-4"
          style={{ color: "var(--text)" }}
        >
          PlayWeather 개인정보처리방침
        </h1>
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>
          최종 수정일: 2026년 5월 30일
        </p>

        <div className="space-y-10" style={{ color: "var(--text-muted)" }}>

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              1. 개인정보 수집 및 이용
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>수집하는 정보</h3>
                <p className="leading-relaxed">
                  PlayWeather(이하 "앱")는 다음의 정보를 수집합니다:
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>1.1 위치 정보</h4>
                <ul className="space-y-1 leading-relaxed list-none">
                  <li>• <strong>목적:</strong> 골프장·추자도 근처 날씨 정보 제공, 실시간 알림</li>
                  <li>• <strong>수집 방식:</strong> 기기의 GPS, 네트워크 기반 위치 인식</li>
                  <li>• <strong>저장 범위:</strong> 정확한 좌표(위도/경도)로 저장</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>1.2 Firebase 인증 정보</h4>
                <ul className="space-y-1 leading-relaxed list-none">
                  <li>• <strong>목적:</strong> 사용자 계정 생성 및 관리, 기기 간 데이터 동기화</li>
                  <li>• <strong>수집 정보:</strong> 이메일, 인증 토큰, 기기 ID</li>
                  <li>• <strong>보관 기간:</strong> 계정 삭제 시까지</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>1.3 사용 정보</h4>
                <ul className="space-y-1 leading-relaxed list-none">
                  <li>• <strong>골프·라운드 일정:</strong> 골프장명, 라운드명, 예약 날짜/시간, 위치 좌표</li>
                  <li>• <strong>저장 위치:</strong> Firebase Realtime Database에 암호화되어 저장</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border text-sm" style={{ borderColor: "var(--border)", background: "rgba(200,223,245,0.03)" }}>
                <strong style={{ color: "var(--tertiary)" }}>수집하지 않는 정보:</strong> 연락처, 통화 기록, 메시지, 카메라/마이크 접근, 기기 저장 파일 접근
              </div>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              2. 정보 저장 및 보호
            </h2>
            <div className="space-y-4 leading-relaxed">
              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>저장 위치</h4>
                <ul className="space-y-1 list-none">
                  <li>• <strong>로컬 저장소:</strong> 일시 캐시, 사용자 설정</li>
                  <li>• <strong>클라우드:</strong> Firebase (Google Cloud 기반)</li>
                  <li>• <strong>서버 위치:</strong> 글로벌 분산 서버</li>
                  <li>• <strong>암호화:</strong> TLS 1.3 전송 암호화</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>데이터 보안</h4>
                <ul className="space-y-1 list-none">
                  <li>• 사용자별 고유 ID 기반 데이터 격리</li>
                  <li>• 다른 사용자의 데이터 접근 불가</li>
                  <li>• HTTPS 통신만 사용</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              3. 정보 제3자 공유
            </h2>
            <p className="leading-relaxed">
              PlayWeather는 다음의 경우를 제외하고 개인정보를 제3자에 공유하지 않습니다:
            </p>
            <ul className="space-y-2 leading-relaxed list-none mt-4">
              <li>• <strong>법적 요청:</strong> 법원 명령 또는 법적 의무로 인한 요청</li>
              <li>• <strong>서비스 제공자:</strong>
                <ul className="space-y-1 list-none mt-2 ml-4">
                  <li>- Google Firebase (데이터 저장, 사용자 인증)</li>
                  <li>- Apple App Store (배포 및 분석)</li>
                  <li>- Google Play Store (배포 및 분석)</li>
                </ul>
              </li>
            </ul>
            <p className="leading-relaxed mt-4">
              이들은 자신의 개인정보 처리방침을 따릅니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              4. 사용자 권리
            </h2>
            <p className="leading-relaxed mb-4">
              사용자는 다음의 권리가 있습니다:
            </p>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• <strong>접근:</strong> 저장된 본인 정보 확인 권리</li>
              <li>• <strong>수정:</strong> 잘못된 정보 수정 권리</li>
              <li>• <strong>삭제:</strong> 계정 삭제 시 모든 개인정보 삭제 요청 권리</li>
              <li>• <strong>거부:</strong> 선택 권한 허용 (단, 필수 권한 거부 시 서비스 이용 불가)</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              5. 권한 및 알림
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>iOS (Info.plist에 명시)</h4>
                <ul className="space-y-1 leading-relaxed list-none">
                  <li>• <strong>위치 접근 - 항시:</strong> 앱이 비활성화되었을 때도 위치 데이터 수집</li>
                  <li>• <strong>위치 접근 - 앱 사용 중:</strong> 앱 내에서만 위치 기반 날씨 조회</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>Android (AndroidManifest.xml에 명시)</h4>
                <ul className="space-y-1 leading-relaxed list-none">
                  <li>• <strong>정확한 위치:</strong> 골프장·추자도 정확한 위치 기반 날씨</li>
                  <li>• <strong>대략적인 위치:</strong> 위치 접근 불가 시 전체 지역 날씨</li>
                  <li>• <strong>알림 허용:</strong> 날씨 알림, 일정 알림</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              6. 변경 사항
            </h2>
            <p className="leading-relaxed">
              본 방침이 변경될 경우:
            </p>
            <ul className="space-y-2 leading-relaxed list-none mt-4">
              <li>• 앱 내 공지 또는 이메일로 30일 전 고지</li>
              <li>• 중요한 변경의 경우 명시적 동의 요청</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              7. 문의
            </h2>
            <p className="leading-relaxed">
              PlayWeather 관련 개인정보 처리에 관한 문의:
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
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
              응답 시간: 평일 기준 3일 이내
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              8. 외부 서비스 개인정보 처리방침
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--tertiary)" }}>Google Firebase 개인정보 처리방침</a></li>
              <li>• <a href="https://www.apple.com/kr/privacy/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--tertiary)" }}>Apple 개인정보 보호</a></li>
              <li>• <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--tertiary)" }}>Google Play 개인정보 보호</a></li>
            </ul>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
