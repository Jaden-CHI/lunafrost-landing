import { NextRequest, NextResponse } from "next/server";
import { STUDIO_SESSION_COOKIE } from "@/lib/studio-auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin/blog", request.url), 303);
  response.cookies.delete(STUDIO_SESSION_COOKIE);
  return response;
}
