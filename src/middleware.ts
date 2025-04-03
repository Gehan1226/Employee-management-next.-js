import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRequiredPaths = ["/account-selection", "/manager"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const loginPage = new URL("/user-login", request.url);
  const accountSelectionPage = new URL("/account-selection", request.url);

  const requiresAuth = authRequiredPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!accessToken && requiresAuth) {
    return NextResponse.redirect(loginPage);
  }

  if (
    accessToken &&
    (request.nextUrl.pathname === "/user-login" ||
      request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(accountSelectionPage);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/account-selection", "/manager/:path*", "/user-login"],
};
