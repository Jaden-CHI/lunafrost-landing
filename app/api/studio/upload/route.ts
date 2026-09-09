import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio-auth";
import { saveRepositoryFile } from "@/lib/studio-github";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  if (!(await getStudioSession())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "이미지 파일을 선택해주세요." }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "JPG, PNG, WebP, GIF 이미지만 업로드할 수 있습니다." },
      { status: 400 },
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "이미지는 5MB 이하여야 합니다." }, { status: 400 });
  }

  try {
    const stem = file.name
      .replace(/\.[^.]+$/, "")
      .normalize("NFKC")
      .toLocaleLowerCase("ko")
      .replace(/[^\p{Letter}\p{Number}-]+/gu, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "cover";
    const filename = `${Date.now()}-${stem}-${randomUUID().slice(0, 6)}.${extension}`;
    const path = `public/covers/${filename}`;
    const result = await saveRepositoryFile({
      path,
      content: Buffer.from(await file.arrayBuffer()),
      message: `Upload blog cover: ${filename}`,
    });

    return NextResponse.json({
      success: true,
      path: `/covers/${filename}`,
      commitUrl: result.commit.html_url,
    });
  } catch (error) {
    console.error("Failed to upload studio cover", error);
    return NextResponse.json(
      { error: "이미지를 업로드하지 못했습니다. GitHub 권한을 확인해주세요." },
      { status: 502 },
    );
  }
}
