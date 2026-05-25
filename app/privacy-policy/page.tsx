import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "lunafrost 개인정보처리방침",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1
          className="font-[family-name:var(--font-inter)] text-4xl font-bold mb-4"
          style={{ color: "var(--text)" }}
        >
          개인정보처리방침
        </h1>
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>
          최종 수정일: 2025년 6월 16일
        </p>

        <div className="space-y-10" style={{ color: "var(--text-muted)" }}>

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              제1조 (총칙)
            </h2>
            <p className="leading-relaxed">
              Moonyth(이하 "회사")는 이용자의 개인정보를 매우 중요하게 생각하며, 개인정보 보호 관련 법령을 준수합니다.
              본 방침은 WellDay 모바일 앱 및 moonyth.app 웹사이트에 공통 적용됩니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              제2조 (수집하는 개인정보 항목)
            </h2>
            <div className="space-y-4 leading-relaxed">
              <div>
                <p className="font-medium mb-1" style={{ color: "var(--text)" }}>WellDay 앱</p>
                <p>물 섭취 목표, 약 이름 및 복용 일정, 푸시 알림을 위한 기기 토큰을 수집합니다. 데이터는 기기 내에서만 처리됩니다.</p>
              </div>
              <div>
                <p className="font-medium mb-1" style={{ color: "var(--text)" }}>웹사이트</p>
                <p>분석 및 Google AdSense 광고 제공을 위해 사용자명, 이메일, IP 주소, 쿠키를 수집합니다.</p>
              </div>
              <div>
                <p className="font-medium mb-1" style={{ color: "var(--text)" }}>AlwaysPDF Tools</p>
                <p>서버로의 데이터 전송 없이 모든 처리가 브라우저 내에서만 이루어집니다.</p>
              </div>
              <div>
                <p className="font-medium mb-1" style={{ color: "var(--text)" }}>TaskSnap</p>
                <p>할 일 목록, 우선순위, 완료 상태 등 작업 데이터를 수집합니다. 모든 데이터는 사용자의 기기 로컬 스토리지에만 저장되며 외부 서버로 전송되지 않습니다.</p>
              </div>
              <div className="p-4 rounded-lg border text-sm" style={{ borderColor: "var(--border)", background: "rgba(200,223,245,0.03)" }}>
                <strong style={{ color: "var(--tertiary)" }}>중요 안내:</strong> WellDay 앱의 건강 기록은 이용자의 개인 기기 내에만 안전하게 저장되며 회사 서버로 전송되지 않습니다.
              </div>
            </div>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              제3조 (개인정보 보유 및 이용 기간)
            </h2>
            <ul className="space-y-2 leading-relaxed list-none">
              <li>• 앱 데이터: 삭제 요청 시까지 보관</li>
              <li>• 웹사이트 방문 로그: 3개월 보관</li>
              <li>• 댓글: 삭제 요청 시까지 보관</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p className="leading-relaxed">
              동의 없이 외부에 개인정보를 공유하지 않습니다. 다만 Google Analytics 및 Google AdSense 서비스 운영을 위해 Google이 일부 데이터를 처리할 수 있습니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              제5조 (이용자 권리)
            </h2>
            <p className="leading-relaxed">
              이용자는 앱 설정 또는 이메일 요청을 통해 언제든지 개인정보를 수정하거나 삭제할 수 있습니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              제6조 (쿠키 사용)
            </h2>
            <p className="leading-relaxed">
              웹사이트는 서비스 개선 및 맞춤 광고 제공을 위해 쿠키를 사용합니다. 브라우저 설정을 통해 쿠키 수집을 거부할 수 있으며, 이 경우 일부 서비스 이용이 제한될 수 있습니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              제7조 (개인정보 보호책임자)
            </h2>
            <p className="leading-relaxed">
              개인정보 관련 문의는 아래 이메일로 연락해 주세요.
            </p>
            <p className="mt-3">
              <a
                href="mailto:moonyth.blog@gmail.com"
                className="transition-colors duration-200"
                style={{ color: "var(--tertiary)" }}
              >
                moonyth.blog@gmail.com
              </a>
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--border)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-inter)] text-2xl font-bold mb-4" style={{ color: "var(--tertiary)" }}>
              제8조 (방침 변경)
            </h2>
            <p className="leading-relaxed">
              본 방침은 법령 변경 또는 서비스 변경에 따라 수시로 개정될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
