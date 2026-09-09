import matter from "gray-matter";
import { getStudioConfig } from "@/lib/studio-auth";

export interface StudioPost {
  path: string;
  sha: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  cover: string;
  published: boolean;
  content: string;
}

export interface StudioPostInput {
  originalPath?: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  cover: string;
  published: boolean;
  content: string;
  allowSimilar?: boolean;
}

interface GitHubContentItem {
  name: string;
  path: string;
  sha: string;
  type: "file" | "dir";
  content?: string;
  encoding?: string;
}

function encodeRepoPath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function githubRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const { contentToken } = getStudioConfig();
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${contentToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body.slice(0, 300)}`);
  }

  return response.json() as Promise<T>;
}

async function getRepositoryFile(path: string) {
  const { repoOwner, repoName, branch } = getStudioConfig();
  return githubRequest<GitHubContentItem>(
    `/repos/${encodeURIComponent(repoOwner)}/${encodeURIComponent(repoName)}/contents/${encodeRepoPath(path)}?ref=${encodeURIComponent(branch)}`,
  );
}

export async function listStudioPosts(): Promise<StudioPost[]> {
  const { repoOwner, repoName, branch } = getStudioConfig();
  const items = await githubRequest<GitHubContentItem[]>(
    `/repos/${encodeURIComponent(repoOwner)}/${encodeURIComponent(repoName)}/contents/content/blog?ref=${encodeURIComponent(branch)}`,
  );

  const files = items.filter(
    (item) => item.type === "file" && item.name.endsWith(".md"),
  );
  const posts = await Promise.all(
    files.map(async (item) => {
      const file = await getRepositoryFile(item.path);
      const raw = Buffer.from(file.content ?? "", "base64").toString("utf8");
      const { data, content } = matter(raw);
      return {
        path: item.path,
        sha: item.sha,
        title: String(data.title ?? ""),
        slug: String(data.slug ?? item.name.replace(/\.md$/, "")),
        date: data.date ? String(data.date).slice(0, 10) : "",
        category: String(data.category ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        description: String(data.description ?? ""),
        cover: String(data.cover ?? ""),
        published: data.published === true,
        content,
      } satisfies StudioPost;
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function normalizeTitle(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ko")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "");
}

function bigrams(value: string) {
  const normalized = normalizeTitle(value);
  if (normalized.length < 2) return new Set([normalized]);
  return new Set(
    Array.from({ length: normalized.length - 1 }, (_, index) =>
      normalized.slice(index, index + 2),
    ),
  );
}

function titleSimilarity(left: string, right: string) {
  const a = bigrams(left);
  const b = bigrams(right);
  const intersection = [...a].filter((part) => b.has(part)).length;
  return (2 * intersection) / (a.size + b.size || 1);
}

export function findSimilarPosts(
  title: string,
  posts: StudioPost[],
  originalPath?: string,
) {
  return posts
    .filter((post) => post.path !== originalPath)
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      similarity: titleSimilarity(title, post.title),
    }))
    .filter((post) => post.similarity >= 0.78)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);
}

export function makePostPath(date: string, slug: string) {
  const safeDate = date.slice(0, 10);
  const safeSlug = slug
    .normalize("NFKC")
    .trim()
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .toLocaleLowerCase("ko");
  return `content/blog/${safeDate}-${safeSlug}.md`;
}

export function serializePost(input: StudioPostInput) {
  return matter.stringify(input.content.trimEnd() + "\n", {
    title: input.title.trim(),
    slug: input.slug.trim(),
    date: input.date,
    category: input.category.trim(),
    tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
    description: input.description.trim(),
    cover: input.cover.trim(),
    published: input.published,
  });
}

export async function saveRepositoryFile({
  path,
  content,
  sha,
  message,
}: {
  path: string;
  content: string | Buffer;
  sha?: string;
  message: string;
}) {
  const { repoOwner, repoName, branch } = getStudioConfig();
  return githubRequest<{ content: GitHubContentItem; commit: { html_url: string } }>(
    `/repos/${encodeURIComponent(repoOwner)}/${encodeURIComponent(repoName)}/contents/${encodeRepoPath(path)}`,
    {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    },
  );
}
