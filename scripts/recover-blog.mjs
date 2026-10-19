import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { parsePost, existingPosts, assertNewPost } from './blog-content.mjs';
import { stockCover } from './stock-cover.mjs';
import { coverAttribution } from './open-cover.mjs';

// Explicit file arguments only: importing recovery artifacts never republishes old posts.
for (const file of process.argv.slice(2)) {
  const { data, content } = parsePost(fs.readFileSync(file, 'utf8'));
  const existing = existingPosts('content/blog');
  assertNewPost(data, existing);
  if (existing.some(post => post.published && post.automated && post.date === data.date)) throw new Error(`Daily slot already used: ${data.date}`);
  const image = await stockCover([data.title, ...data.tags].join(' '), data.slug, { remote: true });
  const metadata = { ...data, published: true, automated: true, recoveredAt: new Date().toISOString(), cover: image.cover, coverAlt: image.credit.alt, coverCredit: image.credit };
  const body = `${content.trim()}\n\n${coverAttribution(image.credit)}\n`;
  const output = path.join('content/blog', `${data.date}-${data.slug}.md`);
  fs.writeFileSync(output, matter.stringify(body, metadata), { flag: 'wx' });
  console.log(`Recovered ${output}`);
}
