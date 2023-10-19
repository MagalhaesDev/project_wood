import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogNewActive } from "./components/DialogNewActive";
import { NavLink } from "react-router-dom";
import { ClipboardEdit, Info, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DeleteActive } from "./components/DeleteActive";
import { useContext } from "react";
import { ActivesContext } from "@/contexts/ActivesContext";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { ComboboxForm } from "./components/FilterActive/components/ComboBox";

export function Invetory() {
  const { actives } = useContext(ActivesContext);

  return (
    <main className="mt-5 px-[5rem]">
      <div className="flex">
      <ComboboxForm /> 
      </div>
      <div className="flex justify-between mb-1">
        <div>
          <button className="bg-green-900 px-7 py-1.5 font-bold rounded-tl-sm">
            Listagem
          </button>
          <button className="border-0 border-white transition ease-in 2s px-4 py-1 font-bold rounded-tr-sm">
            Gráfico
          </button>
        </div>
        <div>
          <form action="">
            <label htmlFor="" className="flex items-center gap-2">
              <Input
                className="border-green-800 w-[20rem]"
                placeholder="Pesquise aqui..."
              />
              <Search className="text-green-800 cursor-pointer hover:text-white transition ease-in 2s" />
            </label>
          </form>
        </div>
        <div className="flex items-center justify-center gap-4">
       
          <DialogNewActive />
        </div>
      </div>
      <Table className="mt-1">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-white">Categoria</TableHead>
            <TableHead className="text-white">Data compra</TableHead>
            <TableHead className="text-white">Descrição</TableHead>
            <TableHead className="text-right text-white">Localização</TableHead>
            <TableHead className="text-right text-white">Valor atual</TableHead>
            <TableHead className="text-right text-white">Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actives.length > 0 &&
            actives.map((active) => (
              <TableRow key={active.id}>
                <TableCell className="font-medium">{active.category}</TableCell>
                <TableCell>
                  {dateFormatter.format(new Date(active.date_buy))}
                </TableCell>
                <TableCell>{active.description}</TableCell>
                <TableCell className="text-right">{active.locale}</TableCell>
                <TableCell className="text-right">
                  {priceFormatter.format(Number(active.value_buy))}
                </TableCell>
                <TableCell className="flex justify-end gap-3">
                  <NavLink
                    className="hover:text-green-700 transition ease-in 1s"
                    to={`/actives/${active.id}`}
                  >
                    <Info width={18} />
                  </NavLink>
                  <DeleteActive id={active.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {actives.length <= 0 && (
        <div className="text-zinc-500 flex flex-col items-center mt-10 gap-3 ">
          <ClipboardEdit size={48} />
          <h3>Não há nenhum ativo registrado</h3>
          <span className="text-sm">
            ( para registrar um ativo clique em novo ativo )
          </span>
        </div>
      )}
    </main>
  );
}
