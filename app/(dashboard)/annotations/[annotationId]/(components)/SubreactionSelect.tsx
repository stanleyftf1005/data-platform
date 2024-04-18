import React, { useContext } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItem, FormControl, FormLabel, FormMessage, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LuChevronsUpDown, LuCheck } from 'react-icons/lu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { steps, subReactions } from '@/app/types'
import { Button } from '@/components/ui/button';
import { FormContext } from './StepsForm';

interface SubreactionSelectProps {
    // define your props here
    index: number;
    form: UseFormReturn<{
        steps: steps[];
    }, any, undefined>;
    item: steps;
    canEdit: boolean;
}

const SubreactionSelect = ({ form, index, item, canEdit }: SubreactionSelectProps) => {
    // component logic here
    const [subreactionIndex, setSubreactionIndex] = React.useState<number | undefined>(item.subreaction_index) || undefined;

    const {subReactionsValue} = useContext(FormContext)


    return (
        
        <div className='ml-5'>
            <Controller
            control={form.control}
            name={`steps.${index}.subreaction_index`}
            render={({ field }) => (
                
                <FormItem className="flex flex-col">
                
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        
                        
                        <Button
                        disabled={!canEdit}
                        variant="outline"
                        role="combobox"
                        
                        className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value
                            ? `Sub-Reaction ${
                                subReactionsValue?.find(
                                    (sub) => sub.index === field.value
                                )?.index
                            }`
                            : "Select Sub-Reaction"}
                        <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    
                        
                        
                        
                        
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search language..." />
                        <ScrollArea className="h-m-[250px]">
                            <CommandEmpty>No sub-reactions found.</CommandEmpty>
                            <CommandGroup>
                            { subReactionsValue?.map((sub) => (
                                <CommandItem
                                value={sub.index?.toString()}
                                key={sub.index}
                                onSelect={() => {

                                    
                                    form.setValue(`steps.${index}.subreaction_index`, sub.index)
                                    
                                    //sanity action to remove all deafult values andreset the form input state
                                    //setAllowMaterials(findActionTypeObject(actionType.value)?.materials || false)
                                    
                                    //remove all pre-fetch values from the database and set to empty when a new action type is selected
                                    //form.setValue(`steps.${index}.actionProps`, [])

                                }}
                                >
                                <LuCheck
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    sub.index === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                />
                                {sub.index}
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
        </div>
    );
}

export default SubreactionSelect;