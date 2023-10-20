
import { ClipboardEdit } from "lucide-react";
import { useContext } from "react";
import { ActivesContext } from "@/contexts/ActivesContext";
import { DataTableContent } from "./components/DataTableContent";
import { NavLink } from "react-router-dom";

export function Invetory() {
  const { actives } = useContext(ActivesContext);

  return (
    <main className="px-[2rem]">
      <div className="flex justify-center ">
      <NavLink
            className="hover:text-zinc-400 transition ease-in 1s bg-green-800 px-8 py-1 font-bold rounded-bl-lg"
            to={`/actives`}
          >
            Ativos
          </NavLink>
          <NavLink
            className="hover:text-zinc-400 transition ease-in 1s  px-8 py-1 font-bold rounded-br-lg"
            to={`/graficos`}
          >
            Graficos
          </NavLink>
      </div>
      <DataTableContent />
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
