import { NextRequest, NextResponse } from "next/server";
import {
  createStudioSession,
  getStudioConfig,
  STUDIO_OAUTH_STATE_COOKIE,
  STUDIO_OAUTH_VERIFIER_COOKIE,
  STUDIO_SESSION_COOKIE,
  studioSessionMaxAge,
} from "@/lib/studio-auth";

interface GitHubTokenResponse {
  access_token?: string;
  error?: string;
}

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(STUDIO_OAUTH_STATE_COOKIE)?.value;
  const verifier = request.cookies.get(STUDIO_OAUTH_VERIFIER_COOKIE)?.value;
  const destination = new URL("/admin/blog", request.url);

  if (!code || !state || !expectedState || state !== expectedState || !verifier) {
    destination.searchParams.set("error", "oauth");
    return NextResponse.redirect(destination);
  }

  const { clientId, clientSecret, allowedLogin } = getStudioConfig();
  const callbackUrl = new URL("/api/studio/auth/callback", request.nextUrl.origin);
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: callbackUrl.toString(),
      code_verifier: verifier,
    }),
    cache: "no-store",
  });
  const token = (await tokenResponse.json()) as GitHubTokenResponse;

  if (!tokenResponse.ok || !token.access_token) {
    destination.searchParams.set("error", "oauth");
    return NextResponse.redirect(destination);
  }

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token.access_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  const user = (await userResponse.json()) as GitHubUser;

  if (
    !userResponse.ok ||
    !user.login ||
    user.login.toLowerCase() !== allowedLogin.toLowerCase()
  ) {
    destination.searchParams.set("error", "forbidden");
    return NextResponse.redirect(destination);
  }

  const response = NextResponse.redirect(destination);
  response.cookies.set(
    STUDIO_SESSION_COOKIE,
    createStudioSession({
      login: user.login,
      name: user.name ?? user.login,
      avatar: user.avatar_url,
    }),
    {
      httpOnly: true,
      secure: request.nextUrl.protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: studioSessionMaxAge(),
    },
  );
  response.cookies.delete(STUDIO_OAUTH_STATE_COOKIE);
  response.cookies.delete(STUDIO_OAUTH_VERIFIER_COOKIE);
  return response;
}
