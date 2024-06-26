"use client"

import { RxCross2 } from "react-icons/rx"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { priorities, statuses } from "./data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
//import {orgsyn} from "@/dataset/orgsyn.js"

import prisma from "@/lib/prismadb";
import axios from "axios"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}







{/* 
//helper function to imoort all records to the database manually => called in the add step button below
const createRecord = async () => {

  const rxn = await axios.post('/api/annotations', orgsyn)
  return

}
*/}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter id..."
          value={(table.getColumn("rxID")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("rxID")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {/*table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )*/}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RxCross2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/*<DataTableViewOptions table={table} />*/}
      {/*
      <Button variant="outline" className="text-sm rounded-xl h-10" onClick={createRecord}>
          Add Step
      </Button>
      */}
    </div>
  )
}