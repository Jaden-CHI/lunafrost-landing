import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/posts';
import type { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

const COVER_OVERRIDES: Record<string, string> = {
  'smart-task-snap-to-do-list': '/covers/tasksnap.png',
};

function FeaturedArticleCard({ article }: { article: BlogPost }) {
  return (
    <Link href={`/blog/${article.slug}`} className="no-underline block grow-line lg:col-span-3 group">
      <article
        className="border h-full flex flex-col"
        style={{
          borderColor: 'var(--border)',
          background: 'var(--surface)',
          padding: '2.5rem',
        }}
      >
        {/* Thumbnail */}
        <div className="relative w-full mb-6 overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {(COVER_OVERRIDES[article.slug] ?? article.cover) ? (
            <Image
              src={COVER_OVERRIDES[article.slug] ?? article.cover}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="img-ph w-full h-full">FEATURED · THUMBNAIL</div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          {article.category && (
            <span
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 border"
              style={{ borderColor: 'rgba(0,122,255,0.15)', color: 'var(--tertiary)', background: 'rgba(0,122,255,0.08)' }}
            >
              {article.category}
            </span>
          )}
          {article.date && (
            <span className="font-[family-name:var(--font-mono)] text-[10px]" style={{ color: 'var(--text-muted)' }}>
              {formatDate(article.date)}
            </span>
          )}
        </div>

        <h3
          className="font-[family-name:var(--font-inter)] font-bold mb-3 leading-tight group-hover:text-primary transition-colors duration-300"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text)' }}
        >
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm leading-relaxed flex-grow" style={{ color: 'var(--text-muted)' }}>
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
          borderColor: 'var(--border)',
          background: 'var(--surface)',
          padding: '1.75rem',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          {article.category && (
            <span
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 border"
              style={{ borderColor: 'rgba(0,122,255,0.15)', color: 'var(--tertiary)', background: 'rgba(0,122,255,0.08)' }}
            >
              {article.category}
            </span>
          )}
          {article.date && (
            <span className="font-[family-name:var(--font-mono)] text-[10px]" style={{ color: 'var(--text-muted)' }}>
              {formatDate(article.date)}
            </span>
          )}
        </div>

        <h3
          className="font-[family-name:var(--font-inter)] font-bold mb-2 leading-tight group-hover:text-primary transition-colors duration-300"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          {article.title}
        </h3>

        {article.description && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
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
            style={{ color: 'var(--tertiary)' }}
          >
            JOURNAL · 최근 발행
          </span>
          <h2
            className="font-[family-name:var(--font-inter)] font-bold"
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
