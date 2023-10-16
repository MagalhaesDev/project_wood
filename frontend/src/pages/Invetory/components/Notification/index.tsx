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

export function Notification() {
  const { actives } = useContext(ActivesContext);
  let differenceInDaysFormatted: number;

  const activesMatutiry = actives.filter(active => {
    const dateFormatted = new Date(active.date_buy).getTime();
    const currentDate  = new Date(active.life_util).getTime();

    const differenceMiliseconds = currentDate - dateFormatted;

    const differenceDay = Math.floor(differenceMiliseconds / (1000 * 60 * 60 * 24));

    differenceInDaysFormatted = differenceDay

    if(differenceDay < 10) {
      return active;
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center  bg-green-900 p-2 rounded-sm hover:bg-[#0D5829] transition ease-in 2s py-1">
        <Bell width={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notificaçoes de validade:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {activesMatutiry.map(active => (
          <DropdownMenuItem className="cursor-pointer text-zinc-400 flex gap-2 justify-around">
          <div className="flex gap-2 items-center">
            <Info width={18} />
            <span className="text-zinc-100">
              {active.description}
            </span>
          </div>
          <p>Expira em {differenceInDaysFormatted} dias</p>
        </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
