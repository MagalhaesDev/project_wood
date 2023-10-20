import { LogOut, User2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Notification } from "@/pages/Invetory/components/Notification";
import { AccordionContentDemo } from "./components/AccordionContentDemo";

export function Header() {
  return (
    <>
      <header className="flex justify-between items-center mx-10 my-3">
        <h1 className="text-2xl">
          <strong className="text-[#16a34a]">Wood</strong>Actives
        </h1>
        <div className="flex gap-5">
         
        </div>
        <div className="flex items-center gap-7 ">
          <AccordionContentDemo />
          <Notification />
          <div className="flex gap-3 ">
            <User2 className="text-[#16a34a]" />
            <p>Mateus</p>
          </div>
          <LogOut
            size={62}
            className="text-[#16a34a] cursor-pointer hover:text-[#0D5829] ease-linear transition 1s"
          />
        </div>
      </header>
      <Separator />
    </>
  );
}
