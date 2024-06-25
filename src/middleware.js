import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  if (
    cookies().get("userAfroConnect") &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (request.nextUrl.pathname.includes("/admin")) {
    if (
      !cookies().get("userAfroConnect") ||
      JSON.parse(await cookies().get("userAfroConnect")?.value).role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
  }
  return NextResponse.next();
}
