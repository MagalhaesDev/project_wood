import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../../components/ui/form";
import { Control, useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchemaTypeEdit } from "..";

type ControlInputTypes = "category" | "description" | "date_buy" | "value_buy" | "rate" | "locale" | "life_util"

interface EditInputDialog {
  controlInput: Control<z.infer<formSchemaTypeEdit>>,
  nameInput: ControlInputTypes,
  defaultValue: string | number ,
  label: string,
  type: string
}

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export function EditInputDialog({controlInput, defaultValue, label, nameInput, type}: EditInputDialog) {
  const { register, formState } = useFormContext()

  const { errors } = formState as unknown as ErrorsType

  return (
    <FormField
      control={controlInput}
      name={nameInput}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
             <Input defaultValue={defaultValue} {...register(nameInput)} step="0.01" type={type} className={`text-zinc-400 ${errors[nameInput]?.message && 'border-red-500'}`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}