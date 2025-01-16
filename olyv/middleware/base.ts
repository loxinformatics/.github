import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function BaseMiddleware(request: NextRequest) {
  const url = request.nextUrl;

  // Block access to paths starting with /api/static or /api/media
  if (
    url.pathname.startsWith("/api/static") ||
    url.pathname.startsWith("/api/media")
  ) {
    return new NextResponse(
      "Access Denied: Only accessible from django backend.",
      { status: 403 }
    ); // Respond with a 403 Forbidden
  }

  // Allow other requests to proceed
  return NextResponse.next();
}
