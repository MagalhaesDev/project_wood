import {
  DropdownMenu,
  DropdownMenuContent,
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
