import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRequiredPaths = ["/account-selection", "/manager"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isProtected = authRequiredPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (isProtected && !refreshToken) {
    const loginUrl = new URL("/user-login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/account-selection", "/manager/:path*", "/user-login"],
};
