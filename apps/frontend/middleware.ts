"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return new NextResponse("Unauthorized: No access token found", {
      status: 401,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage", "/statistics"],
};
