import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { stockCover } from './stock-cover.mjs';

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-provider-check-'));
try {
  const image = await stockCover('artificial intelligence', 'provider-check', { remote: true, catalog: [], publicDir: temporary, usagePublicDir: path.resolve('public') });
  console.log(`Verified live image provider: ${image.credit.source} (${image.credit.license})`);
} finally { fs.rmSync(temporary, { recursive: true, force: true }); }
