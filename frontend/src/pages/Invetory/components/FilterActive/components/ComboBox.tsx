import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BoxItem } from "./BoxItem";
import { useContext } from "react";
import { ActivesContext } from "@/contexts/ActivesContext";

export type ControlInputTypes = "category" | "provider" | "locale";


export function ComboboxForm() {
  const { filterActive } = useContext(ActivesContext)
  const form = useForm();

  function setValue(type: ControlInputTypes, value: string) {
    form.setValue(type, value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    filterActive(data)
  }

  function handleRemoveFilter() {
    window.location.reload();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-2 items-center mb-10 bg-zinc-900 p-2 rounded-md"
      >
        <BoxItem
          setValue={setValue}
          controlInput={form.control}
          nameInput="category"
          label="Categoria"
        />
        <BoxItem
          setValue={setValue}
          controlInput={form.control}
          nameInput="provider"
          label="Fornecedor"
        />
        <BoxItem
          setValue={setValue}
          controlInput={form.control}
          nameInput="locale"
          label="Localização"
        />
        <div className="flex gap-3">
          <Button
            type="submit"
            className="mt-5 bg-transparent border-[.05rem] text-zinc-100 hover:bg-green-800"
          >
            Filtrar
          </Button>
          <Button
            type="reset"
            className="mt-5 bg-transparent border-[.05rem] text-zinc-200 hover:bg-red-800"
            onClick={handleRemoveFilter}
          >
            Remover
          </Button>
        </div>
      </form>
    </Form>
  );
}
