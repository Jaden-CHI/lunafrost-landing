import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio-auth";
import {
  findSimilarPosts,
  listStudioPosts,
  makePostPath,
  saveRepositoryFile,
  serializePost,
  type StudioPostInput,
} from "@/lib/studio-github";

function unauthorized() {
  return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
}

export async function GET() {
  if (!(await getStudioSession())) return unauthorized();

  try {
    return NextResponse.json({ posts: await listStudioPosts() });
  } catch (error) {
    console.error("Failed to load studio posts", error);
    return NextResponse.json(
      { error: "GitHub에서 글을 불러오지 못했습니다. 저장소 토큰을 확인해주세요." },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await getStudioSession())) return unauthorized();

  let input: StudioPostInput;
  try {
    input = (await request.json()) as StudioPostInput;
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (!input.title?.trim() || !input.slug?.trim() || !input.date || !input.content?.trim()) {
    return NextResponse.json(
      { error: "제목, 슬러그, 날짜, 본문은 필수입니다." },
      { status: 400 },
    );
  }

  if (
    input.originalPath &&
    (!input.originalPath.startsWith("content/blog/") ||
      !input.originalPath.endsWith(".md") ||
      input.originalPath.includes(".."))
  ) {
    return NextResponse.json({ error: "수정할 글 경로가 올바르지 않습니다." }, { status: 400 });
  }

  try {
    const posts = await listStudioPosts();
    const targetPath = input.originalPath ?? makePostPath(input.date, input.slug);
    if (targetPath.endsWith("/-.md") || targetPath.includes("..")) {
      return NextResponse.json({ error: "슬러그를 문자 또는 숫자로 입력해주세요." }, { status: 400 });
    }
    const target = posts.find((post) => post.path === targetPath);

    if (!input.originalPath && target) {
      return NextResponse.json(
        { error: "같은 날짜와 슬러그를 사용하는 글이 이미 있습니다." },
        { status: 409 },
      );
    }

    const similar = findSimilarPosts(input.title, posts, input.originalPath);
    if (similar.length > 0 && !input.allowSimilar) {
      return NextResponse.json(
        {
          error: "유사한 제목의 글이 있습니다. 중복 여부를 확인해주세요.",
          similar,
          requiresConfirmation: true,
        },
        { status: 409 },
      );
    }

    const result = await saveRepositoryFile({
      path: targetPath,
      content: serializePost(input),
      sha: target?.sha,
      message: input.published
        ? `Publish blog post: ${input.title.trim()}`
        : `Save blog draft: ${input.title.trim()}`,
    });

    return NextResponse.json({
      success: true,
      path: targetPath,
      commitUrl: result.commit.html_url,
      message: input.published
        ? "발행 커밋이 완료되었습니다. Vercel 배포가 곧 시작됩니다."
        : "임시저장 커밋이 완료되었습니다.",
    });
  } catch (error) {
    console.error("Failed to save studio post", error);
    return NextResponse.json(
      { error: "글을 저장하지 못했습니다. GitHub 권한과 입력값을 확인해주세요." },
      { status: 502 },
    );
  }
}
