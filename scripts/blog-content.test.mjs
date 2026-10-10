import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';
import { imageHash } from './stock-cover.mjs';
import { parsePost, assertNewPost, assertLocalCover, alreadyPublishedToday } from './blog-content.mjs';

test('Daily publishing is idempotent in KST, not UTC', () => {
  const post = { date: '2026-10-07', published: true, automated: true };
  assert.equal(alreadyPublishedToday([post], new Date('2026-10-06T15:01:00Z')), true);
  assert.equal(alreadyPublishedToday([post], new Date('2026-10-06T14:59:00Z')), false);
  assert.equal(alreadyPublishedToday([{ ...post, published: false }], new Date('2026-10-07T00:00:00Z')), false);
  assert.equal(alreadyPublishedToday([{ ...post, automated: false }], new Date('2026-10-07T00:00:00Z')), false);
});

const metadata = { title: 'Test', slug: 'test-post', date: '2026-10-06', description: 'Test description', tags: ['test'], published: false };
test('Markdown body and boolean draft status are preserved', () => {
  const body = '| A | B |\n|---|---|\n| 1 | 2 |\n';
  const post = parsePost(matter.stringify(body, metadata));
  assert.equal(post.data.published, false);
  assert.equal(post.content.trim(), body.trim());
});
test('Reject invalid metadata and path traversal', () => {
  for (const update of [{ slug: '../escape' }, { date: '2026-02-30' }, { published: 'false' }, { tags: 'test' }, { title: '' }]) {
    assert.throws(() => parsePost(matter.stringify('Body', { ...metadata, ...update })));
  }
});
test('Reject duplicate slugs and normalized titles', () => {
  assert.throws(() => assertNewPost(metadata, [metadata]));
  assert.throws(() => assertNewPost({ ...metadata, title: '2026 TEST!', slug: 'other' }, [metadata]));
});
test('Cover must exist within public directory', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-test-'));
  try {
    fs.writeFileSync(path.join(root, 'cover.webp'), 'fixture');
    assert.equal(assertLocalCover('/cover.webp', root), path.join(root, 'cover.webp'));
    for (const value of ['https://example.com/image.jpg', '//example.com/image.jpg', '/../secret', '/missing.webp']) assert.throws(() => assertLocalCover(value, root));
  } finally { fs.rmSync(root, { recursive: true }); }
});
test('All published repository posts parse; local covers exist', () => {
  const hashes = new Map();
  for (const name of fs.readdirSync('content/blog').filter(f => f.endsWith('.md'))) {
    const source = fs.readFileSync(path.join('content/blog', name), 'utf8');
    if (matter(source).data.published !== true) continue;
    const { data } = parsePost(source);
    if (data.cover?.startsWith('/')) {
      const hash = imageHash(assertLocalCover(data.cover, 'public'));
      assert.ok(!hashes.has(hash), `Duplicate cover: ${name} and ${hashes.get(hash)}`);
      hashes.set(hash, name);
    }
  }
});
