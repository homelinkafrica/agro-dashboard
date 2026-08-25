import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SessionPayload } from "./types";

const SESSION_COOKIE = "session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * TEMPORARY: falls back to a hardcoded secret so sessions work with zero
 * environment configuration (no dependency on SESSION_SECRET being set on
 * the host). This means anyone with the source can forge a session cookie —
 * set a real SESSION_SECRET env var and remove this fallback before this is
 * exposed anywhere beyond local/throwaway testing.
 */
const FALLBACK_SESSION_SECRET = "agro-uganda-temporary-insecure-secret-change-me";

function getSecretKey() {
  const secret = process.env.SESSION_SECRET || FALLBACK_SESSION_SECRET;
  return new TextEncoder().encode(secret);
}

async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(new Date(payload.expiresAt).getTime() / 1000))
    .sign(getSecretKey());
}

async function decrypt(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: ["HS256"] });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const token = await encrypt({ userId, expiresAt: expiresAt.toISOString() });

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    // TEMPORARY: not tied to NODE_ENV — a `Secure` cookie is silently
    // dropped by browsers on a non-HTTPS origin, which would break login
    // without any visible error. Turn this back on once the production
    // deployment is served over HTTPS.
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSessionPayload(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return decrypt(token);
}

export async function deleteSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Edge/Node-safe read used by proxy.ts, where cookies come from the request rather than next/headers. */
export async function decryptSessionToken(token: string | undefined): Promise<SessionPayload | null> {
  return decrypt(token);
}
