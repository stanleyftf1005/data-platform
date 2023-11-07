"use client"

import {InputHTMLAttributes, useState} from 'react'
import { LuPlus } from "react-icons/lu"
import {Button} from "@/components/ui/button"
import {CiBeaker1} from 'react-icons/ci'
import {Step} from './Step'

export default function StepsForm() {
    const [toggle, setToggle] = useState(false)
    const [steps, setSteps] = useState([
        {id: 1,
        actions: ''}
    ])

    const onClick = () => {
        setToggle(!toggle)
    }

    const addStep = () => {
        setSteps([...steps, {id: steps.length += 1, actions: ''}])
    }


    return(
        <>  
            {toggle &&
            <>
                <div className="flex justify-between align-middle mb-6">
                    <h3 className="text-base font-semibold self-center">Reaction Procedure</h3>
                    <Button variant='outline' className="text-sm rounded-xl h-10 border-input" onClick={addStep}>
                        <LuPlus className="mr-2 h-4 w-4" /> Add Step
                    </Button>
                </div>

                <div className="flex flex-col space-y-2 mb-32">
                    {steps.map(step => (
                        <Step key={step.id} step={step}/>
                    ))}
                </div>
            </>
            }

            
            {!toggle && 
            <div className="flex-auto w-full flex flex-col space-y-4 justify-center items-center">
                <div className="flex-none justify-items-center content-center bg-neutral-100 text-neutral-700 p-3 rounded-lg">
                    <CiBeaker1 className="h-8 w-8 stroke-[0.6px]"/>
                </div>
                <div className="text-base font-semibold text-center max-w-[50%] leading-5">
                    Add reaction steps to begin procedure annotation.
                </div>
                <Button variant="outline" className="text-sm rounded-xl h-10" onClick={onClick}>
                    <LuPlus className="mr-2 h-4 w-4" /> Add Step
                </Button>

                
            </div>
            
            }
            
        </>
        

    )

}