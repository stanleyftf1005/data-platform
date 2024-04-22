"use client"
import { SafeReaction } from "@/app/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import axios, { AxiosError, AxiosResponse } from "axios"
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react"
import { LuLoader2 } from "react-icons/lu"




  

  
  
interface StatusSelectProps {
  id?: string;
  status?: string | null | undefined
}

export function StatusSelect({id, status}: StatusSelectProps) {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  
  const updateStatus = async (fieldStatus: string) => {
    
    setIsLoading(true)
    await axios.patch(`/api/annotations/${id}/status`, { status: fieldStatus })
    .then((res: AxiosResponse) => {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    {/*<code className="text-white">{JSON.stringify(res.data.annotation, null, 2)}</code>*/}
                    {/**/}
                    <code className="text-white">
                        {res.data.status}
                    </code>
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
    <Select disabled={isLoading} defaultValue={status !== undefined || null ? status as string : undefined} onValueChange={(value)=> updateStatus(value)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select a status" />{isLoading && <LuLoader2 className="animate-spin ml-2 h-4 w-4"/>}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
          <SelectItem value="Invalid">Invalid</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
