import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,

} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  category: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
})

export function FilterActive() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-1 bg-green-900 px-4 rounded-sm hover:bg-[#0D5829] transition ease-in 2s py-1">
        Filtro
        <Filter width={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 text-sm">

        <Form {...form}>
          <form className="flex flex-col items-center gap-5">
            <div className="flex gap-4">

              <div>
                <FormField
                  name="date_buy"
                  render={() => (
                    <FormItem>
                      <h3 className="mb-2 font-bold text-green-700">
                        Data Inicio:
                      </h3>
                      <FormControl>
                        <Input type="date" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="date_buy"
                  render={() => (
                    <FormItem>
                      <h3 className="mb-2 font-bold text-green-700">
                        Data Final:
                      </h3>
                      <FormControl>
                        <Input type="date" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="text-zinc-100 hover:bg-[#16a34a] transition block w-32"
            >
              Filtrar
            </Button>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
