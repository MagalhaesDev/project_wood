import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

export function FilterActive() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-1 bg-green-900 px-4 rounded-sm hover:bg-[#0D5829] transition ease-in 2s py-1">
        Filtro
        <Filter width={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Localização</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Data compra</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Categoria</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Vida útil</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
