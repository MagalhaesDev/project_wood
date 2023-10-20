import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ComboboxForm } from "@/pages/Invetory/components/FilterActive/components/ComboBox"
  
  export function AccordionContentDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Filtagrem</AccordionTrigger>
          <AccordionContent className="absolute">
            <ComboboxForm /> 
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  