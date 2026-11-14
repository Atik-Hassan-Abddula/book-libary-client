
import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("booknook_token")?.value;

  const protectedRoutes = [
    "/profile",
    "/add-book",
    "/my-books",
    "/my-borrows",
  ];

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
  ],
};
