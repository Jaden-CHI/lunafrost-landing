import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const STUDIO_SESSION_COOKIE = "lf_studio_session";
export const STUDIO_OAUTH_STATE_COOKIE = "lf_studio_oauth_state";
export const STUDIO_OAUTH_VERIFIER_COOKIE = "lf_studio_oauth_verifier";

const SESSION_MAX_AGE = 60 * 60 * 12;

export interface StudioSession {
  login: string;
  name: string;
  avatar: string;
  expiresAt: number;
}

export function getStudioConfig() {
  return {
    clientId: process.env.GITHUB_OAUTH_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET ?? "",
    sessionSecret: process.env.STUDIO_SESSION_SECRET ?? "",
    allowedLogin:
      process.env.STUDIO_ALLOWED_GITHUB_LOGIN ??
      process.env.GITHUB_REPO_OWNER ??
      "Jaden-CHI",
    contentToken: process.env.GITHUB_CONTENT_TOKEN ?? "",
    repoOwner: process.env.GITHUB_REPO_OWNER ?? "Jaden-CHI",
    repoName: process.env.GITHUB_REPO_NAME ?? "lunafrost-landing",
    branch: process.env.GITHUB_BRANCH ?? "main",
  };
}

export function getMissingStudioConfig(): string[] {
  const config = getStudioConfig();
  const required: Array<[keyof typeof config, string]> = [
    ["clientId", "GITHUB_OAUTH_CLIENT_ID"],
    ["clientSecret", "GITHUB_OAUTH_CLIENT_SECRET"],
    ["sessionSecret", "STUDIO_SESSION_SECRET"],
    ["contentToken", "GITHUB_CONTENT_TOKEN"],
  ];

  return required.filter(([key]) => !config[key]).map(([, envName]) => envName);
}

function sign(payload: string) {
  const { sessionSecret } = getStudioConfig();
  if (!sessionSecret) return "";
  return createHmac("sha256", sessionSecret).update(payload).digest("base64url");
}

export function createStudioSession(session: Omit<StudioSession, "expiresAt">) {
  const payload = Buffer.from(
    JSON.stringify({ ...session, expiresAt: Date.now() + SESSION_MAX_AGE * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export async function getStudioSession(): Promise<StudioSession | null> {
  const token = (await cookies()).get(STUDIO_SESSION_COOKIE)?.value;
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  if (!expected) return null;

  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as StudioSession;
    if (session.expiresAt < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export function studioSessionMaxAge() {
  return SESSION_MAX_AGE;
}
