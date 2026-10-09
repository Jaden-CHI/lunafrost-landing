import { getBlogPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogUrls: MetadataRoute.Sitemap = [];

  try {
    const posts = await getBlogPosts();
    blogUrls = posts.map((post) => ({
      url: `https://moonyth.app/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    console.error("Failed to load blog sitemap");
  }

  return [
    {
      url: "https://moonyth.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://moonyth.app/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://moonyth.app/tools",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://moonyth.app/apps",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://moonyth.app/youtube",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://moonyth.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://moonyth.app/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://moonyth.app/copyright",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://moonyth.app/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://moonyth.app/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://moonyth.app/tools/image-rescaler",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://moonyth.app/pangpangdefense",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://moonyth.app/pangpangdefense/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://moonyth.app/fishinghwindy/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://moonyth.app/golfwindy/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...blogUrls,
  ];
}
