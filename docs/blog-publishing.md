# Blog Publishing

The website reads Markdown in `content/blog/`. It does not read Notion. Only boolean `published: true` posts are visible. Images belong under `public/images/posts/SLUG/`.

## Review Workflow

- `.github/workflows/auto-blog.yml`: Monday, Wednesday, Friday at 09:00 Asia/Seoul (00:00 UTC). GitHub schedules can start late.
- Text research/writing uses the existing Anthropic repository secret and can incur charges. Images require no API keys or generation.
- Research requires at least two official search results. A human still verifies factual claims, commands, source relevance and stock-image suitability.
- The generator writes `published: true` on a non-production branch. Only merge into main approves site publication; no auto-merge is configured.
- The repository and PRs are public, including pre-merge drafts. Do not submit confidential content.
- An open `blog/draft-*` PR pauses further generation to avoid duplicate drafts and unnecessary cost. Merge or close it to resume.
- Enable GitHub Actions PR creation in repository Settings > Actions > General > Workflow permissions. Workflow token permissions are scoped to contents and PR writes.
- Check Actions logs after each failure; recovery artifacts expire after seven days. A failed generation never pushes to main.

## Manual Drafts and Migration

The separate local `../blog-agent` project owns private drafts and backup scripts. `npm run publish -- FILE` validates; adding `--submit` creates one review PR in an isolated checkout without touching website source.

Notion originals and converted drafts remain local in `blog-agent/backups/notion` and `blog-agent/exports`; both are gitignored. Existing website content is never overwritten by migration. Review one archived article at a time before submitting.

The legacy Notion routine was paused on 2026-10-06 and the disabled switch was verified at https://claude.ai/code/routines/trig_01VRnTtnaYnt3CAhgiUEDTs5. Keep it disabled to avoid duplicate work; this GitHub workflow does not control the Claude routine.

## Verification

Run `npm run test:blog` and `npm run build` before merging infrastructure changes. Use the existing `/admin/blog` studio for manual edits when needed. A GitHub merge requires a successful Vercel deployment before the production site changes.

## Activation Status

The previous Higgsfield HTTP 401 blocker was removed by replacing image generation with local stock images. Infrastructure PR #3 must be merged to activate the schedule; article approval remains a separate human review.

## Stock Images

`scripts/stock-images.json` is a manually license-checked catalog, not an unrestricted web image search. The title, slug and tags choose the best keyword match. If no image matches or a related image is corrupt/missing, the generic AI brain illustration is used. `public/images/stock` is committed so image selection works without network access.

Each post gets a local copy, `credit.json` and visible attribution. The fallback is explicitly described as illustrative, not a screenshot of a specific product. Source pages and [Unsplash license](https://unsplash.com/license) are recorded in the catalog. Add more individually reviewed images to expand topic coverage; run `node scripts/fetch-stock-images.mjs` only when adding approved assets.
