import {
  FormControl,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import {  RadioGroupItem } from "@/components/ui/radio-group"


interface RadioGroupItemContentProps {
  value: string,
  title: string
}

export function RadioGroupItemContent({value,title}: RadioGroupItemContentProps) {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
    <FormControl>
      <RadioGroupItem value={value} />
    </FormControl>
    <FormLabel className="font-normal">
      {title}
    </FormLabel>
    </FormItem>
  );
}
