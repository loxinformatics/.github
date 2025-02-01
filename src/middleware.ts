import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import AuthMiddleware from "../olyv/authentication/middleware";

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

  // * Block access to paths starting with '/static' or '/media'.
  // * Django stores its static and media in the public folder
  // * accessing them via '/public/static' and '/public/media' respectively as defined in settings.py.
  // * Hence there is no need for Nextjs to have access to these files via '/static' and '/media'
  // * Ensure no files accessible from Nextjs are saved in those two folders.

  if (url.pathname.startsWith("/static") || url.pathname.startsWith("/media")) {
    // Respond with a 403 Forbidden error to prevent Next.js access to static and media assets.
    return new NextResponse("Access Denied", {
      status: 403,
    });
  }

  // Allow the request to proceed for paths not starting with /static or /media.
  return NextResponse.next();
}
