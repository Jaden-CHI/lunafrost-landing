# Blog Publishing

The website reads Markdown in `content/blog/`. It does not read Notion. Only boolean `published: true` posts are visible. Images belong under `public/images/posts/SLUG/`.

## Daily Publishing

- `.github/workflows/auto-blog.yml`: daily at 09:00 Asia/Seoul (00:00 UTC). GitHub schedules can start late.
- Text research/writing uses the existing Anthropic repository secret and can incur charges. Images require no API keys or generation.
- Research requires at least two official search results. A human still verifies factual claims, commands, source relevance and stock-image suitability.
- The user approved automatic public publishing on 2026-10-06. Scheduled runs write `published: true` and `automated: true`, validate content, build the site and push to main without a review PR. Vercel then deploys.
- The repository and PRs are public, including pre-merge drafts. Do not submit confidential content.
- Only one automated post per KST calendar day is allowed. Reruns skip if that day's automated article is already on main. Manual articles and unpublished drafts do not occupy this slot.
- Scheduled jobs run only on main with contents-write permission. Open manual review PRs no longer block scheduled publication.
- Check Actions logs after each failure; recovery artifacts expire after seven days. Failed generation, validation or build prevents the publication push. Automated checks cannot guarantee factual accuracy; review published content as needed.
- Manual workflow runs can set `dry_run: true` to test configuration and build without generating or publishing another article.

## Manual Drafts and Migration

The separate local `../blog-agent` project owns private drafts and backup scripts. `npm run publish -- FILE` validates; adding `--submit` creates one review PR in an isolated checkout without touching website source.

Notion originals and converted drafts remain local in `blog-agent/backups/notion` and `blog-agent/exports`; both are gitignored. Existing website content is never overwritten by migration. Review one archived article at a time before submitting.

The legacy Notion routine was paused on 2026-10-06 and the disabled switch was verified at https://claude.ai/code/routines/trig_01VRnTtnaYnt3CAhgiUEDTs5. Keep it disabled to avoid duplicate work; this GitHub workflow does not control the Claude routine.

## Verification

Run `npm run test:blog` and `npm run build` before merging infrastructure changes. Use the existing `/admin/blog` studio for manual edits when needed. A GitHub merge requires a successful Vercel deployment before the production site changes.

## Activation Status

Infrastructure PR #3 and initial article PR #4 are merged. The previous Higgsfield HTTP 401 blocker was removed by replacing image generation with local stock images. Daily automatic publication replaces the previous Mon/Wed/Fri review-PR schedule.

## Stock Images

`scripts/stock-images.json` is a manually license-checked catalog, not an unrestricted web image search. The title, slug and tags choose the best keyword match. If no image matches or a related image is corrupt/missing, the generic AI brain illustration is used. `public/images/stock` is committed so image selection works without network access.

Each post gets a local copy, `credit.json` and visible attribution. The fallback is explicitly described as illustrative, not a screenshot of a specific product. Source pages and [Unsplash license](https://unsplash.com/license) are recorded in the catalog. Add more individually reviewed images to expand topic coverage; run `node scripts/fetch-stock-images.mjs` only when adding approved assets.
