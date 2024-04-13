'use client'
import {cn} from '@/lib/utils'

export function Margin (
    {children, className}: {children: React.ReactNode, className?: string}
) {
  return (
    <div className={cn("m-4",className? className:"")}>
        {children}
    </div>
    
  )
}
