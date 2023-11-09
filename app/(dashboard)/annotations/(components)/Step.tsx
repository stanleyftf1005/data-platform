'use client'

import { CiBeaker1 } from "react-icons/ci";
import {LuTrash2} from "react-icons/lu"
import {Button} from "@/components/ui/button"
import {ActionForm} from "./ActionForm"

interface StepProps {
    step: {
        id: number;
        actions: string;
    }
    onDelete: (id: number)=> void

}

export const Step = ({step, onDelete}:StepProps) => {
  
  
  
  return (
   
    <div className="flex flex-col items-stretch rounded-xl border justify-between shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center font-medium">
            <div className="flex-none justify-items-center content-center bg-neutral-100 border-[1.5px] border-neutral-200  text-neutral-700 p-1.5 mr-2 rounded-lg">
                <CiBeaker1 className="h-5 w-5 stroke-[1.5px]"/>
            </div> 
            Step {step.id}
          </div>
          <div className="">
            <Button variant="ghost" className="text-neutral-500 p-1" onClick={() => {onDelete(step.id)}}>
              <LuTrash2 className="h-4 w-4 mx-1.5" />
            </Button>
          </div>
          
          
        </div>
        <ActionForm/>
        
        
    </div>

  )
}