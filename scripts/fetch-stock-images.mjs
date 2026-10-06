import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { catalog } from './stock-cover.mjs';

const dir = fileURLToPath(new URL('../public/images/stock/', import.meta.url));
fs.mkdirSync(dir, { recursive: true });
for (const image of catalog) {
  const file = path.join(dir, image.file);
  if (fs.existsSync(file)) continue;
  const url = new URL(image.download);
  if (url.protocol !== 'https:' || url.hostname !== 'images.unsplash.com') throw new Error('Unapproved image host');
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Download failed: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > 25 * 1024 * 1024) throw new Error('Image too large');
  await sharp(bytes).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 85 }).toFile(file);
  console.log(`Stored ${image.id}`);
}
fs.writeFileSync(path.join(dir, 'credits.json'), JSON.stringify(catalog, null, 2) + '\n');
