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
import { actionTypes } from '../actionTypes'
import AddStepBtn from './AddStepBtn'
import { materials, steps, actionProps } from '@/app/types'
import AddMaterialBtn from './AddMaterialBtn'
import MaterialsList from './MaterialsList'
import { SelectValue } from '@radix-ui/react-select'
import VariablesList from './VariablesList'
import { FormContext } from './StepsForm'




  


interface StepsProps {
    key: string;
    index: number;
    handleDelete: (index: number) => void;
    handleAddStep?: (index: number) => void;
    handleAppend: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleInsert: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
    handleAddMaterial: (index: number, item:steps) => materials[];
    handleAddVariable: (index: number, item:steps) => actionProps[];
    isLoading: boolean;
    isEnd: boolean;
    form: UseFormReturn<{
        steps: steps[];
    }, any, undefined>;
    item: steps,


}

const Steps = ({key, index, handleDelete, handleAddStep, form, isLoading, isEnd, handleAppend, handleInsert, handleAddMaterial, item}:StepsProps) => {
    const [canEdit, setCanEdit] = useState<boolean>(true)

    const m: materials[] = (item.materials !== undefined || null) ? item.materials as materials[] : [];
    const v: actionProps[] = (item.actionProps !== undefined || null) ? item.actionProps as actionProps[] : [];

    const [materialsList, setMaterialsList] = useState<materials[]>(m);
    const [variablesList, setVariablesList] = useState<actionProps[]>(v);
    

    const findActionTypeObject = (actionTypeValue: string) => {
        return actionTypes.find(actionType => actionType.value === actionTypeValue);
    }

    const actionTypeValue = form.watch(`steps.${index}.actionType`)

    

    const [allowVariables, setAllowVariables] = useState<boolean>(false)
    const [allowMaterials, setAllowMaterials] = useState<boolean>(false)

    //const [allowVariables, setAllowVariables] = useState<boolean>(false)

    const {stepsValue, update} = useContext(FormContext)


    const addMaterial = (index:number, item:steps, e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleAddMaterial(index, item)

    }

    const addVariable = (index:number, item:steps, e:React.MouseEvent<HTMLButtonElement>) => {
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

        //const actionTypeValue = form.getValues(`steps.${index}.actionType`)
        const actionType = findActionTypeObject(actionTypeValue)
        
        if (actionType) {
            setAllowMaterials(actionType.materials)
            if(actionType.materials === false){
                setMaterialsList([])
            }
        }

        const maxVars = findActionTypeObject(actionTypeValue)?.actionVars.length

        if (maxVars !== 0) {
            setAllowVariables(true)

        }else{
            setAllowVariables(false)
            setVariablesList([])
        }

        return () => {
            setAllowMaterials(!allowMaterials)
            setAllowVariables(!allowVariables)
        }



    }, [isLoading, allowMaterials, actionTypeValue])
  
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
                        {/*
                        <Button variant={!canEdit?"ghost":"secondary"} className="px-2" type="button" onClick={(() => handleEdit())}>
                            {!canEdit && <><LuPencil className="h-4 w-4 mx-1.5"/>Edit</>}
                            {canEdit && <><LuCheck className="h-4 w-4 mx-1.5"/>Save</>}
                        </Button>*/}
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
                                            
                                            //sanity action to remove all deafult values andreset the form input state
                                            setAllowMaterials(findActionTypeObject(actionType.value)?.materials || false)
                                            
                                            //remove all pre-fetch values from the database and set to empty when a new action type is selected
                                            form.setValue(`steps.${index}.actionProps`, [])

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

                    {allowVariables && (
                        <VariablesList index={index} variablesList={variablesList} form={form} actionTypeValue={actionTypeValue}/>

                    )}
                    
                    

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

                    

                    
                    {allowMaterials && (
                        <div>
                            
                            <MaterialsList index={index} materialsList={materialsList} form={form}/>
                        </div>
                        
                    )}

                    

                    

                    {/*<AddMaterialBtn index={index} item={item} addMaterial={addMaterial}/>*/}

                    
                    
                    
                    
                    

                </div>
                
                
            </div>
        </div>
        <AddStepBtn index={index} isEnd={isEnd} handleAppend={handleAppend} handleInsert={handleInsert}/>
    </>
    

  )
}

export default Steps