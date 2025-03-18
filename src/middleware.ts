import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./utils/helpers";

const protectedRoutes = ["/dashboard"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isAuthenticated(req) && protectedRoutes.includes(pathname)) {
    const loginURL = new URL("/login", req.nextUrl.origin);
    loginURL.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginURL);
  }
  return NextResponse.next();
}
