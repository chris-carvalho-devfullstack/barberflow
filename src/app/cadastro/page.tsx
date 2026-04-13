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
import { Scissors, Globe, ArrowRight, Loader2, Store } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const [nomeBarbearia, setNomeBarbearia] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Realiza o registo enviando o nome da barbearia nos metadados
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome_barbearia: nomeBarbearia,
          },
          // Redireciona para o callback para confirmar a sessão após o registo
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      toast.success(
        "Conta criada! Verifique o seu e-mail para confirmar o acesso.",
      );

      // Limpa os campos
      setNomeBarbearia("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error("Erro ao conectar com Google");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-[450px] shadow-xl border-zinc-200">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-zinc-900 rounded-2xl text-white shadow-lg">
              <Scissors className="size-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Criar Barbearia
          </CardTitle>
          <CardDescription>
            Comece a gerir o seu negócio hoje mesmo
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome_barbearia">Nome da sua Barbearia</Label>
              <div className="relative">
                <Store className="absolute left-3 top-3 size-4 text-zinc-400" />
                <Input
                  id="nome_barbearia"
                  placeholder="Ex: Barber Shop Vintage"
                  required
                  className="pl-10 focus-visible:ring-zinc-900"
                  value={nomeBarbearia}
                  onChange={(e) => setNomeBarbearia(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail Profissional</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="focus-visible:ring-zinc-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Palavra-passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                required
                className="focus-visible:ring-zinc-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-6"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin size-4 mr-2" />
              ) : null}
              {loading ? "A criar conta..." : "Registar Barbearia"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500 font-medium">
                Ou registe-se com
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-3 border-zinc-200 hover:bg-zinc-50 font-medium py-6"
            onClick={handleGoogleLogin}
          >
            <Globe className="size-4 text-blue-500" />
            Continuar com conta Google
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 pb-8">
          <p className="text-sm text-center text-zinc-600">
            Já tem uma conta ativa?{" "}
            <Link
              href="/login"
              className="text-zinc-900 font-bold hover:underline"
            >
              Entrar agora
            </Link>
          </p>

          <div className="w-full p-4 bg-zinc-100 rounded-xl border border-zinc-200 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                Apoio ao SaaS
              </p>
              <p className="text-[11px] text-zinc-500">
                Precisa de ajuda com o registo?
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-semibold"
              asChild
            >
              <Link href="#">Falar com Suporte</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
