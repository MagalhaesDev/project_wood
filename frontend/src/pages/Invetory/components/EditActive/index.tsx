import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FileEdit } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Actives } from "@/contexts/ActivesContext";
import { api } from "@/services/api";
import { EditInputDialog } from "./components/EditInputDialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

interface EditActiveProps {
  id: string
}

const formSchema = z.object({
  category: z.string().min(1, 'Informe a categoria').max(20,'Máximo de 20 caracteres'),
  description: z.string().min(1,'Informe a descrição').max(30, 'Máximo de 30 caracteres'),
  value_buy: z.coerce.number().min(1,'Informe o valor de compra'),
  rate: z.coerce.number().min(2, { message: "Informe a taxa"}).max(100, { message: 'Valor máximo é 100'}),
  locale: z.string().min(1,'Informe a localização').max(20, 'Máximo de 20 caracteres'),
  date_buy: z.coerce.date().max(new Date(), { message: 'Data superior a data atual'}),
  life_util: z.coerce.date()
}).refine(fields => fields.life_util > fields.date_buy, {
  path: ['life_util'],
  message: 'Data menor que a data de compra'
}).refine(fields => Number.isInteger(fields.value_buy), {
  path: ['value_buy'],
  message: "Digite o valor sem ponto e virgula"
})

export type formSchemaTypeEdit = typeof formSchema

export function EditActive({id}: EditActiveProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const [active, setActives] = useState<Actives>();
  useEffect(() => {
    api
      .get(`http://localhost:3000/actives/${id}`)
      .then((response) => {
        setActives(response.data);
      })

  }, [id]);

  if(!active) return;

  return (
    <Sheet>
      <SheetTrigger className="hover:text-green-700 transition ease-in 1s">
        <FileEdit width={18} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-3">
          <SheetTitle>Editar as informações</SheetTitle>
          <SheetDescription>
            Atualize as informações nos campos abaixo:
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="flex flex-col gap-5">
            <div>
              <EditInputDialog controlInput={form.control} label="Categoria" nameInput="category" defaultValue={active.category} type="text"/>
              <EditInputDialog controlInput={form.control} label="Descrição" nameInput="description" defaultValue={active.description} type="text"/>
              <EditInputDialog controlInput={form.control} label="Valor compra" nameInput="value_buy" defaultValue={active.value_buy} type="number"/>
              <EditInputDialog controlInput={form.control} label="Taxa de depreciação" nameInput="rate" defaultValue={active.rate} type="number"/>
              <EditInputDialog controlInput={form.control} label="Localização" nameInput="locale" defaultValue={active.locale} type="text"/>
              <EditInputDialog controlInput={form.control} label="Data de compra" nameInput="date_buy" defaultValue={active.date_buy} type="date"/>
              <EditInputDialog controlInput={form.control} label="Data final" nameInput="life_util" defaultValue={active.life_util} type="date"/>
            </div>

            <Button
              type="submit"
              className="text-zinc-100 hover:bg-[#16a34a] transition block"
            >
              Atualizar
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
