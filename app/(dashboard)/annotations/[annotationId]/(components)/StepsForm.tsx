"use client"

import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios';
import {data, rawText} from '../../../data'
import { LuPlus, LuTrash2, LuCheck, LuChevronsUpDown } from "react-icons/lu"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {ScrollArea} from "@/components/ui/scroll-area"
import { cn } from '@/lib/utils'
import {Button} from "@/components/ui/button"
import {CiBeaker1} from 'react-icons/ci'
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
import { toast } from "@/components/ui/use-toast"
import { Reaction, steps } from '@/app/(dashboard)/(dataTable)/columns';
import { SafeReaction } from '@/app/types';

const {id, url, status } = data[2]



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
                required_error: "Properties must be filled in.",
            }),
            
        })
)})


  
  const actionTypes = [
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
    
    
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        //defaultValues will be autopopulated into fields
        
        defaultValues: reaction && formSchema.parse({ steps: reaction.steps }) || {
            steps: [
                {
                    //actionType: "",
                    index: 1,
                    actionType: "Add",
                    actionProps: "(acetone)[1190 g][20.5 mol][1500 cc][$1$]",
                    
                },
                {
                    //actionType: "",
                    index: 2,
                    actionType: "Add",
                    actionProps: "(barium hydroxide)",
                    
                }
            ]
        },
        
    
    })

    const router = useRouter()

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        

        axios.patch(`/api/annotations/${reaction?.id}`, createFields(data.steps))
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

    return {form , fields, handleDelete, updateFieldIndex,handleAppend, onSubmit}


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

    const {form, fields, handleDelete, handleAppend, updateFieldIndex, onSubmit} = useDynamicForm(reaction)

    

    
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


    }, [fields,form]);

    


    return(
        <>  
            {toggle &&

            
            <>
                <div className="flex justify-between align-middle mb-6 ">
                    <h3 className="text-base font-semibold self-center">Reaction Procedure</h3>
                    <Button variant='outline' className="text-sm rounded-xl h-10 border-input" onClick={()=>handleAppend()}>
                        <LuPlus className="mr-2 h-4 w-4" /> Add Step
                    </Button>
                </div>

                <div className="flex flex-col space-y-4 mb-32">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {fields.map(({id}, index) => (
                                
                                <div key={id} className="flex flex-col space-y-3">
                                    <div className="flex flex-col items-stretch rounded-xl border justify-between shadow-sm">
                                        <div className="flex items-center justify-between px-4 py-3 border-b">
                                            <div className="flex items-center font-medium">
                                                <div className="flex-none justify-items-center content-center bg-neutral-100 border-[1.5px] border-neutral-200  text-neutral-700 p-1.5 mr-2 rounded-lg">
                                                    <CiBeaker1 className="h-5 w-5 stroke-[1.5px]"/>
                                                </div> 
                                                Step {index+1}
                                            </div>
                                            <div className="">
                                                <Button variant="ghost" className="text-neutral-500 p-1" onClick={(() => handleDelete(index))}>
                                                    <LuTrash2 className="h-4 w-4 mx-1.5" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="px-4 py-6 space-y-3">
                                            
                                            <FormField
                                            control={form.control}
                                            name={`steps.${index}.actionType`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                <FormLabel>Action Type</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[200px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value
                                                            ? actionTypes.find(
                                                                (actionType) => actionType.value === field.value
                                                            )?.label
                                                            : "Select Action Type"}
                                                        <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search language..." />
                                                        <ScrollArea className="h-[250px]">
                                                            <CommandEmpty>No Action found.</CommandEmpty>
                                                            <CommandGroup>
                                                            {actionTypes.map((actionType) => (
                                                                <CommandItem
                                                                value={actionType.label}
                                                                key={actionType.value}
                                                                onSelect={() => {
                                                                    form.setValue(`steps.${index}.actionType`, actionType.value)
                                                                }}
                                                                >
                                                                <LuCheck
                                                                    className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    actionType.value === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                    )}
                                                                />
                                                                {actionType.label}
                                                                </CommandItem>
                                                            ))}
                                                            </CommandGroup>

                                                        </ScrollArea>
                                                        
                                                    </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />

                                            <FormField
                                            control={form.control}
                                            name={`steps.${index}.actionProps`}
                                            render={({ field }) => (
                                                
                                                <FormItem>
                                                    <FormLabel>Properties</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                
                                                
                                                
                                            )}
                                            />

                                            <FormField
                                            control={form.control}
                                            name={`steps.${index}.index`}
                                            render={({ field }) => (
                                                
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="hidden" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                
                                                
                                                
                                            )}
                                            />
                                            
                                            
                                            

                                        </div>
                                        
                                        
                                    </div>
                                </div>

                                
                                
                                
                            
                            ))}
                            <Button type="submit">Submit</Button>

                            
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