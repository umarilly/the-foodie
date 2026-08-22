import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  if (nextUrl.pathname.startsWith("/admin") && !isAdmin) {
    const redirectTarget = isLoggedIn ? "/" : "/login";
    return NextResponse.redirect(new URL(redirectTarget, nextUrl));
  }

  if (
    (nextUrl.pathname.startsWith("/account") ||
      nextUrl.pathname.startsWith("/checkout")) &&
    !isLoggedIn
  ) {
    const callbackUrl = encodeURIComponent(
      nextUrl.pathname + nextUrl.search,
    );
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl),
    );
  }
});

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/admin/:path*"],
};
