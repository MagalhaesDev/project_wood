import { ActiveList } from "./components/ActiveList";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, BadgeInfo, QrCode, Wrench } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ActivesContext } from "@/contexts/ActivesContext";

export function Active() {
  const { actives } = useContext(ActivesContext);
  const navigate = useNavigate();
  const params = useParams();
  let valueResidual = 0;

  const activeSelected = actives.find(active => active.id === params.id);

  if(activeSelected) {
    const dateActiveMiliseconds = new Date().getTime() - new Date(activeSelected.date_buy).getTime();
    const dateActiveMonth = dateActiveMiliseconds / (30.44 * 24 * 60 * 60 * 1000);
    const rateDeprecated = dateActiveMonth * activeSelected.rate;
    valueResidual = activeSelected.value_buy - (activeSelected.value_buy * rateDeprecated) / 100;
  }
  
  

  return (
   activeSelected &&  <main className="mx-[10rem]">
   <div className="flex items-center justify-between">
     <button onClick={() => navigate(-1)}>
       <ArrowLeftToLine
         width={48}
         strokeWidth={3}
         className="text-green-700 transition ease-in cursor-pointer hover:text-white"
       />
     </button>
     <h2 className="text-2xl center my-5 text-white font-bold">
       {activeSelected?.description}
     </h2>
     <Button className="font-bold text-zinc-100 flex items-center justify-center gap-1">
       QRCODE
       <QrCode width={18} strokeWidth={3} />
     </Button>
   </div>
   <Separator className="h-[2px] mb-5 bg-zinc-700" />
   <h3 className=" font-bold text-lg text-zinc-300 ">Informações:</h3>
   <ul className="grid grid-cols-3  justify-center items-center  px-3 rounded-md bg-zinc-900">
     <ActiveList title="Categoria:" description={activeSelected.category} />
     <ActiveList title="Data aquisição:" description={new Intl.DateTimeFormat("pt-BR").format(new Date(activeSelected.date_buy))} />
     <ActiveList title="Valor compra:" description={new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(activeSelected.value_buy)} />
     <ActiveList title="Fornecedor:" description={activeSelected.provider} />
     <ActiveList title="Nota fiscal:" description={activeSelected.nf} />
     <ActiveList title="Taxa de depreciação:" description={`${activeSelected.rate}%`} />
     <ActiveList title="Localização:" description={activeSelected.locale} />
     <ActiveList title="Vida útil:" description="132 dias" />
     <ActiveList title="Valor residual:" description={new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(valueResidual)} />
   </ul>

   <Separator className="my-4 h-[1px] mb-5 bg-zinc-700" />

   <h3 className=" font-bold text-lg text-zinc-300 mt-5">Quantidade de:</h3>

   <ul className="grid grid-cols-3  justify-center items-center  px-3 rounded-md bg-zinc-900">
     <ActiveList title="Itens do fornecedor:" description="21" />
     <ActiveList title="Movimentações:" description="4" />
     <ActiveList title="Manutenção:" description="2" />
   </ul>

   <Separator className="my-4 h-[1px] mb-5 bg-zinc-700" />

   <h3 className="font-bold text-lg text-zinc-300 mt-5">
     Histórico de Manutenção:
   </h3>
   <div className="flex flex-col gap-4 text-zinc-400 text-lg justify-center items-center  p-5 rounded-md bg-zinc-900">
     <Wrench />
     <p>Não há nenhuma manutenção</p>
   </div>

   <Separator className="my-4 h-[1px] mb-5 bg-zinc-700" />

   <h3 className="font-bold text-lg text-zinc-300 mt-5">
     Histórico de Movimentação:
   </h3>
   <div className="flex flex-col gap-4 text-zinc-400 text-lg justify-center items-center  p-5 rounded-md bg-zinc-900">
     <BadgeInfo />
     <p>Não há nenhuma movimentação</p>
   </div>
 </main>
  );
}
