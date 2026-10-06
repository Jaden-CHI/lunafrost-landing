import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';
import { catalog, candidatesFor, stockCover } from './stock-cover.mjs';

test('Topic keywords select related stock, unknown topic selects AI fallback', () => {
  assert.equal(candidatesFor('GitHub Actions workflow')[0].id, 'developer-workspace');
  assert.equal(candidatesFor('Claude machine learning')[0].id, 'ai-brain');
  assert.equal(candidatesFor('unrelated topic')[0].id, 'ai-brain');
  assert.equal(candidatesFor('email')[0].id, 'ai-brain');
  assert.deepEqual(candidatesFor('email', [{ ...catalog[0], fallback: false, keywords: ['ai'] }]), []);
});
test('Bundled images decode and have provenance', async () => {
  for (const entry of catalog) {
    const info = await sharp(path.join('public/images/stock', entry.file)).metadata();
    assert.ok(info.width >= 640 && info.height >= 320);
    assert.ok(entry.author && entry.source.startsWith('https://unsplash.com/photos/'));
    assert.equal(entry.licenseUrl, 'https://unsplash.com/license');
  }
});
test('Unknown topic receives a local AI cover without network or image API keys', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stock-cover-'));
  try {
    const result = await stockCover('unrelated topic', 'fallback-test', { publicDir: dir });
    assert.equal(result.imageId, 'ai-brain');
    assert.ok(fs.existsSync(path.join(dir, result.cover)));
    const credit = JSON.parse(fs.readFileSync(path.join(dir, 'images/posts/fallback-test/credit.json')));
    assert.ok(credit.author.includes('DeepMind'));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
test('Missing related image falls back; invalid slug cannot escape output directory', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stock-cover-'));
  try {
    const entries = catalog.map(entry => entry.fallback ? entry : { ...entry, file: 'missing.webp' });
    assert.equal((await stockCover('GitHub Actions', 'fallback-test', { publicDir: dir, catalog: entries })).imageId, 'ai-brain');
    await assert.rejects(stockCover('AI', '../escape', { publicDir: dir }));
    await assert.rejects(stockCover('AI', 'missing-test', { publicDir: dir, stockDir: dir }));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
