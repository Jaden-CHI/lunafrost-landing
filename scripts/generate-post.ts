import fs from "fs";
import path from "path";
import https from "https";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;
const HF_API_KEY = process.env.HIGGSFIELD_API_KEY!;
const HF_API_SECRET = process.env.HIGGSFIELD_API_SECRET!;

const POSTS_DIR = path.join(process.cwd(), "content/blog");
const COVERS_DIR = path.join(process.cwd(), "public/blog/covers");
const HF_BASE = "https://cloud.higgsfield.ai";

const TOPIC_POOL = [
  { category: "AI Tools", topic: "2025년 주목해야 할 AI 생산성 도구 TOP 5" },
  { category: "AI Tools", topic: "Claude vs ChatGPT vs Gemini 실전 비교" },
  { category: "App Dev", topic: "Next.js와 Vercel로 SaaS 빠르게 런칭하는 법" },
  { category: "App Dev", topic: "Supabase로 백엔드 없이 풀스택 앱 만들기" },
  { category: "Content", topic: "AI로 유튜브 쇼츠 자동화하는 파이프라인 구축기" },
  { category: "Content", topic: "Higgsfield + Claude로 블로그 콘텐츠 자동화하기" },
];

function today(): string {
  return new Date().toISOString().split("T")[0];
}
function randomTopic() {
  return TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];
}

async function fetchJson(url: string, options: { method?: string; headers?: Record<string, string>; body?: string }): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, method: options.method ?? "GET", headers: options.headers ?? {} }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => { try { resolve(JSON.parse(data)); } catch { reject(new Error(`JSON parse error (${res.statusCode}): ${data.slice(0, 300)}`)); } });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (u: string) => {
      https.get(u, (res) => {
        if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) { file.close(); get(res.headers.location); return; }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
        file.on("error", reject);
      }).on("error", reject);
    };
    get(url);
  });
}

interface GeneratedPost { title: string; slug: string; description: string; category: string; tags: string[]; imagePrompt: string; content: string; }

async function generatePostWithClaude(topic: string, category: string): Promise<GeneratedPost> {
  console.log(`\n📝 Claude로 글 생성 중: "${topic}"`);

  const systemPrompt = `당신은 lunafrost.app의 블로그 작가입니다. AI, 앱 개발, 콘텐츠 자동화를 주제로 한국어로 인사이트 있는 글을 씁니다.

반드시 아래 형식으로만 응답하세요:

===META===
{"title":"제목","slug":"english-slug","description":"150자이내요약","category":"${category}","tags":["태그1","태그2","태그3"],"imagePrompt":"Cinematic futuristic dark tech blog cover, 16:9, high detail, no text"}
===CONTENT===
마크다운 본문 (1500~2000자, ## 소제목 포함)
===END===`;

  const res = await fetchJson("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: `주제: ${topic}\n카테고리: ${category}` }],
    }),
  }) as { content: Array<{ type: string; text: string }> };

  const text = res.content.find((b) => b.type === "text")?.text ?? "";

  const metaMatch = text.match(/===META===\s*([\s\S]*?)\s*===CONTENT===/);
  const contentMatch = text.match(/===CONTENT===\s*([\s\S]*?)\s*===END===/);
  if (!metaMatch || !contentMatch) throw new Error("응답 형식 파싱 실패");
  const meta = JSON.parse(metaMatch[1].trim());
  const content = contentMatch[1].trim();
  return { ...meta, content } as GeneratedPost;
}

async function generateCoverWithHighsfield(imagePrompt: string, slug: string): Promise<string> {
  console.log(`\n🎨 Higgsfield Soul 커버 이미지 생성 중...`);

  const authHeader = `Key ${HF_API_KEY}:${HF_API_SECRET}`;
  const BASE = 'https://platform.higgsfield.ai';

  // 1) 생성 요청
  const submitRes = await fetchJson(`${BASE}/higgsfield-ai/soul/standard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
    body: JSON.stringify({ prompt: imagePrompt, aspect_ratio: '16:9', resolution: '720p' }),
  }) as { request_id?: string; status?: string };

  const requestId = submitRes.request_id;
  if (!requestId) throw new Error(`요청 ID 없음: ${JSON.stringify(submitRes)}`);
  console.log(`   요청 ID: ${requestId}`);

  // 2) 폴링 (최대 2분)
  let imageUrl = '';
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const s = await fetchJson(`${BASE}/requests/${requestId}/status`, {
      method: 'GET',
      headers: { 'Authorization': authHeader },
    }) as { status?: string; images?: Array<{ url: string }>; video?: { url: string } };

    console.log(`   상태: ${s.status} (${i + 1}/40)`);

    if (s.status === 'completed' && s.images?.[0]?.url) {
      imageUrl = s.images[0].url;
      break;
    }
    if (s.status === 'failed' || s.status === 'nsfw') {
      throw new Error(`생성 실패: ${s.status}`);
    }
  }

  if (!imageUrl) throw new Error('Higgsfield 타임아웃');

  fs.mkdirSync(COVERS_DIR, { recursive: true });
  const filename = `${slug}.jpg`;
  await downloadFile(imageUrl, path.join(COVERS_DIR, filename));
  console.log(`   ✅ 저장: /blog/covers/${filename}`);
  return `/blog/covers/${filename}`;
}

function saveMarkdownFile(post: GeneratedPost, coverPath: string): string {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  const filename = `${today()}-${post.slug}.md`;
  const fm = [
    "---",
    `title: "${post.title.replace(/"/g, "'")}"`,
    `slug: "${post.slug}"`,
    `date: "${today()}"`,
    `category: "${post.category}"`,
    `tags: [${post.tags.map((t) => `"${t}"`).join(", ")}]`,
    `description: "${post.description.replace(/"/g, "'")}"`,
    `cover: "${coverPath}"`,
    "published: true",
    "---",
    "",
    post.content,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(POSTS_DIR, filename), fm, "utf-8");
  console.log(`\n✅ 저장: content/blog/${filename}`);
  return filename;
}

async function main() {
  console.log("🚀 lunafrost 블로그 자동화 시작");
  if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY 없음");
  if (!HF_API_KEY) throw new Error("HIGGSFIELD_API_KEY 없음");
  if (!HF_API_SECRET) throw new Error("HIGGSFIELD_API_SECRET 없음");

  const topicArg = process.argv[2];
  const categoryArg = process.argv[3];
  const { topic, category } = topicArg ? { topic: topicArg, category: categoryArg ?? "AI Tools" } : randomTopic();
  console.log(`\n📌 주제: ${topic} [${category}]`);

  const post = await generatePostWithClaude(topic, category);
  console.log(`   제목: ${post.title}\n   슬러그: ${post.slug}`);

  let coverPath = "";
  try { coverPath = await generateCoverWithHighsfield(post.imagePrompt, post.slug); }
  catch (err) { console.warn(`\n⚠️  Higgsfield 실패, 커버 없이 진행: ${err}`); }

  const filename = saveMarkdownFile(post, coverPath);
  console.log(`\n🎉 완료! content/blog/${filename}`);
  console.log("→ git push 후 Vercel 자동 배포 시작");
}

main().catch((err) => { console.error("\n❌ 오류:", err); process.exit(1); });
