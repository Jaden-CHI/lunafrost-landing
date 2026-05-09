import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 이용약관",
  description: "lunafrost 서비스 이용약관",
};

export default function TermsPage() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1
          className="font-[family-name:var(--font-cormorant)] text-4xl font-light mb-2"
          style={{ color: "var(--text)" }}
        >
          서비스 이용약관
        </h1>
        <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
          시행일: 2025년 1월 1일
        </p>
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>
          운영자: Moonyth | 사이트: moonyth.app
        </p>

        <div className="space-y-10" style={{ color: "var(--text-muted)" }}>

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제1조 (목적)
            </h2>
            <p className="leading-relaxed">
              본 약관은 moonyth.app(이하 "사이트")이 제공하는 AI 트렌드, 정보 콘텐츠 및 관련 서비스(이하 "서비스")의 이용 조건 및 절차, 이용자와 운영자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제2조 (정의)
            </h2>
            <ul className="space-y-2 leading-relaxed">
              <li>① "사이트"란 moonyth.app을 통해 운영자가 제공하는 웹사이트를 말합니다.</li>
              <li>② "이용자"란 본 사이트에 접속하여 서비스를 이용하는 모든 방문자를 말합니다.</li>
              <li>③ "콘텐츠"란 사이트 내에 게시된 글, 이미지, 동영상, 자료 등 일체의 정보를 말합니다.</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제3조 (약관의 효력 및 변경)
            </h2>
            <ul className="space-y-2 leading-relaxed">
              <li>① 본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다.</li>
              <li>② 운영자는 관련 법령을 위반하지 않는 범위 내에서 약관을 개정할 수 있으며, 변경 시 사이트를 통해 공지합니다.</li>
              <li>③ 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제4조 (서비스 이용)
            </h2>
            <ul className="space-y-2 leading-relaxed">
              <li>① 사이트는 AI, 기술, 생산성 관련 정보 콘텐츠를 제공합니다.</li>
              <li>② 서비스는 Google 계정을 통한 OAuth 로그인 방식을 일부 기능에 활용할 수 있습니다.</li>
              <li>③ 운영자는 서비스의 내용, 운영 방식 등을 사전 고지 후 변경할 수 있습니다.</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제5조 (이용자의 의무)
            </h2>
            <p className="leading-relaxed mb-3">이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="space-y-2 leading-relaxed">
              <li>① 허위 정보 등록 및 타인 정보 도용</li>
              <li>② 사이트의 운영을 방해하는 행위</li>
              <li>③ 콘텐츠를 무단 복제·배포·상업적으로 이용하는 행위</li>
              <li>④ 관련 법령에 위반되는 모든 행위</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제6조 (저작권 및 콘텐츠 이용)
            </h2>
            <ul className="space-y-2 leading-relaxed">
              <li>① 사이트에 게시된 모든 콘텐츠의 저작권은 운영자 또는 원저작자에게 있습니다.</li>
              <li>② 이용자는 사이트 콘텐츠를 출처 표기 시 비상업적 목적으로 공유할 수 있습니다.</li>
              <li>③ 상업적 이용은 운영자의 사전 서면 동의가 필요합니다.</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제7조 (개인정보 보호)
            </h2>
            <p className="leading-relaxed mb-3">
              이용자의 개인정보는 별도의 개인정보처리방침에 따라 보호됩니다.
            </p>
            <Link
              href="/privacy-policy"
              className="text-sm no-underline transition-colors duration-200"
              style={{ color: "var(--frost-dim)" }}
            >
              → 개인정보처리방침 보기
            </Link>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제8조 (면책조항)
            </h2>
            <ul className="space-y-2 leading-relaxed">
              <li>① 운영자는 천재지변, 서비스 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.</li>
              <li>② 사이트에 게시된 정보의 정확성, 완전성에 대해 법적 보증을 하지 않습니다.</li>
              <li>③ 이용자가 게시한 정보로 인한 손해는 이용자 본인에게 책임이 있습니다.</li>
            </ul>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제9조 (분쟁 해결)
            </h2>
            <p className="leading-relaxed">
              본 약관과 관련한 분쟁은 대한민국 법령에 따르며, 관할 법원은 민사소송법에 따릅니다.
            </p>
          </section>

          <div className="w-10 h-px opacity-30" style={{ background: "var(--frost-dim)" }} />

          <section>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-normal mb-4" style={{ color: "var(--frost)" }}>
              제10조 (문의)
            </h2>
            <p className="leading-relaxed mb-3">
              서비스 이용 관련 문의사항은 아래로 연락주시기 바랍니다.
            </p>
            <a
              href="mailto:moonyth.blog@gmail.com"
              className="text-sm no-underline transition-colors duration-200"
              style={{ color: "var(--frost-dim)" }}
            >
              → moonyth.blog@gmail.com
            </a>
          </section>

          <div
            className="mt-12 pt-8 border-t text-sm text-center"
            style={{ borderColor: "var(--border)" }}
          >
            본 약관은 2025년 1월 1일부터 시행됩니다.
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
