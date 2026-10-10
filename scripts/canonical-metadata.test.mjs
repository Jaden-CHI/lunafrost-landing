import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const origin = 'https://moonyth.app';
const routes = [
  '/', '/blog', '/tools', '/apps', '/youtube', '/about', '/contact',
  '/copyright', '/privacy-policy', '/terms', '/tools/image-rescaler',
  '/pangpangdefense', '/pangpangdefense/privacy',
  '/fishinghwindy/privacy', '/golfwindy/privacy',
];
const privateRoutes = ['/admin/blog', '/fishinghwindy/partnership'];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const pageFile = route => route === '/' ? 'app/page.tsx' : `app${route}/page.tsx`;

// Evaluate the actual exported declarations without importing React components,
// next/font or request-only APIs. TypeScript is already a project dependency.
function evaluate(source, filename, bindings = {}) {
  const { outputText } = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  vm.runInNewContext(outputText, { exports, require, URL, process, ...bindings }, { filename });
  return exports;
}

function exported(file, name, bindings = {}) {
  const source = ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declaration = source.statements.find(statement =>
    (ts.isVariableStatement(statement) && statement.declarationList.declarations.some(d => d.name.getText(source) === name)) ||
    (ts.isFunctionDeclaration(statement) && statement.name?.text === name)
  );
  assert.ok(declaration, `Missing ${name} in ${file}`);
  const result = evaluate(declaration.getText(source), file, bindings);
  return declaration.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)
    ? result.default : result[name];
}

function plain(value) { return JSON.parse(JSON.stringify(value)); }

const posts = evaluate(read('lib/posts.ts'), 'lib/posts.ts');

test('All 15 static sitemap routes have their own absolute canonical, not the homepage', async t => {
  const sitemap = exported('app/sitemap.ts', 'sitemap', { getBlogPosts: async () => [] });
  const sitemapPaths = (await sitemap()).map(entry => new URL(entry.url).pathname);
  assert.deepEqual([...sitemapPaths].sort(), [...routes].sort());
  for (const route of routes) {
    await t.test(route, () => {
      const metadata = exported(pageFile(route), 'metadata');
      assert.equal(metadata.alternates?.canonical, `${origin}${route}`);
      assert.equal(new URL(metadata.alternates.canonical).pathname, route);
      if (route !== '/') assert.notEqual(metadata.alternates.canonical, `${origin}/`);
    });
  }
});

test('Blog category and tracking queries do not contaminate the listing canonical', () => {
  for (const query of ['', '?category=AI%20Tools', '?category=App%20Dev&utm_source=google']) {
    const metadata = exported('app/blog/page.tsx', 'metadata', {
      searchParams: new URLSearchParams(query),
    });
    assert.equal(metadata.alternates.canonical, `${origin}/blog`);
  }
});

test('Root layout has no global canonical to inherit, and retains metadataBase', () => {
  const metadata = exported('app/layout.tsx', 'metadata');
  assert.equal(metadata.metadataBase.href, `${origin}/`);
  assert.equal(metadata.alternates?.canonical, undefined);
});

test('Deliberate noindex pages remain noindex/nofollow and absent from sitemap', async () => {
  const sitemap = exported('app/sitemap.ts', 'sitemap', { getBlogPosts: async () => [] });
  const urls = (await sitemap()).map(entry => new URL(entry.url).pathname);
  for (const route of privateRoutes) {
    const metadata = exported(pageFile(route), 'metadata');
    assert.deepEqual(plain(metadata.robots), { index: false, follow: false });
    assert.equal(metadata.alternates?.canonical, undefined);
    assert.equal(urls.includes(route), false);
  }
});

test('Every published post uses its actual slug and the same article Open Graph URL', async () => {
  const generateMetadata = exported('app/blog/[slug]/page.tsx', 'generateMetadata', {
    getBlogPost: posts.getBlogPost,
  });
  const published = await posts.getBlogPosts();
  assert.ok(published.length > 0, 'Expected published article fixtures');
  for (const post of published) {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: post.slug }) });
    const expected = `${origin}/blog/${encodeURIComponent(post.slug)}`;
    assert.equal(metadata.alternates?.canonical, expected);
    assert.equal(metadata.openGraph.url, expected);
    assert.equal(metadata.openGraph.type, 'article');
    assert.equal(metadata.title, post.title);
    assert.equal(metadata.description, post.description);
    assert.equal(metadata.openGraph.publishedTime, post.date);
    assert.deepEqual(plain(metadata.openGraph.images), post.cover ? [post.cover] : []);
  }
});

test('Article canonical encodes a single slug segment and uses post.slug, not raw params', async () => {
  for (const slug of ['actual-post', '한글 글', 'article?utm_source=google#section', '../other/path', 'https://other.test/path', 'literal%2Fslug']) {
    const generateMetadata = exported('app/blog/[slug]/page.tsx', 'generateMetadata', {
      getBlogPost: async requested => {
        assert.equal(requested, 'requested-alias');
        return { slug, title: 'Title', description: 'Description', date: '2026-10-05', cover: '' };
      },
    });
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'requested-alias' }) });
    const canonical = new URL(metadata.alternates.canonical);
    assert.equal(canonical.origin, origin);
    assert.equal(canonical.pathname, `/blog/${encodeURIComponent(slug)}`);
    assert.equal(canonical.search, '');
    assert.equal(canonical.hash, '');
    assert.equal(metadata.openGraph.url, canonical.href);
  }
});

test('Unknown blog slug has no invented canonical and still invokes notFound (404)', async () => {
  const missing = '__canonical_test_nonexistent_post__';
  await assert.rejects(posts.getBlogPost(missing), /Post not found/);
  const generateMetadata = exported('app/blog/[slug]/page.tsx', 'generateMetadata', {
    getBlogPost: posts.getBlogPost,
  });
  assert.deepEqual(plain(await generateMetadata({ params: Promise.resolve({ slug: missing }) })), {});
  const notFoundSignal = new Error('NEXT_HTTP_ERROR_FALLBACK;404');
  const BlogPostPage = exported('app/blog/[slug]/page.tsx', 'BlogPostPage', {
    getBlogPost: posts.getBlogPost,
    notFound: () => { throw notFoundSignal; },
  });
  await assert.rejects(BlogPostPage({ params: Promise.resolve({ slug: missing }) }), error => error === notFoundSignal);
});
