import { NextResponse, type NextRequest } from "next/server";

// Mude de 'export function middleware' para 'export function proxy'
export function proxy(request: NextRequest) {
  return NextResponse.next({
    request: request,
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
