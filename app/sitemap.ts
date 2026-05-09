import { getBlogPosts } from "@/lib/notion";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogUrls: MetadataRoute.Sitemap = [];

  try {
    const posts = await getBlogPosts();
    blogUrls = posts.map((post) => ({
      url: `https://aimoonyth.com/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // Notion not configured yet
  }

  return [
    {
      url: "https://aimoonyth.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://aimoonyth.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://aimoonyth.com/tools",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://aimoonyth.com/apps",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://aimoonyth.com/youtube",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://aimoonyth.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogUrls,
  ];
}
