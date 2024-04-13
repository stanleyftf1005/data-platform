"use client"
import React from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { steps } from "@/app/types"

interface AddMaterialBtnProps {
    index: number;
    item: steps;
    addMaterial: (index: number, item:steps, e:React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AddMaterialBtn({index, item, addMaterial}: AddMaterialBtnProps) {
    
    return (
    <div className="flex flex-col justify-items-center">
        <Button size="sm" variant="ghost" className="w-[150px] gap-1 place-self-center border" onClick={(e) => addMaterial(index,item,e)}>
        
            <PlusCircle className="h-3.5 w-3.5" />
            Add Material
        </Button>
    </div>
  )
}

