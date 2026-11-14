import { spawnSync } from 'node:child_process';
import { publicationDates, missingDates } from './blog-dates.mjs';
import { existingPosts } from './blog-content.mjs';

const dates = publicationDates(process.env.BLOG_START_DATE, process.env.BLOG_END_DATE);
for (const date of missingDates(dates, existingPosts('content/blog'))) {
  console.log(`Generating publication slot ${date}`);
  const result = spawnSync(process.execPath, ['scripts/generate-post.mjs'], {
    stdio: 'inherit', env: { ...process.env, BLOG_DATE: date }, timeout: 12 * 60 * 1000,
  });
  if (result.error || result.status !== 0) throw new Error(`Generation failed for ${date}: ${result.error?.message || result.status}`);
}
