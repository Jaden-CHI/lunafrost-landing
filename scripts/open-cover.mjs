import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { Parser } from 'htmlparser2';

export function plainText(html) {
  let text = '';
  const parser = new Parser({ ontext(value) { text += value; } });
  parser.end(String(html));
  return text.replace(/\s+/g, ' ').trim();
}
export const markdownText = text => String(text).replace(/[\\`*_{}\[\]()<>#!|]/g, '\\$&');
export function coverAttribution(credit) {
  return `커버 이미지: [${markdownText(credit.author)}](${credit.source}) · [${markdownText(credit.license)}](${credit.licenseUrl}). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.`;
}

const agent = 'MoonythBlog/1.0 (https://moonyth.app/contact)';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export function safeUrl(value, hosts) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || !hosts.includes(url.hostname) || url.port || url.username || url.password) throw new Error('Unapproved image URL');
  return url;
}
export function eligible(image) {
  return image.source === 'wikimedia' && ['by', 'cc0'].includes(image.license) && image.mature === false
    && /\bAI\b|artificial intelligence|neural network|processor|microchip|circuit|motherboard/i.test(image.title ?? '')
    && !/summit|forum|conference|president|minister|speaking|portrait|garbage|waste|medical|cancer|diagnos|religion|psycholog|trend data|girl|\bMs\b|\bMr\b/i.test(image.title ?? '')
    && (!image.filesize || image.filesize <= 15 * 1024 * 1024)
    && !image.unstable__sensitivity?.length && image.width >= 800 && image.height >= 450
    && ['jpg', 'jpeg', 'png', 'webp'].includes(image.filetype) && image.creator?.length > 0 && image.creator.length < 180
    && !/[<>\[\]\n]/.test(image.creator) && /^(?:[a-f0-9-]{36}|commons-\d+)$/.test(image.id);
}
async function get(url, hosts, fetcher) {
  const response = await fetcher(safeUrl(url, hosts), { headers: { 'User-Agent': agent }, redirect: 'error', signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Image provider HTTP ${response.status}`);
  return response;
}
export function verifiedInfo(image, page) {
  const info = page?.imageinfo?.[0];
  const meta = info?.extmetadata;
  const expected = image.license === 'by' ? `https://creativecommons.org/licenses/by/${image.license_version}` : 'https://creativecommons.org/publicdomain/zero/1.0';
  if (!meta || meta.Restrictions?.value || !meta.Artist?.value || meta.LicenseUrl?.value?.replace(/\/$/, '') !== expected) throw new Error('Original license not verified');
  const original = safeUrl(info.url, ['upload.wikimedia.org']);
  const indexed = safeUrl(image.url, ['upload.wikimedia.org']);
  if (original.pathname !== indexed.pathname) throw new Error('Original image mismatch');
  return { info, meta, licenseUrl: expected + '/' };
}

