import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"  
import { Check, ChevronsUpDown } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Actives, ActivesContext } from "@/contexts/ActivesContext"
import { ControlInputTypes } from "./ComboBox"
import { Control } from "react-hook-form"



interface BoxItemProps {
    setValue: (type: ControlInputTypes, value: string) => void;
    controlInput: Control,
    nameInput: ControlInputTypes,
    label: string
}

export function BoxItem({setValue, controlInput, nameInput, label}:BoxItemProps) {
  const { actives } = useContext(ActivesContext);
  const [ itemFilter, setItemFilter ] = useState<Actives[]>([]);

  useEffect(() => {
    const contagem: {[nameInput: string]: number } = {};
    const objetosFiltrados = actives.filter(obj => {
      if (contagem[obj[nameInput]]) {
        contagem[obj[nameInput]]++;
      } else {
        contagem[obj[nameInput]] = 1;
      }
      return contagem[obj[nameInput]] === 1;
    });
    setItemFilter(objetosFiltrados);
  }, [actives,nameInput]);

  

    return (
        <FormField
          control={controlInput}
          name={nameInput}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? actives.find(
                            (active) => active[nameInput] === field.value
                          )?.[nameInput]
                        : label}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Pesquise..." />
                    <CommandEmpty>Não há {label}</CommandEmpty>
                    <CommandGroup>
                      {itemFilter.map((active) => (
                        <CommandItem
                          value={active[nameInput]}
                          key={active.id}
                          onSelect={() => {
                            setValue(nameInput, active[nameInput])
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              active[nameInput] === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {active[nameInput]}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
    )
}