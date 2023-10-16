import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ActivesContext } from "@/contexts/ActivesContext";
import { Trash2 } from "lucide-react";
import { useContext } from "react";

interface DeleteActiveProps {
  id: string
}

export function DeleteActive({id}: DeleteActiveProps) {
  const { removeActive } = useContext(ActivesContext)

  function handleRemoveActive() {
    removeActive(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2
          width={18}
          className="hover:text-green-700 transition ease-in 1s cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Atenção</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esse item permanentemente? após a exclusão não será possivel a visualização desse ativo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <button onClick={() => handleRemoveActive()}>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
