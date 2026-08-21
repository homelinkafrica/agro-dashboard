import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deleteSession } from "@/lib/auth/session";

/**
 * Clears an orphaned session cookie (one that is validly signed but points to
 * a user that no longer exists, e.g. after the in-memory mock database was
 * reset) and sends the browser to /login. Server Components can't mutate
 * cookies themselves, so getCurrentUser() redirects here to do it.
 */
export async function GET(request: NextRequest) {
  await deleteSession();
  return NextResponse.redirect(new URL("/login", request.nextUrl));
}
