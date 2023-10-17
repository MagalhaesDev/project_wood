import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
} from "../../../../../../components/ui/form";
import { Control, useFormContext } from "react-hook-form";

import { z } from "zod";
import { formSchemaType } from "../..";
import { ArrowDownCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchRegister } from "../SearchRegister";

type ControlInputTypes =
  | "category"
  | "description"
  | "date_buy"
  | "value_buy"
  | "provider"
  | "nf"
  | "rate"
  | "locale"
  | "life_util";

interface InputDialog {
  nameInput: ControlInputTypes;
  label: string;
  controlInput: Control<z.infer<formSchemaType>>;
  type: string;
  placeholder?: string;
}

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string;
    };
  };
}

export function SelectedDialog({
  nameInput,
  label,
  placeholder,
  controlInput,
  type,
}: InputDialog) {
  const { register, formState } = useFormContext();

  const { errors } = formState as unknown as ErrorsType;

  return (
    <FormField
      name={nameInput}
      control={controlInput}
      render={() => (
        <FormItem>
          <label className="text-sm text-zinc-500">{label}</label>
          <div className="flex items-center relative">
            <FormControl>
              <Input
                disabled
                placeholder={placeholder}
                {...register(nameInput)}
                step="0.01"
                type={type}
                className={`text-zinc-400 ${
                  errors[nameInput]?.message && "border-red-500"
                }`}
              />
            </FormControl>
            <Dialog>
              <DialogTrigger  className=" rounded-sm absolute right-2">
                <ArrowDownCircle
                  size={18}                 
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <SearchRegister label={label}/>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="text-red-800 text-[.75rem] h-2">
            {errors[nameInput]?.message && <p>{errors[nameInput]?.message}</p>}
          </div>
        </FormItem>
      )}
    />
  );
}
