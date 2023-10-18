import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { Registers, RegistersContext } from "@/contexts/RegistersContext";

const formSchema = z.object({
  value: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface SearchRegisterProps {
  label: string;
  nameInput: string;
}

export function SearchRegister({ label, nameInput }: SearchRegisterProps) {
  const { registers } = useContext(RegistersContext);
  const [registerFiltered, setRegisterFiltered] = useState<Registers[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (nameInput === "category") {
      setRegisterFiltered(
        registers.filter((register) => register.type === "category")
      );
    } else if (nameInput === "locale") {
      setRegisterFiltered(
        registers.filter((register) => register.type === "locale")
      );
    } else if (nameInput === "provider") {
      setRegisterFiltered(
        registers.filter((register) => register.type === "provider")
      );
    }
  }, [nameInput, registers]);

  const recordsPerPage = 5;

  const startIndex = (pageNumber - 1) * recordsPerPage;
  const endIndex = pageNumber * recordsPerPage;
  const displayedRegisters = registerFiltered.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setPageNumber(page);
  };

  function handleSearchRegister({value}: z.infer<typeof formSchema>) {
    const filteredData = registerFiltered.filter(item => item.name.includes(value));

    setRegisterFiltered(() => filteredData)
  }

  return (
    <>
      <Form {...form}>
        <form
          className="w-3/3 flex items-center gap-2 mt-5"
          onSubmit={form.handleSubmit(handleSearchRegister)}
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Busca..." {...field} className="w-full" />
                </FormControl>
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
          {displayedRegisters.map((register) => (
            <TableRow key={register.id}>
              <TableCell className="font-medium cursor-pointer">
                {register.name}
              </TableCell>
            </TableRow>
          ))}
          <div className="text-center mt-2 text-zinc-400">
            Não há nenhuma informação
          </div>
        </TableBody>
      </Table>

      {registerFiltered.length > 0 && (
        <div className="flex justify-center items-center gap-1 text-sm">
          <button
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber === 1}
            className="bg-green-700 hover:bg-green-800 transition ease-in 1s cursor-pointer p-2 rounded-md mt-2"
          >
            Anterior
          </button>
          <div className="bg-zinc-900 px-3 py-2 mt-2 rounded-md font-bold">
            {pageNumber}
          </div>
          <button
            onClick={() => goToPage(pageNumber + 1)}
            disabled={endIndex >= registerFiltered.length}
            className="bg-green-700 hover:bg-green-800 transition ease-in 1s cursor-pointer p-2 rounded-md mt-2"
          >
            Próxima
          </button>
        </div>
      )}
    </>
  );
}
