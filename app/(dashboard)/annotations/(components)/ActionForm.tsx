'use client'

import * as z from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ActionSelectField } from "./ActionSelectField"
import { toast } from "@/components/ui/use-toast"



const formSchema = z.object({
    username: z.string().min(3, {message: "Username must be at least 3 characters long"}).max(50),
    framework: z.string({
        required_error: "Please select a framework.",
      }),
})

export function ActionForm() {
    // Define component logic here

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
        })
    }

    return (
        <div className="px-4 py-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <div className="flex flex-col space-y-3">
                            
                            <FormItem className="flex flex-col">
                                <FormLabel>Action Type</FormLabel>
                                <FormControl>
                                    <ActionSelectField field={field}/>
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Properties</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter variables here such as (Material) [Volume] ..." {...field} />
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                            
                            
                            
                        </div>
                    )}
                    />
                    {/*<Button type="submit">Submit</Button>*/}
                </form>
            </Form>
          
        </div>
    )
}


