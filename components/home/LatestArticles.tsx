import Link from 'next/link';
import { getBlogPosts } from '@/lib/notion';
import type { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

function FeaturedArticleCard({ article }: { article: BlogPost }) {
  return (
    <Link href={`/blog/${article.slug}`} className="no-underline block grow-line lg:col-span-3 group">
      <article
        className="border h-full flex flex-col"
        style={{
          borderColor: 'rgba(66,71,77,0.2)',
          background: 'rgba(24,28,34,0.4)',
          padding: '2.5rem',
        }}
      >
        {/* Thumbnail placeholder */}
        <div className="img-ph w-full mb-6" style={{ aspectRatio: '16/9' }}>
          FEATURED · THUMBNAIL
        </div>

        <div className="flex items-center gap-4 mb-4">
          {article.category && (
            <span
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 border"
              style={{ borderColor: 'rgba(170,212,249,0.2)', color: 'rgba(170,212,249,0.7)', background: 'rgba(170,212,249,0.05)' }}
            >
              {article.category}
            </span>
          )}
          {article.date && (
            <span className="font-[family-name:var(--font-mono)] text-[10px]" style={{ color: 'rgba(194,199,206,0.4)' }}>
              {formatDate(article.date)}
            </span>
          )}
        </div>

        <h3
          className="font-[family-name:var(--font-cormorant)] italic mb-3 leading-tight group-hover:text-primary transition-colors duration-300"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text)' }}
        >
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(194,199,206,0.7)' }}>
            {article.description}
          </p>
        )}
      </article>
    </Link>
  );
}

function RecentArticleCard({ article }: { article: BlogPost }) {
  return (
    <Link href={`/blog/${article.slug}`} className="no-underline block grow-line group">
      <article
        className="border flex flex-col"
        style={{
          borderColor: 'rgba(66,71,77,0.2)',
          background: 'rgba(24,28,34,0.4)',
          padding: '1.75rem',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          {article.category && (
            <span
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 border"
              style={{ borderColor: 'rgba(170,212,249,0.2)', color: 'rgba(170,212,249,0.7)', background: 'rgba(170,212,249,0.05)' }}
            >
              {article.category}
            </span>
          )}
          {article.date && (
            <span className="font-[family-name:var(--font-mono)] text-[10px]" style={{ color: 'rgba(194,199,206,0.4)' }}>
              {formatDate(article.date)}
            </span>
          )}
        </div>

        <h3
          className="font-[family-name:var(--font-cormorant)] italic mb-2 leading-tight group-hover:text-primary transition-colors duration-300"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          {article.title}
        </h3>

        {article.description && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(194,199,206,0.6)' }}>
            {article.description}
          </p>
        )}
      </article>
    </Link>
  );
}

export default async function LatestArticles() {
  let articles: BlogPost[] = [];
  try {
    articles = await getBlogPosts();
  } catch {
    // Notion 연동 실패 시 섹션 숨김
  }

  if (articles.length === 0) return null;

  const featured = articles[0];
  const recent = articles.slice(1, 3);

  return (
    <section id="blog" className="py-32 px-5 md:px-16 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-3">
          <span
            className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase"
            style={{ color: 'rgba(170,212,249,0.6)' }}
          >
            JOURNAL · 최근 발행
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] italic font-normal"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text)' }}
          >
            이번 호의 글.
          </h2>
        </div>
        <Link
          href="/blog"
          className="no-underline cta-secondary font-[family-name:var(--font-mono)] uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.1em' }}
        >
          모든 글 보기 →
        </Link>
      </div>

      {/* Mosaic: featured 3col + recent 2col */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <FeaturedArticleCard article={featured} />
        </div>
        {recent.length > 0 && (
          <div className="lg:col-span-2 flex flex-col gap-4">
            {recent.map(a => <RecentArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </div>
    </section>
  );
}
