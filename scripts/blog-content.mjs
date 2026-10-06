import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const categories = ['AI Tools', 'App Dev', 'Content', 'Tech Trends'];
export function alreadyPublishedToday(posts, now = new Date()) {
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(now);
  return posts.some(post => post.automated === true && post.published === true && post.date === day);
}
export function parsePost(source) {
  const { data, content } = matter(source);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug ?? '')) throw new Error('Invalid slug');
  if (typeof data.title !== 'string' || !data.title.trim()) throw new Error('Missing title');
  if (typeof data.description !== 'string' || !data.description.trim()) throw new Error('Missing description');
  if (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || new Date(data.date).toISOString().slice(0, 10) !== data.date) throw new Error('Invalid date');
  if (typeof data.published !== 'boolean') throw new Error('published must be a boolean');
  if (!Array.isArray(data.tags) || !data.tags.every(t => typeof t === 'string')) throw new Error('Invalid tags');
  if (!content.trim()) throw new Error('Empty content');
  return { data, content };
}

export function existingPosts(root) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root).filter(f => f.endsWith('.md')).map(f => matter.read(path.join(root, f)).data);
}

export function assertNewPost(post, existing) {
  const normalize = text => text.toLowerCase().replace(/\b(19|20)\d{2}\b/g, '').replace(/[^a-z0-9가-힣]/g, '');
  if (existing.some(p => p.slug === post.slug || normalize(p.title) === normalize(post.title))) throw new Error('Duplicate post');
}

export function assertLocalCover(cover, publicDir) {
  if (typeof cover !== 'string' || !cover.startsWith('/') || cover.startsWith('//')) throw new Error('Cover must be a local image');
  const root = path.resolve(publicDir);
  const file = path.resolve(root, `.${cover}`);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) throw new Error('Cover file missing or outside public');
  return file;
}
