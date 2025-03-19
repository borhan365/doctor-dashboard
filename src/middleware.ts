import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isVerifyEmailPage =
    request.nextUrl.pathname.startsWith("/auth/verify-email");
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // Check for authentication cookie
  const authCookie = request.cookies.get("doctor-authenticated");
  const isAuthenticated = authCookie?.value === "true";

  // If on auth page (except verify-email) and authenticated, redirect to dashboard
  if (isAuthPage && !isVerifyEmailPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If on dashboard page and not authenticated, redirect to login
  if (isDashboardPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/api/:path*"],
};
