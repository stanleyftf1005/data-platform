import {ButtonWithIcon} from '@/components/ButtonWithIcon'
import { LuDownload } from "react-icons/lu"
import { Reaction, columns, steps} from './(dataTable)/columns';
import { DataTable } from './(dataTable)/data-table';
import { data } from './data';
import { ScrollArea } from "@/components/ui/scroll-area"
import {Margin} from "@/components/Margin"
import prisma from "@/lib/prismadb";





export default async function Page() {
  const db_data = await prisma.reaction.findMany({
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  });

  const formattedData: Reaction[] = db_data.map((data) => ({
    id: data.id,
    imageURL: data.imageURL,
    rxID: data.rxID,
    url: data.url,
    status: data.status,
    rawText: data.rawText,
    steps: data.steps as steps[],
    annotation: data.annotation,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  }));

  

  
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

