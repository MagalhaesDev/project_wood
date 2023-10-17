import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2),
  type: z.enum(["provider", "category", "locale"]),
});



export function NewRegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  function handleNewRegister(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="w-2/3 space-y-6"
        onSubmit={form.handleSubmit(handleNewRegister)}
      >
        <FormField
          control={form.control}
          name="type"
          render={({field}) => (
            <FormItem >
              <FormLabel>Tipo:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de cadastro:" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="provider">Fornecedor</SelectItem>
                  <SelectItem value="category">Categoria</SelectItem>
                  <SelectItem value="locale">Localização</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
            
          )}
          
        />
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nome:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Cadastro</Button>
      </form>
    </Form>
  );
}
