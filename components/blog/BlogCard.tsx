import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";

const COVER_OVERRIDES: Record<string, string> = {
  'smart-task-snap-to-do-list': '/covers/tasksnap.png',
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const coverSrc = COVER_OVERRIDES[post.slug] ?? post.cover;
  return (
    <Link href={`/blog/${post.slug}`} className="group no-underline">
      <article
        className="rounded-lg overflow-hidden border transition-shadow duration-200 hover:shadow-lg h-full flex flex-col"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {/* Cover image */}
        <div
          className="relative w-full h-48 flex-shrink-0"
          style={{ background: "var(--dark)" }}
        >
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div
            className="flex items-center gap-2 text-xs mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            {post.category && (
              <span
                className="px-2 py-0.5 rounded text-xs border"
                style={{
                  borderColor: "var(--frost-dim)",
                  color: "var(--frost-dim)",
                }}
              >
                {post.category}
              </span>
            )}
            {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          </div>

          <h3
            className="font-[family-name:var(--font-cormorant)] text-xl font-normal mb-2 transition-colors duration-200 group-hover:text-[var(--frost)]"
            style={{ color: "var(--text)" }}
          >
            {post.title}
          </h3>

          <p
            className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
