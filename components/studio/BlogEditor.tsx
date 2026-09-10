"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { StudioPost } from "@/lib/studio-github";

const CATEGORIES = ["Tech Trends", "AI Tools", "App Dev", "Content"];

type EditorForm = Omit<StudioPost, "path" | "sha" | "tags"> & {
  originalPath?: string;
  tags: string;
};

const today = new Date().toISOString().slice(0, 10);

const EMPTY_FORM: EditorForm = {
  title: "",
  slug: "",
  date: today,
  category: "Tech Trends",
  tags: "",
  description: "",
  cover: "",
  published: false,
  content: "",
};

function slugify(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ko")
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BlogEditor({ author }: { author: string }) {
  const [posts, setPosts] = useState<StudioPost[]>([]);
  const [form, setForm] = useState<EditorForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [similar, setSimilar] = useState<Array<{ title: string; slug: string }>>([]);
  const [allowSimilar, setAllowSimilar] = useState(false);
  const [preview, setPreview] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);

  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/studio/posts", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setPosts(data.posts);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "글을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    fetch("/api/studio/posts", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data.posts as StudioPost[];
      })
      .then((loadedPosts) => {
        if (active) setPosts(loadedPosts);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "글을 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const selectedPath = form.originalPath;
  const publishedCount = posts.filter((post) => post.published).length;

  function startNewPost() {
    setForm({ ...EMPTY_FORM, date: new Date().toISOString().slice(0, 10) });
    setSlugEdited(false);
    setMessage("");
    setError("");
    setSimilar([]);
    setAllowSimilar(false);
    setConfirmDelete(false);
  }

  function selectPost(post: StudioPost) {
    setForm({
      originalPath: post.path,
      title: post.title,
      slug: post.slug,
      date: post.date,
      category: post.category || "Tech Trends",
      tags: post.tags.join(", "),
      description: post.description,
      cover: post.cover,
      published: post.published,
      content: post.content,
    });
    setSlugEdited(true);
    setMessage("");
    setError("");
    setSimilar([]);
    setAllowSimilar(false);
    setConfirmDelete(false);
  }

  function update<K extends keyof EditorForm>(key: K, value: EditorForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
    if (key !== "published") {
      setSimilar([]);
      setAllowSimilar(false);
    }
  }

  async function save(published: boolean) {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/studio/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          published,
          tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
          allowSimilar,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.requiresConfirmation) {
          setSimilar(data.similar ?? []);
          setAllowSimilar(true);
        }
        throw new Error(data.error);
      }
      setMessage(data.message);
      setForm((current) => ({ ...current, published, originalPath: data.path }));
      setAllowSimilar(false);
      setSimilar([]);
      await loadPosts();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "글을 저장하지 못했습니다.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadCover(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    const body = new FormData();
    body.set("file", file);
    try {
      const response = await fetch("/api/studio/upload", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      update("cover", data.path);
      setMessage("대표 이미지가 GitHub에 업로드되었습니다.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "업로드하지 못했습니다.");
    } finally {
      setUploading(false);
    }
  }

  async function deletePost() {
    if (!form.originalPath) return;
    setDeleting(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/studio/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: form.originalPath }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      startNewPost();
      setMessage(data.message);
      await loadPosts();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "글을 삭제하지 못했습니다.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--secondary)] text-[var(--text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-baseline gap-3">
            <Link href="/" className="text-lg font-bold no-underline text-[var(--primary)]">lunafrost</Link>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] text-[var(--text-muted)]">BLOG STUDIO</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
            <span className="hidden sm:inline">{author}</span>
            <form action="/api/studio/auth/logout" method="post">
              <button className="rounded-md border border-[var(--border)] px-3 py-1.5 font-medium hover:border-[var(--primary)]">로그아웃</button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-[var(--border)] bg-white lg:min-h-[calc(100vh-64px)] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
            <div>
              <p className="text-sm font-semibold">글 목록</p>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">공개 {publishedCount} · 전체 {posts.length}</p>
            </div>
            <button onClick={startNewPost} className="rounded-md bg-[var(--primary)] px-3 py-2 text-xs font-semibold text-white">새 글</button>
          </div>
          <div className="max-h-72 overflow-y-auto lg:max-h-[calc(100vh-145px)]">
            {loading ? (
              <p className="p-5 text-sm text-[var(--text-muted)]">불러오는 중...</p>
            ) : posts.map((post) => (
              <button
                key={post.path}
                onClick={() => selectPost(post)}
                className={`block w-full border-b border-[var(--border)] px-4 py-3 text-left transition-colors hover:bg-[var(--surface-low)] ${selectedPath === post.path ? "bg-[rgba(0,122,255,0.07)]" : ""}`}
              >
                <span className="mb-1 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  <span className={`h-1.5 w-1.5 rounded-full ${post.published ? "bg-[var(--good)]" : "bg-[var(--warn)]"}`} />
                  {post.published ? "공개" : "임시저장"} · {post.date}
                </span>
                <span className="line-clamp-2 text-sm font-semibold leading-snug">{post.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="min-w-0 p-5 lg:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] text-[var(--tertiary)]">{form.originalPath ? "EDIT POST" : "NEW POST"}</p>
              <h1 className="mt-1 text-2xl font-bold">{form.originalPath ? "글 수정" : "새 글 작성"}</h1>
            </div>
            <div className="flex items-center gap-2">
              {form.originalPath && (
                confirmDelete ? (
                  <>
                    <button
                      disabled={deleting || saving}
                      onClick={() => setConfirmDelete(false)}
                      className="rounded-md border border-[var(--border)] px-3 py-2.5 text-sm font-semibold disabled:opacity-50"
                    >
                      취소
                    </button>
                    <button
                      disabled={deleting || saving}
                      onClick={() => void deletePost()}
                      className="rounded-md bg-[var(--bad)] px-3 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      {deleting ? "삭제 중..." : "정말 삭제"}
                    </button>
                  </>
                ) : (
                  <button
                    disabled={saving}
                    onClick={() => setConfirmDelete(true)}
                    className="rounded-md border border-[var(--bad)] px-3 py-2.5 text-sm font-semibold text-[var(--bad)] disabled:opacity-50"
                  >
                    삭제
                  </button>
                )
              )}
              {form.published && form.slug && (
                <Link href={`/blog/${form.slug}`} target="_blank" className="rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-semibold no-underline">게시글 보기</Link>
              )}
              <button disabled={saving || deleting} onClick={() => save(false)} className="rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-semibold disabled:opacity-50">임시저장</button>
              <button disabled={saving || deleting} onClick={() => save(true)} className="rounded-md bg-[var(--tertiary)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{saving ? "저장 중..." : "발행"}</button>
            </div>
          </div>

          {(message || error) && (
            <div className={`mb-5 border-l-4 px-4 py-3 text-sm ${error ? "border-[var(--bad)] bg-red-50 text-red-700" : "border-[var(--good)] bg-green-50 text-green-800"}`}>
              {error || message}
              {similar.length > 0 && (
                <div className="mt-2">
                  {similar.map((post) => <p key={post.slug}>· {post.title}</p>)}
                  <p className="mt-2 font-semibold">중복이 아니라면 같은 저장 버튼을 한 번 더 누르세요.</p>
                </div>
              )}
            </div>
          )}

          <div className="grid gap-5 border-y border-[var(--border)] bg-white p-5 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="studio-label">제목</span>
              <input
                value={form.title}
                onChange={(event) => {
                  update("title", event.target.value);
                  if (!slugEdited) update("slug", slugify(event.target.value));
                }}
                className="studio-input text-lg font-semibold"
                placeholder="글 제목"
              />
            </label>
            <label>
              <span className="studio-label">슬러그</span>
              <input value={form.slug} onChange={(event) => { setSlugEdited(true); update("slug", slugify(event.target.value)); }} className="studio-input" placeholder="post-url" />
            </label>
            <label>
              <span className="studio-label">공개일</span>
              <input type="date" value={form.date} onChange={(event) => update("date", event.target.value)} className="studio-input" />
            </label>
            <label>
              <span className="studio-label">카테고리</span>
              <select value={form.category} onChange={(event) => update("category", event.target.value)} className="studio-input">
                {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label>
              <span className="studio-label">태그 · 쉼표로 구분</span>
              <input value={form.tags} onChange={(event) => update("tags", event.target.value)} className="studio-input" placeholder="AI, 생산성, 리뷰" />
            </label>
            <label className="md:col-span-2">
              <span className="studio-label">요약</span>
              <textarea value={form.description} onChange={(event) => update("description", event.target.value)} className="studio-input min-h-20 resize-y" placeholder="목록과 검색 결과에 표시할 두세 문장" />
            </label>
            <div className="md:col-span-2">
              <span className="studio-label">대표 이미지</span>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input value={form.cover} onChange={(event) => update("cover", event.target.value)} className="studio-input flex-1" placeholder="/covers/example.png 또는 https://..." />
                <label className="cursor-pointer rounded-md border border-[var(--border)] px-4 py-2.5 text-center text-sm font-semibold hover:border-[var(--primary)]">
                  {uploading ? "업로드 중..." : "이미지 업로드"}
                  <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" disabled={uploading} onChange={(event) => void uploadCover(event.target.files?.[0])} />
                </label>
              </div>
              <p className="mt-1.5 text-xs text-[var(--text-muted)]">JPG, PNG, WebP, GIF · 최대 5MB</p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden border border-[var(--border)] bg-white">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
              <span className="studio-label mb-0">본문 · Markdown</span>
              <div className="flex rounded-md bg-[var(--surface-low)] p-1 text-xs font-semibold">
                <button onClick={() => setPreview(false)} className={`rounded px-3 py-1.5 ${!preview ? "bg-white shadow-sm" : "text-[var(--text-muted)]"}`}>작성</button>
                <button onClick={() => setPreview(true)} className={`rounded px-3 py-1.5 ${preview ? "bg-white shadow-sm" : "text-[var(--text-muted)]"}`}>미리보기</button>
              </div>
            </div>
            {preview ? (
              <article className="prose min-h-[520px] max-w-none p-6 lg:p-10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content || "미리 볼 본문이 없습니다."}</ReactMarkdown>
              </article>
            ) : (
              <textarea
                value={form.content}
                onChange={(event) => update("content", event.target.value)}
                className="min-h-[520px] w-full resize-y border-0 bg-white p-5 font-[family-name:var(--font-mono)] text-[14px] leading-7 outline-none lg:p-8"
                placeholder={"## 소제목\n\n본문을 Markdown으로 작성하세요."}
                spellCheck="false"
              />
            )}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">발행하면 GitHub 커밋과 Vercel 배포가 자동으로 시작됩니다. 실제 사이트 반영까지 보통 1~3분 정도 걸립니다.</p>
        </section>
      </main>
    </div>
  );
}
