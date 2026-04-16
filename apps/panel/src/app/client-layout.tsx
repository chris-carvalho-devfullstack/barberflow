"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "@/components/user-nav";
import { Providers } from "@/components/providers";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPublicRoute =
    pathname === "/login" ||
    pathname === "/cadastro" ||
    pathname.startsWith("/auth");

  return (
    <Providers>
      {isPublicRoute ? (
        <main>{children}</main>
      ) : (
        <>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <h1 className="text-sm font-medium">Painel Administrativo</h1>
              </div>
              <UserNav />
            </header>
            <div className="p-6">{children}</div>
          </SidebarInset>
        </>
      )}
    </Providers>
  );
}