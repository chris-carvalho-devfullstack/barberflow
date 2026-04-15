import { TrendingUp, Users, CalendarCheck, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardChart } from "@/components/dashboard-chart";

// Dados fakes para visualização imediata
const stats = [
  {
    title: "Faturamento Mensal",
    value: "R$ 12.450,00",
    description: "+12% em relação ao mês passado",
    icon: DollarSign,
  },
  {
    title: "Agendamentos Hoje",
    value: "18",
    description: "4 horários disponíveis",
    icon: CalendarCheck,
  },
  {
    title: "Novos Clientes",
    value: "+42",
    description: "Média de 2 por dia",
    icon: Users,
  },
  {
    title: "Taxa de Retorno",
    value: "68%",
    description: "Clientes que voltaram este mês",
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Olá, Christian</h2>
        <p className="text-zinc-500">
          Aqui está o resumo da sua barbearia hoje.
        </p>
      </div>

      {/* Grid de Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-zinc-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Espaço para o Gráfico (que faremos a seguir) */}
      <Card className="col-span-4 shadow-sm">
        <CardHeader>
          <CardTitle>Performance de Faturamento</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardChart />
        </CardContent>
      </Card>
    </div>
  );
}
