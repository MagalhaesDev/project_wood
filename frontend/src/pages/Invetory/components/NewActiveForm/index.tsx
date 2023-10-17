import { Button } from "../../../../components/ui/button";
import { Form } from "../../../../components/ui/form";
import { useForm } from "react-hook-form";
import { InputDialog } from "../InputDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useState } from "react";
import { ActivesContext } from "@/contexts/ActivesContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const formSchema = z
  .object({
    category: z
      .string()
      .min(1, "Informe a categoria")
      .max(20, "Máximo de 20 caracteres"),
    description: z
      .string()
      .min(1, "Informe a descrição")
      .max(30, "Máximo de 30 caracteres"),
    value_buy: z.coerce.number().min(1, "Informe o valor de compra"),
    provider: z
      .string()
      .min(1, "Informe o fornecedor")
      .max(20, "Máximo de 20 caracteres"),
    nf: z.string().max(25, "Máximo de 25 caracteres"),
    rate: z.coerce
      .number()
      .min(2, { message: "Informe a taxa" })
      .max(100, { message: "Valor máximo é 100" }),
    locale: z
      .string()
      .min(1, "Informe a localização")
      .max(20, "Máximo de 20 caracteres"),
    date_buy: z.coerce
      .date()
      .max(new Date(), { message: "Data superior a data atual" }),
    life_util: z.coerce.date(),
  })
  .refine((fields) => fields.life_util > fields.date_buy, {
    path: ["life_util"],
    message: "Data menor que a data de compra",
  })
  .refine((fields) => Number.isInteger(fields.value_buy), {
    path: ["value_buy"],
    message: "Digite o valor sem ponto e virgula",
  });

export type formSchemaType = typeof formSchema;

export function NewActiveForm() {
  const [position, setPosition] = useState("top");
  const { createNewactive } = useContext(ActivesContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmitForm(value: z.infer<typeof formSchema>) {
    createNewactive(value);
    window.location.reload();
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <div className="grid grid-cols-2 gap-2 ">
          <InputDialog
            nameInput="category"
            label="Categoria"
            controlInput={form.control}
            type="text"
          />
          <InputDialog
            nameInput="description"
            label="Descrição"
            controlInput={form.control}
            type="text"
          />
          <InputDialog
            nameInput="value_buy"
            label="Valor compra"
            controlInput={form.control}
            type="number"
          />
          <InputDialog
            nameInput="provider"
            label="Fornecedor"
            controlInput={form.control}
            type="text"
          />
          <InputDialog
            nameInput="nf"
            label="Nota Fiscal"
            placeholder="Opcional"
            controlInput={form.control}
            type="text"
          />
          <InputDialog
            nameInput="rate"
            label="Taxa de depreciação"
            controlInput={form.control}
            type="number"
          />
          <InputDialog
            nameInput="locale"
            label="Localização"
            controlInput={form.control}
            type="text"
          />
          <InputDialog
            nameInput="date_buy"
            label="Data aquisição"
            controlInput={form.control}
            type="date"
          />
          <InputDialog
            nameInput="life_util"
            label="Data final"
            controlInput={form.control}
            type="date"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" >
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition} 
              >
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          type="submit"
          className="text-zinc-100 hover:bg-[#16a34a] transition block"
        >
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
