"use client";

import * as React from "react";
import {
  Scissors,
  Users,
  DollarSign,
  LayoutDashboard,
  Settings,
  Package,
  Calendar,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Agenda", url: "#", icon: Calendar },
  { title: "Serviços", url: "/servicos", icon: Scissors },
  { title: "Produtos", url: "#", icon: Package },
  { title: "Clientes (CRM)", url: "#", icon: Users },
  { title: "Fluxo de Caixa", url: "#", icon: DollarSign },
  { title: "Configurações", url: "#", icon: Settings },
];

export function AppSidebar() {
  const [mounted, setMounted] = React.useState(false);

  // Só renderiza o conteúdo após o componente montar no cliente
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Sidebar collapsible="icon" />;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b h-14 flex items-center px-4">
        <span className="font-bold text-lg tracking-tight">
          Barber<span className="text-zinc-500">Flow</span>
        </span>
      </SidebarHeader>
      <TooltipProvider delayDuration={0}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Gestão Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </TooltipProvider>
      <SidebarRail />
    </Sidebar>
  );
}
