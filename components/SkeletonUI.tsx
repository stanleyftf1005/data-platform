import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'
import { cn } from '@/lib/utils';

interface SkeletonUIProps {
    height: string;
    width: string;
}


const SkeletonUI = ({height,width}:SkeletonUIProps) => {
  return (
    <Skeleton className={cn("rounded-full", `w-${width} h-[${height}]`)}/>
  )
}

export default SkeletonUI