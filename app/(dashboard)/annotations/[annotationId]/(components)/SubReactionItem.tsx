import { LuTrash2 } from 'react-icons/lu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItem, FormControl, FormLabel, FormMessage} from '@/components/ui/form'
import { ChevronsUpDown } from 'lucide-react'
import { LuSettings } from 'react-icons/lu'
import { useEffect, useState, useContext, use } from 'react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormContext } from './StepsForm'




interface SubReactionItemProps {
    // define your props here
    index: number;
    form: UseFormReturn<{
        subreactions: {
            index: number;
            procedureText: string;
        }[];
        smiles: string;
    }, any, undefined>;
    handleAddSubReaction: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleRemoveSubReaction: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const SubReactionItem = ({ index, form, handleAddSubReaction, handleRemoveSubReaction }:SubReactionItemProps) => {
    // component logic here
    const [isOpen, setIsOpen] = useState<boolean | undefined>(false)

    const { subReactionsValue } = useContext(FormContext)
    const currentSubReactionObj = subReactionsValue? subReactionsValue[index] : undefined


    return (
        
        <div className='mt-3'>  
                                
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
                        {currentSubReactionObj !== undefined || null ? `${currentSubReactionObj?.index}` : `Sub-Reaction (${index+1})`} 
                        
                    </div>
                    </h4>
                    <div className='flex'>
                        <Button variant="ghost" className="text-neutral-500 p-1 mr-2" onClick={(e)=> handleRemoveSubReaction(e, index)}>
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
                
                <CollapsibleContent className="space-y-2 px-2 py-2">
                    
                    <div className="grid w-full gap-1.5 space-y-3">
                        <Label htmlFor={`subreactions[${index}].procedureText`}>Procedure Text</Label>
                        <Controller
                        control={form.control}
                        name={`subreactions.${index}.procedureText`}
                        key={index}
                        render={({ field }) => (
                        <Textarea
                            placeholder="Enter reaction procedure text here here."
                            {...field}
                        />
                        )}
                        />
                    </div>
                </CollapsibleContent>
            </Collapsible>
                    
                    
                    
                                
                    
                                
                    
                        
        </div>
    )
}

export default SubReactionItem;