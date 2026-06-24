import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostWithContent } from "@/types/blog";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
}

function parsePost(filename: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data } = matter(raw);
    if (!data.published) return null;
    return {
      id: filename.replace(/\.md$/, ""),
      title: data.title ?? "",
      slug: data.slug ?? filename.replace(/\.md$/, ""),
      date: data.date ? String(data.date) : "",
      category: data.category ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      description: data.description ?? "",
      cover: data.cover ?? "",
    };
  } catch { return null; }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  ensurePostsDir();
  return fs.readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parsePost)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPostWithContent> {
  ensurePostsDir();
  for (const filename of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug ?? filename.replace(/\.md$/, "");
    if (fileSlug === slug && data.published) {
      return {
        id: filename.replace(/\.md$/, ""),
        title: data.title ?? "",
        slug: fileSlug,
        date: data.date ? String(data.date) : "",
        category: data.category ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        description: data.description ?? "",
        cover: data.cover ?? "",
        content,
      };
    }
  }
  throw new Error(`Post not found: ${slug}`);
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  return (await getBlogPosts()).filter((p) => p.category === category);
}
