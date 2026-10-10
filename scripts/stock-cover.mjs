import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
export const catalog = JSON.parse(fs.readFileSync(new URL('./stock-images.json', import.meta.url), 'utf8'));
const words = text => String(text).toLowerCase().split(/[^a-z0-9가-힣]+/u).filter(Boolean);
export const imageHash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');

export function candidatesFor(topic, entries = catalog) {
  const tokens = new Set(words(topic));
  const related = entries.map(entry => ({ entry, score: entry.keywords.filter(term => words(term).every(token => tokens.has(token))).length }))
    .filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.entry);
  return [...related, ...entries.filter(entry => entry.fallback && !related.includes(entry))];
}

export async function stockCover(topic, slug, options = {}) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid image slug');
  const stockDir = options.stockDir ?? path.join(root, 'public/images/stock');
  const publicDir = options.publicDir ?? path.join(root, 'public');
  const usage = new Map();
  const usedHashes = new Set();
  const postsDir = path.join(options.usagePublicDir ?? publicDir, 'images/posts');
  if (fs.existsSync(postsDir)) {
    for (const directory of fs.readdirSync(postsDir, { withFileTypes: true })) {
      if (!directory.isDirectory() || directory.name === slug) continue;
      for (const file of fs.readdirSync(path.join(postsDir, directory.name))) {
        if (/\.(webp|png|jpe?g)$/i.test(file)) usedHashes.add(imageHash(path.join(postsDir, directory.name, file)));
      }
      const creditFile = path.join(postsDir, directory.name, 'credit.json');
      if (!fs.existsSync(creditFile)) continue;
      const { source } = JSON.parse(fs.readFileSync(creditFile, 'utf8'));
      usage.set(source, (usage.get(source) ?? 0) + 1);
    }
  }
  // Never recycle an exhausted catalog: stop publication until approved stock is added.
  const candidates = candidatesFor(topic, options.catalog ?? catalog)
    .filter(entry => !usage.has(entry.source));
  for (const entry of candidates) {
    try {
      if (path.basename(entry.file) !== entry.file) throw new Error('Invalid catalog filename');
      const input = path.join(stockDir, entry.file);
      if (usedHashes.has(imageHash(input))) continue;
      // Decode before copying so a corrupt related image falls back to the AI image.
      const info = await sharp(input).metadata();
      if (!info.width || !info.height || info.width < 640) throw new Error('Invalid stock image');
      await sharp(input).stats();
      const cover = `/images/posts/${slug}/${entry.file}`;
      const destination = path.join(publicDir, cover);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(input, destination);
      const credit = { author: entry.author, source: entry.source, license: entry.license, licenseUrl: entry.licenseUrl, alt: entry.alt };
      fs.writeFileSync(path.join(path.dirname(destination), 'credit.json'), JSON.stringify(credit, null, 2) + '\n');
      return { cover, credit, imageId: entry.id };
    } catch (error) { console.warn(`Stock image ${entry.id} unavailable: ${error.message}`); }
  }
  throw new Error('No unused valid stock image remains. Add licensed images to scripts/stock-images.json before publishing; duplicate covers are blocked.');
}
