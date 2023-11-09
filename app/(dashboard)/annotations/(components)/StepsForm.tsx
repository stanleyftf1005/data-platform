"use client"

import {useEffect, useState} from 'react'
import { LuPlus, LuTrash2 } from "react-icons/lu"
import {Button} from "@/components/ui/button"
import {CiBeaker1} from 'react-icons/ci'
import {Step} from './Step'
import * as z from "zod"
import {useFieldArray, useForm} from "react-hook-form"
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

const formSchema = z.object({
    steps: z.array(
        z.object({
            /*actionType: z.string({
                required_error: "Please select an action.",
            }),*/
            actionProps: z.string({
                required_error: "Properties must be filled in.",
            })

        })
)})

const useDynamicForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        /*defaultValues: {
            steps: [
                {
                    //actionType: "",
                    actionProps: "",
                }
            ]
        },*/
    
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "steps",
    })

    const handleDelete = (index: number) => {
        remove(index)
    }

    const handleAppend = () => {
        append({
            //actionType: "",
            actionProps: "",
        })
    }

    return {form , fields, handleDelete, handleAppend, onSubmit}
}



export default function StepsForm() {
    const [toggle, setToggle] = useState(false)
    /*const [steps, setSteps] = useState([
        {id: 1,
        actions: ''}
    ])*/

    const {form, fields, handleDelete, handleAppend, onSubmit} = useDynamicForm()

   
   /* const onClick = () => {
        setToggle(!toggle)
    }*/

    useEffect(() => {
        if (fields.length > 0) {
            setToggle(true)
        }else{
            setToggle(false)
        }

    }, [fields]);



    return(
        <>  
            {toggle &&

            
            <>
                <div className="flex justify-between align-middle mb-6">
                    <h3 className="text-base font-semibold self-center">Reaction Procedure</h3>
                    <Button variant='outline' className="text-sm rounded-xl h-10 border-input" onClick={handleAppend}>
                        <LuPlus className="mr-2 h-4 w-4" /> Add Step
                    </Button>
                </div>

                <div className="flex flex-col space-y-4 mb-32">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {fields.map(({id}, index) => (
                            
                                <FormField
                                    control={form.control}
                                    name={`steps.${index}.actionProps`}
                                    key={id}
                                    render={({ field }) => (
                                        <div className="flex flex-col space-y-3">
                                            <div className="flex flex-col items-stretch rounded-xl border justify-between shadow-sm">
                                                <div className="flex items-center justify-between px-4 py-3 border-b">
                                                    <div className="flex items-center font-medium">
                                                        <div className="flex-none justify-items-center content-center bg-neutral-100 border-[1.5px] border-neutral-200  text-neutral-700 p-1.5 mr-2 rounded-lg">
                                                            <CiBeaker1 className="h-5 w-5 stroke-[1.5px]"/>
                                                        </div> 
                                                        Step {index+1}
                                                    </div>
                                                    <div className="">
                                                        <Button variant="ghost" className="text-neutral-500 p-1" onClick={() => handleDelete(index)}>
                                                            <LuTrash2 className="h-4 w-4 mx-1.5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="px-4 py-6">
                                                    <FormItem>
                                                        <FormLabel>Properties</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            
                            ))}

                            
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