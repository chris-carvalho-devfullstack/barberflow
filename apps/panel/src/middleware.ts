import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    });

    // Validar se as variáveis existem ANTES de instanciar o Supabase
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      throw new Error(
        "Variáveis de ambiente do Supabase estão ausentes no runtime do Cloudflare.",
      );
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const pathname = request.nextUrl.pathname;

    const isPublicRoute =
      pathname.startsWith("/login") ||
      pathname.startsWith("/cadastro") ||
      pathname.startsWith("/auth") ||
      pathname.startsWith("/agendar");

    if (!session && !isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    if (
      session &&
      (pathname.startsWith("/login") || pathname.startsWith("/cadastro"))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch (error: unknown) {
    // Verificação de tipo segura para agradar ao TypeScript/ESLint
    const errorMessage = error instanceof Error ? error.message : String(error);

    // ESTA É A MAGIA: Em vez de erro 1101, vai ver isto no ecrã!
    return new NextResponse(
      JSON.stringify({
        erro_critico: "O Middleware falhou",
        mensagem: errorMessage,
        variaveis_carregadas: {
          URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Existe" : "Falta",
          KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Existe" : "Falta",
        },
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
