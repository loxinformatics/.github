import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AuthMiddleware } from "../olyv/middleware/auth";
import { BaseMiddleware } from "../olyv/middleware/base";

const middlewares = [BaseMiddleware, AuthMiddleware]; // List middlewares here - they will be executed in this order.

export async function middleware(request: NextRequest) {
  for (const mw of middlewares) {
    const response = mw(request);
    if (response) {
      return response; // If a middleware handles the request, return the response immediately
    }
  }

  return NextResponse.next(); // Allow the request to proceed if no middleware handled it
}
