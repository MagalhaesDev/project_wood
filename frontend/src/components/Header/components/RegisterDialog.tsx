import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClipboardCheck } from "lucide-react";
import { NewRegisterForm } from "./NewRegisterForm";

export function RegisterDialog() {
    return (
        <Dialog>
        <DialogTrigger className="flex items-center justify-center gap-1 bg-green-900 px-4 rounded-sm hover:bg-[#0D5829] transition ease-in 2s py-1">
         Cadastro <ClipboardCheck width={16} />
        </DialogTrigger>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Cadastro</DialogTitle>
            <DialogDescription>
              Fornecedor / Categoria / Localização
            </DialogDescription>
            <NewRegisterForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
}