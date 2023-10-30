import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ActivesContext } from "@/contexts/ActivesContext";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Bell, Info } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

export function Notification() {
  const { actives } = useContext(ActivesContext);

  const filteredActives = actives
    .map((active) => {
      const dateFormatted = new Date(active.date_buy).getTime();
      const currentDate = new Date(active.life_util).getTime();

      const differenceMiliseconds = currentDate - dateFormatted;

      const differenceDay = Math.floor(
        differenceMiliseconds / (1000 * 60 * 60 * 24)
      );

      return {
        ...active,
        differenceDay,
      };
    })
    .filter((active) => active.differenceDay < 10);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative flex items-center justify-center  bg-green-900 p-2 rounded-sm hover:bg-[#0D5829] transition ease-in 2s py-1">
        <Bell width={18} />
        <div className="rounded-full bg-red-500 absolute top-[-.4rem] right-[-.5rem] text-[.65rem] w-4">
          {filteredActives.length > 0 && filteredActives.length}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notificaçoes de validade:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filteredActives.length > 0 ? (
          filteredActives.map((active) => (
            <NavLink to={`/actives/${active.id}`} key={active.id}>
              <DropdownMenuItem
                className="cursor-pointer text-zinc-400 flex gap-2 justify-between"
                key={active.id}
              >
                <div className="flex gap-2 items-center justify-center">
                  <Info width={18} />
                  <span className="text-zinc-100">{active.description}</span>
                </div>
                <p>
                  Expira em {active.differenceDay}{" "}
                  {active.differenceDay > 1 ? "dias" : "dia"}
                </p>
              </DropdownMenuItem>
            </NavLink>
          ))
        ) : (
          <div className="flex justify-center items-center gap-2 text-sm text-zinc-400 h-10">
            <Info width={18} />
            <p>Não há notificações</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
