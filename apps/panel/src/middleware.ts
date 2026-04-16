// apps/panel/src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";

// No Next 15, podemos voltar a usar o runtime edge sem problemas

export function middleware(request: NextRequest) {
  return NextResponse.next({
    request: request,
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