export async function searchCommons(query, page, fetcher = fetch) {
  const params = new URLSearchParams({ action: 'query', format: 'json', generator: 'search',
    gsrsearch: `${query} filetype:bitmap`, gsrnamespace: '6', gsrlimit: '20', gsroffset: String((page - 1) * 20),
    prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata' });
  const result = await (await get(`https://commons.wikimedia.org/w/api.php?${params}`, ['commons.wikimedia.org'], fetcher)).json();
  if (result.error) throw new Error('Commons search API error');
  return Object.values(result.query?.pages ?? {}).sort((a, b) => a.index - b.index).flatMap(item => {
    const info = item.imageinfo?.[0];
    const meta = info?.extmetadata;
    const license = meta?.LicenseUrl?.value?.match(/^https:\/\/creativecommons.org\/(licenses\/by\/([\d.]+)|publicdomain\/zero\/(1\.0))\/?$/);
    if (!license || meta.Restrictions?.value || !/^\d+$/.test(String(item.pageid))) return [];
    return [{ id: `commons-${item.pageid}`, source: 'wikimedia', provider: 'Wikimedia Commons direct',
      title: item.title?.replace(/^File:/, ''), creator: plainText(meta.Artist?.value ?? ''),
      license: license[2] ? 'by' : 'cc0', license_version: license[2] || license[3],
      foreign_landing_url: `https://commons.wikimedia.org/w/index.php?curid=${item.pageid}`, url: info.url,
      width: info.width, height: info.height, filesize: info.size, filetype: info.mime?.split('/')[1],
      mature: false, unstable__sensitivity: /nudity|sexual|pornograph/i.test(meta.Categories?.value ?? '') ? ['sensitive'] : [],
    }];
  });
}

export async function openCover(topic, slug, { publicDir, usage, usedHashes, fetcher = fetch } = {}) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid image slug');
  const keywords = /microprocessor/i.test(topic) ? 'microprocessor' : topic.toLowerCase().match(/[a-z][a-z0-9]+/g)?.slice(0, 3).join(' ');
  const queries = [...new Set([keywords, 'microprocessor', 'artificial intelligence', 'circuit board'].filter(Boolean))];
  const seen = new Set();
  let attempts = 0;
  let openverseUnavailable = false;
  for (const query of queries) {
    for (let page = 1; page <= 3; page++) {
      let results;
      try {
        if (openverseUnavailable) throw new Error('Openverse circuit open');
        const params = new URLSearchParams({ q: query, license: 'by,cc0', source: 'wikimedia', page_size: '20', page: String(page) });
        results = (await (await get(`https://api.openverse.org/v1/images/?${params}`, ['api.openverse.org'], fetcher)).json()).results;
      } catch (error) {
        if (!openverseUnavailable) console.warn(`Openverse unavailable; switching to Commons: ${error.message}`);
        openverseUnavailable = true;
      }
      if (!results?.length) {
        try { results = await searchCommons(query, page, fetcher); }
        catch (error) { console.warn(`Commons search unavailable: ${error.message}`); break; }
      }
      if (!results?.length) break;
      for (const image of results) {
        if (!eligible(image) || seen.has(image.id) || usage.has(image.foreign_landing_url)) continue;
        seen.add(image.id);
        if (++attempts > 20) throw new Error('Image candidate limit reached; retry later');
        try {
          const landing = safeUrl(image.foreign_landing_url, ['commons.wikimedia.org']);
          const pageId = landing.searchParams.get('curid');
          if (!/^\d+$/.test(pageId ?? '')) continue;
          const params = new URLSearchParams({ action: 'query', format: 'json', pageids: pageId, prop: 'imageinfo', iiprop: 'url|extmetadata' });
          const result = await (await get(`https://commons.wikimedia.org/w/api.php?${params}`, ['commons.wikimedia.org'], fetcher)).json();
          const { info, meta, licenseUrl } = verifiedInfo(image, result.query?.pages?.[pageId]);
          if (/portraits|politicians|conferences|summits|speeches/i.test(meta.Categories?.value ?? '')) continue;
          if (usage.has(info.descriptionurl)) continue;
          const response = await get(info.url, ['upload.wikimedia.org'], fetcher);
          if (!/^image\/(jpeg|png|webp)(;|$)/.test(response.headers.get('content-type') ?? '')) throw new Error('Not a raster image');
          const chunks = []; let size = 0;
          for await (const chunk of response.body) {
            size += chunk.length;
            if (size > 15 * 1024 * 1024) throw new Error('Image exceeds download limit');
            chunks.push(chunk);
          }
          const bytes = Buffer.concat(chunks);
          const pipeline = sharp(bytes, { limitInputPixels: 40000000 });
          const dimensions = await pipeline.metadata();
          if (dimensions.width < 800 || dimensions.height < 450 || dimensions.pages > 1) throw new Error('Unsuitable image dimensions');
          const output = await pipeline.rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
          if (usedHashes.has(hash(bytes)) || usedHashes.has(hash(output))) continue;
          const cover = `/images/posts/${slug}/commons-${pageId}.webp`;
          const destination = path.join(publicDir, cover);
          const author = plainText(meta.Artist.value);
          if (!author || author.length > 300) throw new Error('Unclear attribution');
          const credit = { author, title: image.title, source: image.foreign_landing_url,
            license: image.license === 'by' ? `CC BY ${image.license_version}` : 'CC0 1.0', licenseUrl,
            alt: 'AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)', provider: image.provider === 'Wikimedia Commons direct' ? image.provider : 'Wikimedia Commons / Openverse',
            imageId: image.id, originalUrl: info.url, originalHash: hash(bytes), verifiedAt: new Date().toISOString(),
            originalArtist: meta.Artist.value, changes: 'Resized and converted to WebP' };
          fs.mkdirSync(path.dirname(destination), { recursive: true });
          fs.writeFileSync(destination, output);
          fs.writeFileSync(path.join(path.dirname(destination), 'credit.json'), JSON.stringify(credit, null, 2) + '\n');
          return { cover, credit, imageId: image.id };
        } catch (error) { console.warn(`Skipped image ${image.id}: ${error.message}`); }
      }
    }
  }
  throw new Error('No unused verified open image available; providers may be unavailable. No duplicate image published.');
}
