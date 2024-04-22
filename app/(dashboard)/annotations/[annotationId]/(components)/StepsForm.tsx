"use client"

import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios';
import { LuPlus, LuLoader2} from "react-icons/lu"
import {Button} from "@/components/ui/button"
import {CiBeaker1} from 'react-icons/ci'
import * as z from "zod"
import {useFieldArray, useForm, UseFieldArrayUpdate} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {
  Form,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { actionProps, steps, subReactions } from '@/app/types';
import { SafeReaction, materials } from '@/app/types';
import Steps from './Steps';




const createAnnotationText = (data: steps[]) => {
    
    return data.map((step) => `(#${step.index}) ${step.actionType} ${step.actionProps?.map((actionvars)=>(`[${actionvars.name} ${actionvars.value}]`)).join(" ")} ${step.materials?.map((m)=> `(${m.material_name} ${m.mole? m.mole: ""} ${m.volume? m.volume: ""} ${m.concentration? m.concentration: ""} ${m.quantity? m.quantity: ""})`).filter((m) => m !== "").join("")}`) as string[]
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
            subreaction_index: z.number().optional(),
            actionType: z.string({
                required_error: "Properties must be filled in.",
            }),
            actionProps: z.array(
                z.object({
                    /*actionType: z.string({
                        required_error: "Please select an action.",
                    }),*/
                    name: z.string().optional(),
                    value: z.string().optional(),
                    
                    
                })
            ).optional(),
            materials: z.array(
                z.object({
                    /*actionType: z.string({
                        required_error: "Please select an action.",
                    }),*/
                    material_name: z.string().optional(),
                    quantity: z.string().optional(),
                    mole: z.string().optional(),
                    volume: z.string().optional(),
                    concentration: z.string().optional(),
                    production_rate: z.string().optional(),
                    smiles: z.string().optional(),
                    role: z.string().optional(),
                    
                    
                })
            ).optional()
            
        })
)})
  

interface FormContextProps {
    stepsValue: steps[],
    update: UseFieldArrayUpdate<{
        steps: steps[];
    }, "steps">;
    subReactionsValue?: subReactions[],
}


//declare a context to pass the reaction steps and the react-hook-form update function for any children components
export const FormContext = React.createContext<FormContextProps>({} as FormContextProps);



