import {ButtonWithIcon} from '@/components/ButtonWithIcon'
import { LuDownload } from "react-icons/lu"
import { Reaction, columns} from './(dataTable)/columns';
import { DataTable } from './(dataTable)/data-table';
import { data } from './data';
import { ScrollArea } from "@/components/ui/scroll-area"
import {Margin} from "@/components/Margin"
import {SafeReaction} from "@/app/types";
import { fetchReaction } from '../actions/fetchReactions';





export default async function Page() {

  
 const formattedData = await fetchReaction()
  

  

  
  return (
    <ScrollArea className="h-full">
      <Margin>
        <DataTable columns={columns} data={formattedData} />

      </Margin>
    </ScrollArea>
    
    /*
    <ScrollArea className="w-full flex flex-col">
    </ScrollArea>

    

    <div className="mx-6 mt-6 flex justify-between">
      <h1 className="text-2xl font-semibold">All Data</h1>
      <ButtonWithIcon label="Download Dataset" icon={LuDownload} className=''/>
    </div>*/
    
    

  )
}

