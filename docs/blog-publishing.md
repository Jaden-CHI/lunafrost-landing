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

`scripts/stock-images.json` is a manually license-checked local catalog. Production generation enables remote fallback when local eligible images are exhausted: Openverse searches Wikimedia Commons for CC BY / CC0 raster images, then the Commons API rechecks the original license, author, restrictions and file URL before downloading. No additional API key is required for anonymous Openverse access. Requests are bounded and subject to provider rate limits. Technical keyword/category filters exclude known event and portrait results, but do not replace human visual review.

Previously used sources, original hashes and optimized file hashes are excluded. Images are secured before paid research/writing. Unavailable providers or unverified licenses still block publication instead of silently reusing a cover. Published posts are also checked for identical local covers. Credits record source, license, original author, verification time and resizing/WebP conversion; attribution is rendered in the article. Hashes detect byte-identical files, not every visually similar or re-encoded image.

The writer now returns a `write_blog` tool input instead of hand-parsed JSON text. Recovery artifacts retain drafts and raw writer responses for 30 days. Failed runs create/update a GitHub issue (notification delivery depends on repository notification settings). `workflow_dispatch` with `dry_run=true` tests both live image acquisition and a small structured writer request without publishing. This dry run has a small model API cost.

To recover an explicitly reviewed draft, run `node scripts/recover-blog.mjs /path/to/draft.md`, then tests/build and publish. Original scheduled dates are preserved; `recoveredAt` records the real recovery timestamp. Already-used daily slots and duplicate titles/slugs are rejected. The October 12-19 recovery contains five recovered drafts and three replacement articles where no saved draft survived. GitHub schedule remains daily at 00:00 UTC (09:00 KST), but GitHub scheduling delays mean exact publication time is not guaranteed.
