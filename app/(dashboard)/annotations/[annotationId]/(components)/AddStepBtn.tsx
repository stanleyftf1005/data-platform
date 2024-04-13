"use client"
import React from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddStepBtnProps {
    index: number;
    isEnd: boolean;
    handleAppend: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleInsert: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

export default function AddStepBtn({index, isEnd, handleAppend, handleInsert}: AddStepBtnProps) {
    
  
    return (
    <div className="flex flex-col justify-items-center">
        <div className="w-[1px] h-[30px] place-self-center bg-slate-200"></div>
        <Button size="sm" variant="ghost" className="w-[150px] gap-1 place-self-center border" onClick={(e)=>handleInsert(e,index+1)}>
        
            <PlusCircle className="h-3.5 w-3.5" />
            Add Step
        </Button>

        {isEnd ? null : <div className="w-[1px] h-[30px] place-self-center bg-slate-200"></div>}
        
    </div>
  )
}

