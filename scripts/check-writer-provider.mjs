import { articleTool, extractArticle } from './blog-output.mjs';
import { parsePost } from './blog-content.mjs';
import matter from 'gray-matter';

if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is required');
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST', signal: AbortSignal.timeout(60000),
  headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
  body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6', max_tokens: 512, tools: [articleTool], tool_choice: { type: 'tool', name: articleTool.name },
    messages: [{ role: 'user', content: 'Call write_blog with a tiny test article. Title Test, slug schema-smoke-test, category App Dev, tags [test], description Test. Content must contain a JavaScript fenced code block with double quotes. No research needed. This is never published.' }] }),
});
if (!response.ok) throw new Error(`Writer provider HTTP ${response.status}`);
const article = extractArticle(await response.json());
parsePost(matter.stringify(article.content, { ...article, date: '2026-10-19', published: false }));
console.log('Live structured writer response validated; no article published.');
