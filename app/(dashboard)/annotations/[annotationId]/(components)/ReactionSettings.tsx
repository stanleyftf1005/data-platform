"use client"

import React, { ButtonHTMLAttributes } from 'react';
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm, UseFieldArrayUpdate} from "react-hook-form"
import { SafeReaction } from '@/app/types';
import {
  Form,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Controller, UseFormReturn } from 'react-hook-form'
import { toast } from "@/components/ui/use-toast"
import axios, { AxiosError, AxiosResponse } from "axios"
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react"
import { LuLoader2, LuPlusCircle } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import SubReactionItem from './SubReactionItem';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';


interface ReactionSettingsProps {
    // Define your props here
    //annotationId: string;
    reaction?: SafeReaction;
}

const reactionSetting = z.object({
    subreactions: z.array(
        z.object({
            index: z.number(),
            procedureText: z.string(),
            
            
        })
    ),
    smiles: z.string(),
})

const createFields = (data: z.infer<typeof reactionSetting>) => {
    return {
        smiles: data.smiles,
        subreactions: data.subreactions,
    }
}



export const ReactionSettings = ({reaction}: ReactionSettingsProps) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const id = reaction?.id


    const form = useForm<z.infer<typeof reactionSetting>>({
        resolver: zodResolver(reactionSetting),
        mode: "onChange",
        reValidateMode: "onSubmit",
        //defaultValues will be autopopulated into fields
        
        defaultValues: reaction && reactionSetting.parse({ subreactions: reaction.subreactions, smiles:reaction.smiles }) || {
            subreactions: [
                {
                    index: 1,
                    procedureText: "",
                    
                    
                }
        
            ],
            smiles: "",
        },
        
    
    })

    const {handleSubmit, reset, register} = form

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "subreactions",
    })

    const handleAddSubReaction = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        append({index: fields.length+1, procedureText: ""})
    }

    const handleRemoveSubReaction = (e:React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        remove(index)
    }

    const updateReaction = async (data: z.infer<typeof reactionSetting>) => {
    
        setIsLoading(true)
        await axios.patch(`/api/annotations/${id}/reaction`, createFields(data))
        .then((res: AxiosResponse) => {
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        {/*<code className="text-white">{JSON.stringify(res.data.annotation, null, 2)}</code>*/}
                        
                        <code className="text-white">
                            Updated.
                        </code>*/
                        
                    </pre>
                ),
            })
            
            
            
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
        router.refresh()
        setIsLoading(false)
        
        
    }

    
    return (
        <div>
            {/* Your component code here */}
            <Form {...form}>
                <form  className="" onSubmit={form.handleSubmit(updateReaction)}>
                    <ScrollArea className="h-[500px] mt-6 rounded-md border p-4">
                        <div className="grid gap-1.5 space-y-3 mx-2">
                            <Label>Smiles</Label>
                            <Controller
                            control={form.control}
                            name="smiles"
                            render={({ field }) => (
                            <Textarea
                                className='max-w-full'
                                placeholder="Enter reaction SMILES here."
                                {...field}
                            />
                            )}
                            />
                            
                        </div>
                        <Separator className='my-6 mx-2'/>
                        <div className="mt-6 mx-2">
                            <Label>Sub-Reactions</Label>
                            
                                {fields.map(({id}, index, field) => (
                                    <>
                                        
                                        <SubReactionItem index={index} key={index} form={form} handleAddSubReaction={handleAddSubReaction} handleRemoveSubReaction={handleRemoveSubReaction}/>
                                    </>
                                    
                                    
                                ))}
                            
                        </div>
                        <div className="flex flex-col justify-items-center mt-6 mx-2">
                            <Button size="sm" variant="secondary" className="w-full gap-1 place-self-center border" onClick={(e)=>handleAddSubReaction(e)}>
                            
                                <LuPlusCircle className="h-3.5 w-3.5" />
                                Add Sub Reaction
                            </Button>
                        </div>
                    </ScrollArea>
                    
                    <Button type="submit"  className="mt-6" disabled={isLoading} >
                        Save Changes {isLoading && <LuLoader2 className="animate-spin ml-2 h-4 w-4"/>}
                    </Button>
                    
                    
                </form>
            </Form>
        </div>
    );
}
