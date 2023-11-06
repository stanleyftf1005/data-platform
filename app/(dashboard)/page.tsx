import {ButtonWithIcon} from '@/components/ButtonWithIcon'
import { LuDownload } from "react-icons/lu"
import { Records, columns } from './(dataTable)/columns';
import { DataTable } from './(dataTable)/data-table';
import { data } from './data';
import { ScrollArea } from "@/components/ui/scroll-area"
import {Margin} from "@/components/Margin"



export default function Page() {
  const total = 3000;
  const annotated = 500;
  const unannotated = total - annotated;

  
  return (
    <Margin>
      <DataTable columns={columns} data={data} /> 
    </Margin>
    
    /*
    <ScrollArea className="w-full flex flex-col">
    </ScrollArea>

    

    <div className="mx-6 mt-6 flex justify-between">
      <h1 className="text-2xl font-semibold">All Data</h1>
      <ButtonWithIcon label="Download Dataset" icon={LuDownload} className=''/>
    </div>*/
    
    

  )
}

