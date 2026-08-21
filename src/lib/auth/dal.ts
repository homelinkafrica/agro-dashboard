import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { findUserById } from "./db";
import { getSessionPayload } from "./session";
import type { SessionUser } from "./types";

/** Verifies the session cookie, redirecting to /login if missing or invalid. */
export const verifySession = cache(async () => {
  const session = await getSessionPayload();
  if (!session?.userId) {
    redirect("/login");
  }
  return { userId: session.userId };
});

/** Returns the signed-in user (without the password hash), redirecting to /login if unauthenticated. */
export const getCurrentUser = cache(async (): Promise<SessionUser> => {
  const { userId } = await verifySession();
  const user = findUserById(userId);

  if (!user) {
    // The signed cookie is valid but points to a user that no longer exists
    // (e.g. the in-memory mock database was reset). Server Components can't
    // clear cookies themselves, so hand off to a route handler that can —
    // otherwise a stale cookie would bounce forever between "/" and "/login".
    redirect("/api/clear-session");
  }

  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
});
