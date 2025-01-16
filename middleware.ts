import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { AuthMiddleware } from "./zeytinus/ui/auth/context";

export async function middleware(request: NextRequest) {
  const authResponse = await AuthMiddleware(request);
  if (authResponse) return authResponse;

  return NextResponse.next();
}
