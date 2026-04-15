import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Repassando o request para o next() para o ESLint e TypeScript não bloquearem o build
  return NextResponse.next({
    request: request,
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
