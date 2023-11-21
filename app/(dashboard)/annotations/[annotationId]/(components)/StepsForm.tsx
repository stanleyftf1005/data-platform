"use client"

import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios';
import {data, rawText} from '../../../data'
import { LuPlus, LuTrash2, LuCheck, LuChevronsUpDown, LuLoader2 } from "react-icons/lu"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {ScrollArea} from "@/components/ui/scroll-area"
import { cn } from '@/lib/utils'
import {Button} from "@/components/ui/button"
import {CiBeaker1} from 'react-icons/ci'
import * as z from "zod"
import {useFieldArray, useForm, Controller} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Reaction, steps } from '@/app/(dashboard)/(dataTable)/columns';
import { SafeReaction } from '@/app/types';
import { on } from 'events';
import Steps from './Steps';




const createAnnotationText = (data: steps[]) => {

    return data.map((step) => `(#${step.index}) ${step.actionType} ${step.actionProps}`) as string[]
}

const createFields = (data:steps[]) => {
    return {
        steps: data,
        annotation: createAnnotationText(data)
    }
}


const formSchema = z.object({
    steps: z.array(
        z.object({
            /*actionType: z.string({
                required_error: "Please select an action.",
            }),*/
            index: z.number(),
            actionType: z.string({
                required_error: "Properties must be filled in.",
            }),
            actionProps: z.string({
            }),
            
        })
)})


  
  export const actionTypes = [
        {
          value: "Add",
          label: "Add",
        },
        {
          value: "Combination",
          label: "Combination",
        },
        {
          value: "Cool",
          label: "Cool",
        },
        {
          value: "Dilution",
          label: "Dilution",
        },
        {
          value: "Distill",
          label: "Distill",
        },
        {
          value: "DrySolid",
          label: "DrySolid",
        },
        {
            value: "DrySolution",
            label: "DrySolution",
        },
        {
            value: "Filter",
            label: "Filter",
        },
        {
            value: "Heat",
            label: "Heat",
        },
        {
            value: "MakeSolution",
            label: "MakeSolution",
        },
        {
            value: "Separation",
            label: "Separation",
        },
        {
            value: "SetPH",
            label: "SetPH",
        },
        {
            value: "Recrystallize",
            label: "Recrystallize",
        },
        {
            value: "Reflux",
            label: "Reflux",
        },
        {
            value: "SetTemperature",
            label: "SetTemperature",
        },
        {
            value: "Stir",
            label: "Stir",
        },
        {
            value: "Wait",
            label: "Wait",
        },
        {
            value: "Wash",
            label: "Wash",
        },
        {
            value: "Yield",
            label: "Yield",
        },
          
        

      ]



const useDynamicForm = (reaction: SafeReaction | undefined) => {
    
    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        //defaultValues will be autopopulated into fields
        
        defaultValues: reaction && formSchema.parse({ steps: reaction.steps }) || {
            steps: [
                {
                    //actionType: "",
                    index: 1,
                    actionType: "",
                    actionProps: "",
                    
                }
        
            ]
        },
        
    
    })


    //Q: how to update a remote main branch on github with my local master branch. Error: fatal: 'orign' does not appear to be a git repository fatal: Could not read from remote repository.
    //A:

    const router = useRouter()

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        
        setIsLoading(true)
        await axios.patch(`/api/annotations/${reaction?.id}`, createFields(data.steps))
        .then((res: AxiosResponse) => {
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(res.data, null, 2)}</code>
                    </pre>
                ),
            })
            router.refresh()
            
        })
        .catch((err: AxiosError) => {
            console.error(err);
            toast({
                title: "An error occurred while submitting the form:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(err.response?.data, null, 2)}</code>
                    </pre>
                )
            })
        })
        setIsLoading(false)
            

        
        
    }

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "steps",
    })

    const updateFieldIndex = () => {
        fields.map((field, index) => {
            form.setValue(`steps.${index}.index`, index+1)
        })
    }

    
    

    const handleDelete = (index: number) => {
        remove(index)
    }

    const handleAppend = () => {
        append({
            index: fields.length+1,
            actionType: "",
            actionProps: "",
        });
    };

    const externalClick = () => {
        onSubmit(form.getValues())
    }

    return {form , fields, isLoading, handleDelete,  updateFieldIndex, externalClick, handleAppend, onSubmit}


}



interface StepsFormProps {
    reaction: SafeReaction | undefined
}

export default function StepsForm({reaction}: StepsFormProps) {
    const [toggle, setToggle] = useState(false)
    /*const [steps, setSteps] = useState([
        {id: 1,
        actions: ''}
    ])*/

    const {form, fields, isLoading, handleDelete, handleAppend, updateFieldIndex, externalClick, onSubmit} = useDynamicForm(reaction)


    
   /* const onClick = () => {
        setToggle(!toggle)
    }*/

    useEffect(() => {
        
        if (fields.length > 0) {
            if(toggle === false){
                setToggle(true)
            }
            updateFieldIndex()
            

        }else{
            setToggle(false)
        }


    }, [fields,form, toggle, updateFieldIndex]);

    


    return(
        <>  
            <div className="flex justify-between align-middle mb-6 px-4 py-4 border-b sticky top-0 z-10 bg-white">
                    <div className="flex flex-col max-w-[70%]">
                        <h3 className="text-base font-semibold">Reaction Procedure</h3>
                        <p className="text-xs font-medium text-neutral-500">Last Edited: <span className='underline underline-offset-1'>{reaction?.updatedAt}</span></p>
                    </div>
                    
                    <div className="flex space-x-2">
                        <Button className="text-sm rounded-xl h-10" type="submit" disabled={isLoading} onClick={()=> externalClick()}>
                            Submit {isLoading && <LuLoader2 className="animate-spin ml-2 h-4 w-4"/>}
                        </Button>
                        <Button variant='outline' className="text-sm rounded-xl h-10 border-input" onClick={()=>handleAppend()}>
                            <LuPlus className="mr-2 h-4 w-4" /> Add Step
                        </Button>
                    </div>
                </div>

            {toggle &&

            
            <>

                <div className="flex flex-col space-y-4 px-4 mb-24">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {fields.map(({id}, index) => (
                                
                                <Steps index={index} form={form} handleDelete={handleDelete} key={id}/>
                            
                            ))}
                            {/*}
                            <Button type="submit" disabled={isLoading} >
                                Submit {isLoading && <LuLoader2 className="animate-spin ml-2 h-4 w-4"/>}
                            </Button>
                            */}
                            
                        </form>
                    </Form>

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
                <Button variant="outline" className="text-sm rounded-xl h-10" onClick={handleAppend}>
                    <LuPlus className="mr-2 h-4 w-4" /> Add Step
                </Button>

                
            </div>
            
            }
            
        </>
        

    )

}