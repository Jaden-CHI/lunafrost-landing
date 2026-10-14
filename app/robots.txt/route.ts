// Replaces ../robots.ts so robots directives and the public Daum comment are emitted exactly.
// Future crawl-rule edits belong in this body; keep the verification comment intact.
const robotsBody = "User-Agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\nDisallow: /api/studio\nDisallow: /api/studio/\n\nHost: https://moonyth.app\nSitemap: https://moonyth.app/sitemap.xml\n#DaumWebMasterTool:cd2a4295eb0c4b81d9660cf1a70b4cc11061758340a1ea177ad70809f1f42d18:98GztZ5EvdKnUPTh2E62HA==\n";

export const dynamic = "force-static";

export function GET() {
  return new Response(robotsBody, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Disposition": 'inline; filename="robots.txt"',
    },
  });
}
