import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
export const catalog = JSON.parse(fs.readFileSync(new URL('./stock-images.json', import.meta.url), 'utf8'));
const words = text => String(text).toLowerCase().split(/[^a-z0-9가-힣]+/u).filter(Boolean);

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
  const postsDir = path.join(options.usagePublicDir ?? publicDir, 'images/posts');
  if (fs.existsSync(postsDir)) {
    for (const directory of fs.readdirSync(postsDir, { withFileTypes: true })) {
      if (!directory.isDirectory() || directory.name === slug) continue;
      const creditFile = path.join(postsDir, directory.name, 'credit.json');
      if (!fs.existsSync(creditFile)) continue;
      const { source } = JSON.parse(fs.readFileSync(creditFile, 'utf8'));
      usage.set(source, (usage.get(source) ?? 0) + 1);
    }
  }
  // Prefer unused eligible images, then least-used ones; preserve relevance for ties.
  const candidates = candidatesFor(topic, options.catalog ?? catalog)
    .sort((a, b) => (usage.get(a.source) ?? 0) - (usage.get(b.source) ?? 0));
  for (const entry of candidates) {
    try {
      if (path.basename(entry.file) !== entry.file) throw new Error('Invalid catalog filename');
      const input = path.join(stockDir, entry.file);
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
  throw new Error('Bundled AI fallback image is missing or corrupt; restore public/images/stock');
}
