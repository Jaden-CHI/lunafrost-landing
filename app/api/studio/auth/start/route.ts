import { createHash, randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  getMissingStudioConfig,
  getStudioConfig,
  STUDIO_OAUTH_STATE_COOKIE,
  STUDIO_OAUTH_VERIFIER_COOKIE,
} from "@/lib/studio-auth";

export async function GET(request: NextRequest) {
  if (getMissingStudioConfig().length > 0) {
    return NextResponse.redirect(new URL("/admin/blog?error=config", request.url));
  }

  const { clientId } = getStudioConfig();
  const state = randomBytes(24).toString("base64url");
  const verifier = randomBytes(48).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const callbackUrl = new URL("/api/studio/auth/callback", request.nextUrl.origin);
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", callbackUrl.toString());
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("scope", "read:user");
  authorizeUrl.searchParams.set("code_challenge", challenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  authorizeUrl.searchParams.set("allow_signup", "false");

  const response = NextResponse.redirect(authorizeUrl);
  const cookieOptions = {
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 600,
  };
  response.cookies.set(STUDIO_OAUTH_STATE_COOKIE, state, cookieOptions);
  response.cookies.set(STUDIO_OAUTH_VERIFIER_COOKIE, verifier, cookieOptions);
  return response;
}
