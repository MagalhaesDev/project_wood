import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface SearchRegisterProps {
    label: string;
}

export function SearchRegister({label}: SearchRegisterProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleSearchRegister(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearchRegister)}
          className="w-3/3 flex items-center gap-2 mt-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Busca..." {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Pesquisar</Button>
        </form>
      </Form>
      <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="text-zinc-100">{label}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow >
            <TableCell className="font-medium cursor-pointer">Item</TableCell>
          </TableRow>
      </TableBody>
    </Table>
    </>
  );
}
