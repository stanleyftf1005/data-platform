"use client"
import { ColumnDef } from "@tanstack/react-table"
import {LuMoreHorizontal, LuTextSelect} from 'react-icons/lu'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingUI from "@/components/LoadingUI"

import {SafeReaction} from "@/app/types";
import AnnotationSheet from "@/components/AnnotationSheet"
import DialogWrapper from "../annotations/[annotationId]/(components)/DialogWrapper"
import { cn } from "@/lib/utils"
import { steps } from "@/app/types"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reaction = {
  id: string
  rxID: string
  url: string,
  status: String,
  imageUrl: string,
  createdAt: string,
  updatedAt: string,
  annotation: string[],
  steps: steps[],

}

export const StatusStyle = {
  "Pending": "bg-slate-50 border-slate-200 text-slate-500",
  "Completed": "bg-orange-50 border-orange-200 text-orange-500",
  "Approved": "bg-lime-50 border-lime-200 text-lime-500",
  "Rejected": "bg-red-50 border-red-200 text-red-500",
  "Invalid": "bg-amber-50 border-amber-200 text-amber-500",
}


export const columns: ColumnDef<SafeReaction>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      const styling: { [key: string]: string } = StatusStyle;
      const statusClass = styling[status as keyof typeof StatusStyle];
 
      return <div className={cn("py-1 px-4 inline rounded-xl border font-medium text-sm text-center", statusClass)}>{status}</div>
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
    accessorKey: "rxID",
    header: "rxID",
    
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
  {
    id: "link",
    cell: ({ row }) => {
 
      return (
        <Link href={`/annotations/${row.original.id}`}>
          <Button variant="outline" className="text-sm">
            Edit
          </Button>
        </Link>
      )
    },
  },
  {
    id: "annotation",
    cell: ({ row }) => {
 
      return (
        <DialogWrapper label="Annotation" title="Annotation" description="This is the latest version of annotation." icon={<LuTextSelect className="mr-1.5 h-4 w-4 stroke-[2px]"/>}>
            <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                <code className="text-white">
                    {row.original.annotation.map((line) => {
                        return (
                            line + "\n"
                        )
                    })}
                </code>
            </pre>
        </DialogWrapper>
      )
    },
  },
  

  

]
