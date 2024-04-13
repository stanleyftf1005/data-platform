import React, {useContext, useEffect, useState} from 'react'
import { Button } from '@/components/ui/button'
import { CiBeaker1 } from 'react-icons/ci'
import { LuTrash2, LuPencil } from 'react-icons/lu'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItem, FormControl, FormLabel, FormMessage, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LuChevronsUpDown, LuCheck } from 'react-icons/lu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { actionTypes } from './StepsForm'
import AddStepBtn from './AddStepBtn'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { materials, steps } from '@/app/types'
import AddMaterialBtn from './AddMaterialBtn'
import MaterialsList from './MaterialsList'

  


interface StepsProps {
    key: string;
    index: number;
    handleDelete: (index: number) => void;
    handleAddStep?: (index: number) => void;
    handleAppend: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleInsert: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
    handleAddMaterial: (index: number, item:steps) => materials[];
    isLoading: boolean;
    isEnd: boolean;
    form: UseFormReturn<{
        steps: {
            index: number;
            actionType: string;
            actionProps: string;
            materials?: materials[],
        }[];
    }, any, undefined>;
    item: steps,


}

const Steps = ({key, index, handleDelete, handleAddStep, form, isLoading, isEnd, handleAppend, handleInsert, handleAddMaterial, item}:StepsProps) => {
    const [canEdit, setCanEdit] = useState<boolean>(true)

    const m: materials[] = (item.materials !== undefined || null) ? item.materials as materials[] : [];

    const [materialsList, setMaterialsList] = useState<materials[]>(m);


    const addMaterial = (index:number, item:steps, e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleAddMaterial(index, item)

    }

    const handleEdit = () => {
        setCanEdit(!canEdit)
    }

    useEffect(() => {
        if (isLoading) {
            setCanEdit(false)
        }
    }, [isLoading])
  
    return (
    <>
        <div key={key} className="flex flex-col">
            <div className="flex flex-col items-stretch rounded-xl border justify-between shadow-sm">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="flex items-center font-medium">
                        <div className="flex-none justify-items-center content-center bg-neutral-100 border-[1.5px] border-neutral-200  text-neutral-700 p-1.5 mr-2 rounded-lg">
                            <CiBeaker1 className="h-5 w-5 stroke-[1.5px]"/>
                        </div> 
                        Step {index+1}
                    </div>
                    <div className="space-x-2 flex">
                        <Button variant={!canEdit?"ghost":"secondary"} className="px-2" type="button" onClick={(() => handleEdit())}>
                            {!canEdit && <><LuPencil className="h-4 w-4 mx-1.5"/>Edit</>}
                            {canEdit && <><LuCheck className="h-4 w-4 mx-1.5"/>Save</>}
                        </Button>
                        <Button variant="ghost" className="text-neutral-500 p-1" onClick={(() => handleDelete(index))}>
                            <LuTrash2 className="h-4 w-4 mx-1.5" />
                        </Button>
                        
                    </div>
                </div>

                <div className="px-4 py-6 space-y-3">
                    
                    
                    <Controller
                    control={form.control}
                    name={`steps.${index}.actionType`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Action Type</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                
                                
                                <Button
                                disabled={!canEdit}
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

                    <Controller
                    control={form.control}
                    name={`steps.${index}.actionProps`}
                    render={({ field }) => (
                        
                        <FormItem>
                            <FormLabel>Action Variables</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} disabled={!canEdit} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        
                        
                        
                    )}
                    />
                    

                    <Controller
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
                    
                    <MaterialsList index={index} materialsList={materialsList} form={form}/>

                    
                    {/*(materialsList!==undefined) ? (
                        materialsList.map((material, material_index) => (
                            <>  
                                
                                <Accordion type="single" collapsible>
                                    <AccordionItem className="text-sm" value={`$(material_index)`}>
                                        <AccordionTrigger>{`Material ${material_index+1}`}</AccordionTrigger>
                                        <AccordionContent className='space-y-3'>
                                            <Controller
                                            control={form.control}
                                            key={material_index}
                                            name={`steps.${index}.materials.${material_index}.material_name`}
                                            render={({ field }) => (
                                                
                                                
                                                <FormItem>
                                                    <FormLabel>Material Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} disabled={!canEdit} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                
                                                
                                                
                                                
                                            )}
                                            />
    
                                            <div className="flex w-full align-items-start justify-stretch justify-items-stretch space-x-2">
                                                <Controller
                                                control={form.control}
                                                key={material_index}
                                                name={`steps.${index}.materials.${material_index}.quantity`}
                                                render={({ field }) => (
                                                    
                                                    
                                                    <FormItem className='grow'>
                                                        <FormLabel>Quantity</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                    
                                                    
                                                    
                                                    
                                                )}
                                                />
    
                                                <Controller 
                                                control={form.control}
                                                key={material_index}
                                                name={`steps.${index}.materials.${material_index}.mole`}
                                                render={({ field }) => (
                                                    
                                                    
                                                    <FormItem className='grow'>
                                                        <FormLabel>Mole</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                    
                                                    
                                                    
                                                    
                                                )}
                                                />
                                            </div>
    
                                            <div className="flex w-full align-items-start justify-stretch justify-items-stretch space-x-2">
                                                <Controller 
                                                control={form.control}
                                                key={material_index}
                                                name={`steps.${index}.materials.${material_index}.volume`}
                                                render={({ field }) => (
                                                    
                                                    
                                                    <FormItem className='grow'>
                                                        <FormLabel>Volume</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter variables here ..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                    
                                                    
                                                    
                                                    
                                                )}
                                                />
    
                                                <Controller 
                                                control={form.control}
                                                key={material_index}
                                                name={`steps.${index}.materials.${material_index}.concentration`}
                                                render={({ field }) => (
                                                    
                                                    
                                                    <FormItem className='grow'>
                                                        <FormLabel>Concentration</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter variables here ..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                    
                                                    
                                                    
                                                    
                                                )}
                                                />
                                            </div>
    
                                            <Controller 
                                            control={form.control}
                                            key={material_index}
                                            name={`steps.${index}.materials.${material_index}.production_rate`}
                                            render={({ field }) => (
                                                
                                                
                                                <FormItem>
                                                    <FormLabel>Production Rate</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                
                                                
                                                
                                                
                                            )}
                                            />
                                        
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
    
    
                                
    
                            </>
                            
                        ))
                        
            ) : null
                                            */}

                    {/*<AddMaterialBtn index={index} item={item} addMaterial={addMaterial}/>*/}

                    
                    
                    
                    
                    

                </div>
                
                
            </div>
        </div>
        <AddStepBtn index={index} isEnd={isEnd} handleAppend={handleAppend} handleInsert={handleInsert}/>
    </>
    

  )
}

export default Steps