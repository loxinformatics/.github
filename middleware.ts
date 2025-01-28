import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AuthMiddleware } from "./components/auth/middleware";

// List the middlewares here. They will be executed in the order they appear.
const middlewares = [AssetsMiddleware, AuthMiddleware];

export async function middleware(request: NextRequest) {
  for (const mw of middlewares) {
    const response = mw(request);
    if (response) {
      return response; // If the middleware handles the request, return the response immediately.
    }
  }

  // Allow the request to proceed if no middleware handled it.
  return NextResponse.next();
}

function AssetsMiddleware(request: NextRequest) {
  const url = request.nextUrl;

  // Block access to paths starting with /static or /media.
  // These folders are part of the public directory and handled by Django.
  if (url.pathname.startsWith("/static") || url.pathname.startsWith("/media")) {
    // Respond with a 403 Forbidden error to prevent Next.js access to static and media assets.
    return new NextResponse("Access Denied", {
      status: 403,
    });
  }

  // Allow the request to proceed for paths not starting with /static or /media.
  return NextResponse.next();
}
