import { Plus, MoreHorizontal, Scissors, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const servicos = [
  {
    id: 1,
    nome: "Corte Degradê",
    categoria: "Cabelo",
    preco: "R$ 50,00",
    tempo: "45 min",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Barba Terapia",
    categoria: "Barba",
    preco: "R$ 40,00",
    tempo: "30 min",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Combo Premium",
    categoria: "Combo",
    preco: "R$ 80,00",
    tempo: "1h 15min",
    status: "Inativo",
  },
];

export default function ServicosPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-100 rounded-lg">
            <Scissors className="size-5 text-zinc-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Serviços</h2>
            <p className="text-zinc-500">
              Gerencie o cardápio e preços da sua barbearia.
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" /> Novo Serviço
        </Button>
      </div>

      {/* Tabela de Serviços */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serviço</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-zinc-500" />
                  <span>Tempo</span>
                </div>
              </TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicos.map((servico) => (
              <TableRow key={servico.id} className="hover:bg-zinc-50/50">
                <TableCell className="font-medium text-zinc-900">
                  {servico.nome}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {servico.categoria}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-600">{servico.tempo}</TableCell>
                <TableCell className="font-semibold text-zinc-900">
                  {servico.preco}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      servico.status === "Ativo" ? "default" : "secondary"
                    }
                    className={
                      servico.status === "Ativo"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                        : ""
                    }
                  >
                    {servico.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer">
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 cursor-pointer">
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
