# Blog Publishing

The website reads Markdown in `content/blog/`. It does not read Notion. Only boolean `published: true` posts are visible. Images belong under `public/images/posts/SLUG/`.

## Review Workflow

- `.github/workflows/auto-blog.yml`: Monday, Wednesday, Friday at 09:00 Asia/Seoul (00:00 UTC). GitHub schedules can start late.
- It uses the existing Anthropic and Higgsfield repository secrets. These APIs can incur charges.
- Research requires at least two official search results. A human still verifies factual claims, commands, source relevance and generated images.
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

2026-10-06: local tests, lint and production build passed; preview deployed. The live generation test reached cover generation but failed with Higgsfield HTTP 401. A second test against the current official `https://api.higgsfield.ai` endpoint confirmed authentication failure before spending on another article. Infrastructure PR #3 remains unmerged; the new schedule is not active yet.

Update `HIGGSFIELD_API_KEY` and `HIGGSFIELD_API_SECRET` in repository Actions secrets using credentials from the [official API console](https://open.higgsfield.ai/). Do not paste keys into issues or chat. Run `Auto Blog Generator` on `blog/markdown-pipeline`, verify the resulting article/cover PR, then merge the infrastructure PR. Article approval remains a separate human review.
