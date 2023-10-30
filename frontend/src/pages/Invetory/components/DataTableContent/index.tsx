import { useContext } from "react"
import { ActivesContext } from "@/contexts/ActivesContext"
import { DataTable } from "./components/DataTable"
import { columns } from "./components/Columns"
 
 
export function DataTableContent() {
  const { actives, activesFiltered } = useContext(ActivesContext);
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={activesFiltered.length > 0 ? activesFiltered : actives} />
    </div>
  )
}