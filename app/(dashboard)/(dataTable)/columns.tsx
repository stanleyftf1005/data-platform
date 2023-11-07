"use client"
import { ColumnDef } from "@tanstack/react-table"
import {LuMoreHorizontal} from 'react-icons/lu'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Records = {
  id: string
  url: string
  status: "pending" | "processed" | "approved" | "rejected"
}



export const columns: ColumnDef<Records>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status:string = row.getValue("status")
 
      return <div className="py-1 px-3 inline rounded-md font-normal text-sm text-center bg-zinc-200">{status}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/*
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            */}
            
            <DropdownMenuItem>Edit Record</DropdownMenuItem>
            <DropdownMenuItem>Delete Record</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

  

]
