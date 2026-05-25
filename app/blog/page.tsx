import { getBlogPosts } from "@/lib/notion";
import BlogCard from "@/components/blog/BlogCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import type { BlogPost } from "@/types/blog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI 트렌드, 앱 개발, 콘텐츠 전략에 대한 인사이트",
};

export const revalidate = 3600;

const CATEGORIES = ["전체", "AI Tools", "App Dev", "Content"];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts();
  } catch {
    // Notion not configured yet
  }

  const filtered =
    category && category !== "전체"
      ? posts.filter((p) => p.category === category)
      : posts;

  return (
    <>
      <div
        className="fixed inset-0 z-0"
        style={{ background: "var(--dark)" }}
      />
      <Header />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 py-16">
        <div className="mb-12">
          <h1
            className="font-[family-name:var(--font-inter)] text-5xl font-bold mb-4"
            style={{ color: "var(--text)" }}
          >
            Blog
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구합니다
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "전체" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
              className="text-xs tracking-wider uppercase px-4 py-1.5 rounded-full border no-underline transition-colors duration-200"
              style={{
                borderColor:
                  (category ?? "전체") === cat
                    ? "var(--tertiary)"
                    : "var(--border)",
                color:
                  (category ?? "전체") === cat
                    ? "var(--tertiary)"
                    : "var(--text-muted)",
                background:
                  (category ?? "전체") === cat
                    ? "rgba(0,122,255,0.08)"
                    : "transparent",
              }}
            >
              {cat}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div
            className="text-center py-24"
            style={{ color: "var(--text-muted)" }}
          >
            <p className="text-lg mb-2">아직 게시글이 없습니다.</p>
            <p className="text-sm">Notion 데이터베이스를 연결하면 글이 표시됩니다.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
