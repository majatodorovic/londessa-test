import { NextResponse } from "next/server";

export function middleware(req, ev) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.href?.split("?")?.[0]);
  requestHeaders.set("x-base_url", req.nextUrl.origin);
  requestHeaders.set("x-canonical", req.nextUrl.href);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
