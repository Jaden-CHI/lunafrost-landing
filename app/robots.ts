import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/studio", "/api/studio/"],
    },
    sitemap: "https://moonyth.app/sitemap.xml",
    host: "https://moonyth.app",
  };
}
