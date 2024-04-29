import { LuTrash2, LuHelpCircle, LuTestTube } from 'react-icons/lu'
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
import { materials } from '@/app/types'
import { useState } from 'react'
import { steps } from '@/app/types'
import { materialVariables } from '../materialVariables'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface MaterialListItemProps {
    material_index: number;
    material: materials;
    index: number;
    form: UseFormReturn<{
        steps: steps[];
    }, any, undefined>;
    handleDeleteMaterial: (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => void;
    addMaterialStep: (e: React.MouseEvent<HTMLButtonElement>) => void;




}


export const MaterialListItem = ({material, material_index, index, form, handleDeleteMaterial, addMaterialStep}: MaterialListItemProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const currentMaterialName = form.watch(`steps.${index}.materials.${material_index}.material_name`) 

    return (
        <>  
                                
                                <Collapsible
                                open={isOpen}
                                onOpenChange={setIsOpen}
                                className="space-y-6 mb-3"
                                >
                                    <div className="flex items-center justify-between p-2 mb-4 rounded-md border ">
                                        <h4 className="text-sm font-semibold">
                                        <div className="flex items-center text-sm font-medium capitalize">
                                            <div className="flex-none justify-items-center content-center bg-neutral-100 border-[1.5px] border-neutral-200  text-neutral-700 p-1.5 mr-2 rounded-lg">
                                                <LuTestTube className="h-5 w-5 stroke-[1.5px]"/>
                                            </div>
                                            {currentMaterialName !== undefined || "" || null ? `${currentMaterialName}` : `Material ${material_index+1}`} 
                                            
                                        </div>
                                    
                                        </h4>
                                        <div className='flex'>
                                            <Button variant="ghost" className="text-neutral-500 p-1 mr-2" onClick={(e)=>handleDeleteMaterial(e,material_index)}>
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
                                    
                                    <CollapsibleContent className="space-y-6 px-2 pb-6">
                                        <Controller
                                        control={form.control}
                                        key={material_index}
                                        name={`steps.${index}.materials.${material_index}.material_name`}
                                        render={({ field }) => (
                                            
                                            
                                            <FormItem className='mb-4'>
                                                <FormLabel>
                                                    
                                                    Material Name
                                                    
                                                </FormLabel>
                                                
                                                <FormControl>
                                                    <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            
                                            
                                            
                                            
                                        )}
                                        />
                                        <div className="flex w-full items-end justify-stretch justify-items-stretch space-x-2">
                                            <Controller
                                            control={form.control}
                                            key={material_index}
                                            name={`steps.${index}.materials.${material_index}.quantity`}
                                            render={({ field }) => (
                                                
                                                
                                                <FormItem className='grow'>
                                                    <FormLabel className='flex flex-row mb-3'>
                                                        <>
                                                            Quantity
                                                            
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button className="text-neutral-500" onClick={(e) => e.preventDefault()}>
                                                                            <LuHelpCircle className="h-4 w-4 ml-1.5 hover:opacity-75" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>{materialVariables.quantity.comment}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field}/>
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
                                                    <FormLabel className='flex flex-row mb-3 contnet-center'>
                                                        <>
                                                            Mole
                                                            
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button className="text-neutral-500" onClick={(e) => e.preventDefault()}>
                                                                            <LuHelpCircle className="h-4 w-4 ml-1.5 hover:opacity-75" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                                                                            <b>Description:</b> {materialVariables.mole.description}<br/>
                                                                            <b>Units:</b> {materialVariables.mole.units? materialVariables.mole.units : "---"}<br/>
                                                                            <b>Comment:</b> {materialVariables.mole.comment}<br/>
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                
                                                
                                                
                                                
                                            )}
                                            />
                                        </div>
                                        <div className="flex w-full items-end justify-stretch justify-items-stretch space-x-2 mb-3">
                                            <Controller 
                                            control={form.control}
                                            key={material_index}
                                            name={`steps.${index}.materials.${material_index}.volume`}
                                            render={({ field }) => (
                                                
                                                
                                                <FormItem className='grow'>
                                                    <FormLabel className='flex flex-row mb-3 contnet-center'>
                                                        <>
                                                            Volume
                                                            
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button className="text-neutral-500" onClick={(e) => e.preventDefault()}>
                                                                            <LuHelpCircle className="h-4 w-4 ml-1.5 hover:opacity-75" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                            
                                                                            <b>Description:</b> {materialVariables.volume.description}<br/>
                                                                            <b>Units:</b> {materialVariables.volume.units? materialVariables.volume.units : "---"}<br/>
                                                                            <b>Comment:</b> {materialVariables.volume.comment}<br/>
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here ..." {...field}/>
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
                                                    <FormLabel className='flex flex-row mb-3 contnet-center'>
                                                        <>
                                                            Concentration
                                                            
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button className="text-neutral-500" onClick={(e) => e.preventDefault()}>
                                                                            <LuHelpCircle className="h-4 w-4 ml-1.5 hover:opacity-75" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                        
                                                                            <b>Description:</b> {materialVariables.concentration.description}<br/>
                                                                            <b>Units:</b> {materialVariables.concentration.units? materialVariables.concentration.units : "---"}<br/>
                                                                            <b>Comment:</b> {materialVariables.concentration.comment}<br/>
                                                                        </p>
                                                                        
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here ..." {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                
                                                
                                                
                                                
                                            )}
                                            />
                                        </div>
                                        <div className="flex w-full items-end justify-stretch justify-items-stretch space-x-2 mb-3">
                                            
                                        <Controller 
                                        control={form.control}
                                        key={material_index}
                                        name={`steps.${index}.materials.${material_index}.production_rate`}
                                        render={({ field }) => (
                                            
                                            
                                            <FormItem className='grow'>
                                                <FormLabel className='flex flex-row mb-3 contnet-center'>
                                                        <>
                                                            <h2>Production Rate</h2>
                                                            
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button className="text-neutral-500" onClick={(e) => e.preventDefault()}>
                                                                            <LuHelpCircle className="h-4 w-4 ml-1.5 hover:opacity-75" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                                                                            <b>Description:</b> {materialVariables.production_rate.description}<br/>
                                                                            <b>Units:</b> {materialVariables.production_rate.units? materialVariables.production_rate.units : "---"}<br/>
                                                                            <b>Comment:</b> {materialVariables.production_rate.comment}<br/>
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </>
                                                    </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter variables here..." {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            
                                            
                                            
                                            
                                        )}
                                        />
                                            <Controller 
                                            control={form.control}
                                            key={material_index}
                                            name={`steps.${index}.materials.${material_index}.role`}
                                            render={({ field }) => (
                                                
                                                
                                                <FormItem className='grow'>
                                                    <FormLabel className='flex flex-row mb-3 contnet-center'>
                                                        <>
                                                            Role
                                                            
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button className="text-neutral-500" onClick={(e) => e.preventDefault()}>
                                                                            <LuHelpCircle className="h-4 w-4 ml-1.5 hover:opacity-75" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                        
                                                                            <b>Description:</b> {materialVariables.role.description}<br/>
                                                                            <b>Units:</b> {materialVariables.role.units? materialVariables.role.units : "---"}<br/>
                                                                            <b>Comment:</b> {materialVariables.role.comment}<br/>
                                                                        </p>
                                                                        
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here ..." {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                
                                                
                                                
                                                
                                            )}
                                            />
                                        </div>
                                        <Controller 
                                        control={form.control}
                                        key={material_index}
                                        name={`steps.${index}.materials.${material_index}.smiles`}
                                        render={({ field }) => (
                                            
                                            
                                            <FormItem className='grow'>
                                                <FormLabel className='flex flex-row mb-3 contnet-center'>
                                                    <>
                                                        SMILES
                                                        
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <button className="text-neutral-500" onClick={(e) => e.preventDefault()}>
                                                                        <LuHelpCircle className="h-4 w-4 ml-1.5 hover:opacity-75" />
                                                                    </button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>
                        
                                                                        <b>Description:</b> {materialVariables.smiles.description}<br/>
                                                                        <b>Units:</b> {materialVariables.smiles.units? materialVariables.smiles.units : "---"}<br/>
                                                                        <b>Comment:</b> {materialVariables.smiles.comment}<br/>
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter variables here ..." {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            
                                            
                                            
                                            
                                        )}
                                        />
                                        
                                    </CollapsibleContent>
                                </Collapsible>

    

                                
    
                                
    
                            </>
    )
}