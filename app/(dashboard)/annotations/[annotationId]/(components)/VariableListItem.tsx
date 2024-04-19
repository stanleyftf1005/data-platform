import { LuTrash2 } from 'react-icons/lu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItem, FormControl, FormLabel, FormMessage} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ChevronsUpDown } from 'lucide-react'
import { LuChevronsUpDown, LuCheck, LuHelpCircle, LuSettings } from 'react-icons/lu'
import { useEffect, useState, useContext, use } from 'react'
import { steps, actionProps } from '@/app/types'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { actionTypes } from '../actionTypes'
import { FormContext } from './StepsForm'
import { actionVariablesType } from '../actionVariables'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Textarea } from '@/components/ui/textarea'


interface VariableListItemProps {
    variable_index: number;
    variable: actionProps;
    actionTypeValue: string;
    index: number;
    form: UseFormReturn<{
        steps: steps[];
    }, any, undefined>;
    handleDeleteVariable: (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => void;
    addVariableStep: (e: React.MouseEvent<HTMLButtonElement>) => void;




}


export const VariableListItem = ({variable, variable_index, index, form, handleDeleteVariable, actionTypeValue, addVariableStep}: VariableListItemProps) => {
    const [isOpen, setIsOpen] = useState<boolean | undefined>(false)

    const actionType = actionTypes.find((actionType) => actionType.value === actionTypeValue) || actionTypes[0]

    const currentActionVariableObj = form.watch(`steps.${index}.actionProps.${variable_index}`) 
    
    var comment = actionType?.actionVars?.find(
        (vars) => vars.name === currentActionVariableObj?.name
    )?.comment
    
    

    useEffect(() => {
    
        comment = actionType?.actionVars?.find(
            (vars) => vars.name === currentActionVariableObj?.name
        )?.comment

        


    }, [actionTypeValue])

 
    return (
        <>  
                                
            <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2 mb-3"
            >
                <div className="flex items-center justify-between p-2 mb-2 rounded-md border ">
                    <h4 className="text-sm font-semibold">
                    
                    <div className="flex items-center text-sm font-medium">
                        <div className="flex-none justify-items-center content-center bg-neutral-100 border-[1.5px] border-neutral-200  text-neutral-700 p-1.5 mr-2 rounded-lg">
                            <LuSettings className="h-5 w-5 stroke-[1.5px]"/>
                        </div>
                        {currentActionVariableObj !== undefined || null ? `${currentActionVariableObj.name}` : `Action Variable (${variable_index+1})`} 
                        
                    </div>
                    </h4>
                    <div className='flex'>
                        <Button variant="ghost" className="text-neutral-500 p-1 mr-2" onClick={(e)=>handleDeleteVariable(e,variable_index)}>
                            <LuTrash2 className="h-4 w-4 mx-1.5" />
                        </Button>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <ChevronsUpDown className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                
                </div>
                
                <CollapsibleContent className="space-y-2 px-2 py-3">
                    
                    <div className={cn("flex w-full", (actionType?.value === "Others" ? "flex-col space-y-4": "flex-row items-end justify-stretch justify-items-stretch space-x-2"))}>
                        <Controller
                        control={form.control}
                        key={variable_index}
                        rules={{
                            required: true,
                        }}
                        name={`steps.${index}.actionProps.${variable_index}.name`}
                        render={({ field }) => (
                            
                            <FormItem className="flex flex-col">
                            <FormLabel className='mb-1.5'>Variable Name</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    
                                    
                                    <Button
                                    //disabled={!canEdit}
                                    variant="outline"
                                    role="combobox"
                                    
                                    className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value
                                        ? actionType.actionVars.find(
                                            (actionVarsType) => actionVarsType.name === field.value
                                        )?.name
                                        : "Select Action Type"}
                                    <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                
                                    
                                    
                                    
                                    
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search Action Variables..." />
                                    <ScrollArea className="h-[250px]">
                                        <CommandEmpty>No Action found.</CommandEmpty>
                                        <CommandGroup>
                                        {actionType.actionVars.map((actionVars) => (
                                            <CommandItem
                                            value={actionVars.name}
                                            key={actionVars.name}
                                            onSelect={() => {
                                                form.setValue(`steps.${index}.actionProps.${variable_index}.name`, actionVars.name)
                                                //setAllowVariables(findActionTypeObject(actionType.value)?.materials || false)
                                                
                                            }}
                                            >
                                            <LuCheck
                                                className={cn(
                                                "mr-2 h-4 w-4",
                                                actionVars.name === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                            />
                                            {actionVars.name}
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
                        key={variable_index}
                        name={`steps.${index}.actionProps.${variable_index}.value`}
                        render={({ field }) => (
                            
                            
                            <FormItem className='grow'>
                                <FormLabel className='flex flex-row mb-3'>
                                    <>
                                    Value
                                    {currentActionVariableObj?.name !== undefined && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className="text-neutral-500" onClick={(e) => e.preventDefault()}>
                                                    <LuHelpCircle className="h-4 w-4 ml-1.5 hover:opacity-75" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{comment}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>)}
                                    </>
                                </FormLabel>
                                <FormControl>
                                    {actionType?.value === "Others" ?
                                    <Textarea placeholder="Enter action variables here" {...field}/>

                                    : 
                                    <Input placeholder="Enter action variables here" {...field}/>
                                    
                                    }
                                    
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            
                            
                            
                            
                        )}
                        />
                    </div>
                </CollapsibleContent>
            </Collapsible>



            

            

        </>
    )
}