const useDynamicForm = (reaction: SafeReaction | undefined) => {
    
    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        reValidateMode: "onSubmit",
        //defaultValues will be autopopulated into fields
        
        defaultValues: reaction && formSchema.parse({ steps: reaction.steps }) || {
            steps: [
                {
                    index: 1,
                    actionType: "",
                    actionProps: [],
                    materials: [],
                    
                }
        
            ]
        },
        
    
    })

    const {reset} = form


    


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
                        <code className="text-white">{JSON.stringify(res.data.steps, null, 2)}</code>
                        {/*<code className="text-white">
                            {res.data.annotation.map((line:string, id:string) => {
                                    return (
                                        <p className="break-all max-w-[200px]" key={id}>{line + "\n"}</p>
                                    )
                                })}
                        </code>*/}
                    </pre>
                ),
            })
            reset({
                steps: res.data.steps
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

    const {fields, append, insert, remove, update} = useFieldArray({
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

    const handleAppend = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        append({
            index: fields.length+1,
            actionType: "",
            actionProps: [],
            materials: [],
        });
    };

    const handleAddMaterial = (index: number, item:steps) => {
        var materialList = item.materials
        if(item.materials !== undefined || null){
            materialList = [...materialList as materials[], {
                material_name: "",
                quantity: "",
                mole: "",
                volume: "",
                concentration: "",
                production_rate: "",
            }]
            update(index, {
                ...item,
                materials: materialList
            })
            
            

        }else{
            materialList = [{
                material_name: "",
                quantity: "",
                mole: "",
                volume: "",
                concentration: "",
                production_rate: "",
            }]
            update(index, {
                ...item,
                materials: materialList
            })
        }
        
        return materialList
        
    }

    const handleAddVariable = (index: number, item:steps) => {
        var variableList = item.actionProps
        if(item.actionProps !== undefined || null){
            variableList = [...variableList as actionProps[], {
                name: "",
                value: "",
                
            }]
            update(index, {
                ...item,
                actionProps: variableList
            })
            
            

        }else{
            variableList = [{
                name: "",
                value: "",
            }]
            update(index, {
                ...item,
                actionProps: variableList
            })
        }
        
        return variableList
        
    }

    const handleInsert = (e: React.MouseEvent<HTMLButtonElement>, index:number) => {
        e.preventDefault()
        insert(index, {
            index: index,
            actionType: "",
            actionProps: [],
            materials: [],
        });
    };



    const externalClick = () => {
        const data = form.getValues()
        onSubmit(data)

        
        
    }

    const {isDirty, isSubmitSuccessful} = form.formState


    return {form , fields, isLoading, handleDelete,  update, handleInsert, handleAddMaterial, handleAddVariable, updateFieldIndex, reset, isDirty, isSubmitSuccessful, externalClick, handleAppend, onSubmit}


}



interface StepsFormProps {
    reaction: SafeReaction | undefined;
    
}

export default function StepsForm({reaction}: StepsFormProps) {
    const [toggle, setToggle] = useState(false)
    const [updated, setUpdated] = useState(false)
    /*const [steps, setSteps] = useState([
        {id: 1,
        actions: ''}
    ])*/

    const {form, fields, isLoading, isDirty, isSubmitSuccessful, reset, update, handleDelete, handleAppend, handleInsert, handleAddMaterial, handleAddVariable, updateFieldIndex, externalClick, onSubmit} = useDynamicForm(reaction)

    const stepsValue = reaction!== undefined ? reaction.steps : [] as steps[]
    const subReactionsValue = reaction!== undefined ? reaction.subreactions : [] as subReactions[]
    
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

        if(isDirty){
            setUpdated(isDirty)
        }

        return () => {
            setUpdated(false)
        }



        

        

    }, [fields, form, toggle, updateFieldIndex, isDirty]);

    const checkEnd = (index: number) => {
        if (index === fields.length-1) {
            return true
        }else{
            return false
        }
    }


    return(
        <FormContext.Provider value={{stepsValue, update, subReactionsValue}}>  
            <div className="flex justify-between align-middle mb-6 px-4 py-4 border-b sticky top-0 z-10 bg-white">
                    <div className="flex flex-col max-w-[70%]">
                        <h3 className="text-base font-semibold">Reaction Procedure</h3>
                        <p className="text-xs font-medium text-neutral-500">Last Edited: <span className='underline underline-offset-1'>{reaction?.updatedAt}</span></p>
                    </div>
                    
                    <div className="flex space-x-2">
                        
                        {/*updated && ()*/}
                        <Button className="text-sm rounded-xl h-10" type="submit" disabled={isLoading} onClick={()=> externalClick()}>
                            Save Changes{isLoading && <LuLoader2 className="animate-spin ml-2 h-4 w-4"/>}
                        </Button>
                        
                        <Button variant="outline" className="text-sm rounded-xl h-10" onClick={handleAppend}>
                            <LuPlus className="mr-2 h-4 w-4" /> Add Step
                        </Button>
                    </div>
                </div>

            {toggle &&

            
            <>

                <div className="flex flex-col space-y-4 px-4 mb-24">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="">
                            
                            {fields.map(({id}, index, field) => (
                                
                                <Steps index={index} handleDelete={handleDelete} form={form} item={field[index]} key={id} isLoading={isLoading} isEnd={checkEnd(index)} handleAppend={handleAppend} handleInsert={handleInsert} handleAddMaterial={handleAddMaterial} handleAddVariable={handleAddVariable}/>
                            
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
            
        </FormContext.Provider>
        

    )

}