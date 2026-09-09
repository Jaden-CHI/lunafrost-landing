import type { Metadata } from "next";
import Link from "next/link";
import BlogEditor from "@/components/studio/BlogEditor";
import {
  getMissingStudioConfig,
  getStudioConfig,
  getStudioSession,
} from "@/lib/studio-auth";

export const metadata: Metadata = {
  title: "Blog Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function BlogStudioPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ error }, session] = await Promise.all([
    searchParams,
    getStudioSession(),
  ]);
  const missing = getMissingStudioConfig();
  const config = getStudioConfig();

  if (missing.length > 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--secondary)] px-6 py-16 text-[var(--text)]">
        <section className="w-full max-w-2xl border border-[var(--border)] bg-white p-8 md:p-12">
          <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--tertiary)]">BLOG STUDIO · SETUP</p>
          <h1 className="mt-3 text-3xl font-bold">초기 연결이 필요합니다</h1>
          <p className="mt-4 leading-7 text-[var(--text-muted)]">GitHub 로그인과 글 저장에 사용할 환경변수를 Vercel에 등록하면 에디터가 활성화됩니다.</p>
          <div className="mt-7 bg-[var(--surface-low)] p-5 font-[family-name:var(--font-mono)] text-xs leading-7">
            {missing.map((name) => <p key={name}>{name}</p>)}
          </div>
          <p className="mt-6 text-sm leading-6 text-[var(--text-muted)]">OAuth Callback URL은 <strong className="text-[var(--text)]">https://moonyth.app/api/studio/auth/callback</strong>, 허용 계정은 <strong className="text-[var(--text)]">{config.allowedLogin}</strong>입니다.</p>
        </section>
      </main>
    );
  }

  if (!session) {
    const errorMessages: Record<string, string> = {
      oauth: "GitHub 로그인에 실패했습니다. 다시 시도해주세요.",
      forbidden: "이 GitHub 계정에는 Blog Studio 접근 권한이 없습니다.",
      config: "Blog Studio 환경설정을 확인해주세요.",
    };
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--secondary)] px-6 text-[var(--text)]">
        <section className="w-full max-w-md border border-[var(--border)] bg-white p-8 text-center md:p-10">
          <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--tertiary)]">LUNAFROST</p>
          <h1 className="mt-3 text-3xl font-bold">Blog Studio</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">지정된 GitHub 관리자 계정으로 로그인해주세요.</p>
          {error && <p className="mt-5 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessages[error] ?? "로그인할 수 없습니다."}</p>}
          <a href="/api/studio/auth/start" className="mt-7 inline-flex w-full items-center justify-center rounded-md bg-[var(--primary)] px-5 py-3 font-semibold text-white no-underline">GitHub로 로그인</a>
          <Link href="/" className="mt-4 inline-block text-sm text-[var(--text-muted)]">홈으로 돌아가기</Link>
        </section>
      </main>
    );
  }

  return <BlogEditor author={`@${session.login}`} />;
}
