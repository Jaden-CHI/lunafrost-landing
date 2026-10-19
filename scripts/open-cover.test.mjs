import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { openCover, eligible, safeUrl, verifiedInfo, plainText, coverAttribution } from './open-cover.mjs';
import { extractArticle } from './blog-output.mjs';

const candidate = { id: '11111111-1111-1111-1111-111111111111', source: 'wikimedia', license: 'by', license_version: '4.0', mature: false, width: 1000, height: 600, filetype: 'jpg', creator: 'Author', title: 'AI', foreign_landing_url: 'https://commons.wikimedia.org/w/index.php?curid=123', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/image.jpg' };
const page = { imageinfo: [{ url: candidate.url, descriptionurl: candidate.foreign_landing_url, extmetadata: { LicenseUrl: { value: 'https://creativecommons.org/licenses/by/4.0/' }, Artist: { value: '<a href="/wiki/User:Author">Original &amp; Author</a>' } } }] };
test('Only eligible reusable raster images and approved HTTPS hosts are allowed', () => {
  assert.ok(eligible(candidate));
  for (const change of [{ license: 'by-nc' }, { license: 'by-nd' }, { mature: true }, { width: 300 }, { filetype: 'svg' }, { unstable__sensitivity: ['sensitive'] }]) assert.ok(!eligible({ ...candidate, ...change }));
  for (const url of ['http://upload.wikimedia.org/a', 'https://127.0.0.1/a', 'https://upload.wikimedia.org.evil.test/a', 'https://user@upload.wikimedia.org/a']) assert.throws(() => safeUrl(url, ['upload.wikimedia.org']));
  assert.equal(plainText(page.imageinfo[0].extmetadata.Artist.value), 'Original & Author');
  assert.ok(coverAttribution({ author: '[bad]', source: 'https://example.com', license: 'CC0', licenseUrl: 'https://example.com' }).includes('\\[bad\\]'));
});
test('Original license must still match and have no restrictions', () => {
  assert.ok(verifiedInfo(candidate, page));
  for (const change of [{ LicenseUrl: { value: 'https://creativecommons.org/licenses/by-nc/4.0/' } }, { Restrictions: { value: 'trademark' } }]) {
    const altered = structuredClone(page);
    Object.assign(altered.imageinfo[0].extmetadata, change);
    assert.throws(() => verifiedInfo(candidate, altered));
  }
});
test('Remote selection downloads, records original attribution, and blocks hash/source reuse', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'open-cover-test-'));
  const bytes = await sharp({ create: { width: 1000, height: 600, channels: 3, background: '#33aa66' } }).jpeg().toBuffer();
  const fetcher = async (input, options) => {
    assert.equal(options.redirect, 'error');
    const url = new URL(input);
    if (url.hostname === 'api.openverse.org') return Response.json({ results: url.searchParams.get('page') === '1' ? [candidate] : [] });
    if (url.hostname === 'commons.wikimedia.org') return Response.json({ query: { pages: { 123: page } } });
    return new Response(bytes, { headers: { 'Content-Type': 'image/jpeg' } });
  };
  try {
    const options = { publicDir: dir, usage: new Map(), usedHashes: new Set(), fetcher };
    const result = await openCover('AI', 'new-post', options);
    assert.ok(fs.existsSync(path.join(dir, result.cover)));
    assert.equal(result.credit.author, 'Original & Author');
    await assert.rejects(openCover('AI', 'duplicate', { ...options, usedHashes: new Set([createHash('sha256').update(bytes).digest('hex')]) }), /No unused verified/);
    await assert.rejects(openCover('AI', 'duplicate', { ...options, usage: new Map([[candidate.foreign_landing_url, 1]]) }), /No unused verified/);
    await assert.rejects(openCover('AI', 'outage', { ...options, fetcher: async () => new Response('', { status: 429 }) }), /No unused verified/);
    assert.ok(!fs.existsSync(path.join(dir, 'images/posts/outage')));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
test('Structured article preserves quotes/code and rejects truncated responses', () => {
  const input = { title: 'Quoted "text"', content: '```js\nconst a = "x";\n```' };
  const response = { stop_reason: 'tool_use', content: [{ type: 'tool_use', name: 'write_blog', input }] };
  assert.deepEqual(extractArticle(response), input);
  assert.throws(() => extractArticle({ ...response, stop_reason: 'max_tokens' }));
  assert.throws(() => extractArticle({ stop_reason: 'end_turn', content: [] }));
});
