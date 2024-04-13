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
import { FieldArrayWithId } from 'react-hook-form';
import { materials } from '@/app/types'
import { useState } from 'react'


interface MaterialListItemProps {
    material_index: number;
    material: materials;
    index: number;
    form: UseFormReturn<{
        steps: {
            index: number;
            actionType: string;
            actionProps: string;
            materials?: materials[],
        }[];
    }, any, undefined>;
    handleDeleteMaterial: (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => void;
    addMaterialStep: (e: React.MouseEvent<HTMLButtonElement>) => void;




}


export const MaterialListItem = ({material, material_index, index, form, handleDeleteMaterial, addMaterialStep}: MaterialListItemProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>  
                                
                                <Collapsible
                                open={isOpen}
                                onOpenChange={setIsOpen}
                                className="space-y-2 mb-3"
                                >
                                    <div className="flex items-center justify-between p-2 mb-4 rounded-md border ">
                                        <h4 className="text-sm font-semibold">
                                        {`Material ${material_index+1}`}
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
                                    
                                    <CollapsibleContent className="space-y-2 px-2 pb-6">
                                        <Controller
                                        control={form.control}
                                        key={material_index}
                                        name={`steps.${index}.materials.${material_index}.material_name`}
                                        render={({ field }) => (
                                            
                                            
                                            <FormItem>
                                                <FormLabel>Material Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} />
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
                                                    <FormLabel>Mole</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field}/>
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
                                                    <FormLabel>Concentration</FormLabel>
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
                                    </CollapsibleContent>
                                </Collapsible>

    

                                
    
                                
    
                            </>
    )
}