"use client"

import { useForm } from "react-hook-form"



import {
  Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { BoxItem } from "./BoxItem"



export type ControlInputTypes = "category" | "provider" | "locale" 

export function ComboboxForm() {
  const form = useForm()

  function setValue(type: ControlInputTypes, value: string) {
    form.setValue(type, value)
  }
  

  function onSubmit(data: any) {
    console.log(data)
  }

  function handleRemoveFilter() {
    window.location.reload()
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-2 items-center mb-10">
        <BoxItem setValue={setValue} controlInput={form.control} nameInput="category" label="Categoria"/>
        <BoxItem setValue={setValue} controlInput={form.control} nameInput="provider" label="Fornecedor"/>
        <BoxItem setValue={setValue} controlInput={form.control} nameInput="locale" label="Localização"/>
        <Button type="submit" className="mt-5">Filtrar</Button>
        <Button type="reset" className="mt-5 bg-red-700 text-zinc-200 hover:bg-red-800" onClick={handleRemoveFilter}>Remover</Button>
      </form>
    </Form>
  )
}
