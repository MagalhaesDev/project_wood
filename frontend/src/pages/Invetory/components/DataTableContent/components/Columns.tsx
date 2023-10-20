import { Button } from "@/components/ui/button";
import { Actives } from "@/contexts/ActivesContext";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Info } from "lucide-react";
import { NavLink } from "react-router-dom";
import { DeleteActive } from "../../DeleteActive";

export const columns: ColumnDef<Actives>[] = [
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "locale",
    header: "Localização",
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "provider",
    header: "Fornecedor",
  },
  {
    accessorKey: "date_buy",
    header: () => <div className="text-right">Data de compra</div>,
    cell: ({ row }) => {
      const dateFormatted = new Date(row.getValue("date_buy"));
      const formatted = new Intl.DateTimeFormat("pt-BR").format(dateFormatted);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "value_buy",
    header: () => <div className="text-right">Valor de compra</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value_buy"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right ">Informações</div>,
    cell: ({ row }) => {
      const id: string = row.getValue("id");

      return (
        <div className="flex justify-end gap-2 items-center">
          <NavLink
            className="hover:text-green-700 transition ease-in 1s"
            to={`/actives/${id}`}
          >
            <Info width={18} />
          </NavLink>
          <DeleteActive id={id} />
        </div>
      );
    },
  },
];
