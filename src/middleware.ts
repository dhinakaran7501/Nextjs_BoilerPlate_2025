import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./utils/helpers";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isAuthenticated(req)) {
    const loginURL = new URL("/", req.nextUrl.origin);
    loginURL.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginURL);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/about/:path*"],
};
