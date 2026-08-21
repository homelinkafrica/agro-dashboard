import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSessionToken } from "@/lib/auth/session";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  const token = req.cookies.get("session")?.value;
  const session = await decryptSessionToken(token);
  const isAuthenticated = Boolean(session?.userId);

  if (!isAuthenticated && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
