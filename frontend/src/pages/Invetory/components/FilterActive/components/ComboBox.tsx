"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


import {
  Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { BoxItem } from "./BoxItem"


const FormSchema = z.object({
  category: z.string(),
  locale: z.string(),
  provider: z.string(),
})

export type ControlInputTypes = "category" | "provider" | "locale" 
export type formSchemaTypeBox = typeof FormSchema;

export function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function setValue(type: ControlInputTypes, value: string) {
    form.setValue(type, value)
  }
  

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-2 items-center mb-10">
        <BoxItem setValue={setValue} controlInput={form.control} nameInput="category" label="Categoria"/>
        <BoxItem setValue={setValue} controlInput={form.control} nameInput="provider" label="Fornecedor"/>
        <BoxItem setValue={setValue} controlInput={form.control} nameInput="locale" label="Localização"/>
        <Button type="submit" className="mt-5">Filtrar</Button>
      </form>
    </Form>
  )
}
