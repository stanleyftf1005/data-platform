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
import { useEffect } from "react"




  

  
  
interface StatusSelectProps {
  id?: string;
  status?: string | null | undefined
}

export function StatusSelect({id, status}: StatusSelectProps) {

  const router = useRouter()

  
  const updateStatus = async (fieldStatus: string) => {
    
    
    await axios.patch(`/api/annotations/${id}/status`, { status: fieldStatus })
    .then((res: AxiosResponse) => {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    {/*<code className="text-white">{JSON.stringify(res.data.annotation, null, 2)}</code>*/}
                    <code className="text-white">
                        {res.data.status}
                    </code>
                </pre>
            ),
        })
        router.refresh()
        
        
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
    
  }
  
  return (
    <Select defaultValue={status !== undefined || null ? status as string : undefined} onValueChange={(value)=> updateStatus(value)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select a status" />
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
