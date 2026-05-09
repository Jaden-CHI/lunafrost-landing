import { getBlogPost, getBlogPosts } from "@/lib/notion";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/blog/ShareButtons";
import Image from "next/image";
import { formatDate, estimateReadingTime } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.cover ? [post.cover] : [],
        type: "article",
        publishedTime: post.date,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "var(--dark)" }} />
      <Header />

      <main className="relative z-10 flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-4 text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              {post.category && (
                <span
                  className="px-3 py-1 rounded-full text-xs border"
                  style={{ borderColor: "var(--frost-dim)", color: "var(--frost-dim)" }}
                >
                  {post.category}
                </span>
              )}
              {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
              <span>{estimateReadingTime(post.content)} 읽기</span>
            </div>

            <h1
              className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light mb-4 leading-tight"
              style={{ color: "var(--text)" }}
            >
              {post.title}
            </h1>

            {post.description && (
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {post.description}
              </p>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-sm" style={{ color: "var(--text-muted)" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover image */}
          {post.cover && (
            <div className="relative w-full h-80 mb-10 rounded-lg overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
        </article>
      </main>

      <Footer />
    </>
  );
}
