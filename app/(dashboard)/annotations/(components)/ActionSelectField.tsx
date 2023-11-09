import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ScrollArea } from "@/components/ui/scroll-area"

interface ActionSelectFieldProps {
    field: {
        value: string;
    }

}

export function ActionSelectField({field}: ActionSelectFieldProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const frameworks = [
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
      
    
    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
                >
                {value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : "Select action..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                <CommandInput placeholder="Search action type..." />
                <ScrollArea className="h-[250px]">
                    <CommandEmpty>No action found.</CommandEmpty>
                    <CommandGroup className="overflow-y-visible">
                        {frameworks.map((framework) => (
                        <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                            }}
                        >
                            <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value ? "opacity-100" : "opacity-0"
                            )}
                            />
                            {framework.label}
                        </CommandItem>
                        ))}
                    </CommandGroup>

                </ScrollArea>
                
                </Command>
            </PopoverContent>
        </Popover>
    )
}