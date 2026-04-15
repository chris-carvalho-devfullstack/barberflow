"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scissors, Globe, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Login tradicional com E-mail e Senha
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Bem-vindo de volta!");
      window.location.href = "/"; // Redireciona para o dashboard
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  }

  // Login com Google (Essencial para o teste de provedores)
  async function handleGoogleLogin() {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Garante que o redirecionamento passe pelo nosso callback de cookies
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error("Erro ao conectar com Google");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-[400px] shadow-xl border-zinc-200">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-zinc-900 rounded-2xl text-white shadow-lg">
              <Scissors className="size-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            BarberFlow
          </CardTitle>
          <CardDescription>Acesse seu painel administrativo</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail profissional</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@barbearia.com"
                required
                disabled={loading || googleLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-visible:ring-zinc-900"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="#"
                  className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                disabled={loading || googleLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-visible:ring-zinc-900"
              />
            </div>
            <Button
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white transition-all"
              type="submit"
              disabled={loading || googleLoading}
            >
              {loading ? (
                <Loader2 className="animate-spin size-4 mr-2" />
              ) : null}
              {loading ? "Autenticando..." : "Entrar no Sistema"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500 font-medium">
                Ou
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-3 border-zinc-200 hover:bg-zinc-50 transition-all font-medium"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <Globe className="size-4 text-red-500" />
            )}
            Entrar com conta Google
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 pb-8">
          <p className="text-sm text-center text-zinc-600">
            Dono de barbearia?{" "}
            <Link
              href="/cadastro"
              className="text-zinc-900 font-bold hover:underline"
            >
              Crie sua conta SaaS
            </Link>
          </p>

          {/* Seção de Escape para Clientes Finais */}
          <div className="w-full p-4 bg-zinc-100 rounded-xl border border-zinc-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              <p className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                Área do Cliente
              </p>
            </div>
            <p className="text-[12px] text-zinc-500 leading-relaxed">
              Deseja apenas agendar um corte? Procure o link da sua barbearia ou
              use nosso portal de busca.
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-xs text-zinc-900 font-semibold gap-1 group"
              asChild
            >
              <Link href="/agendar">
                Ir para Agendamentos{" "}
                <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
