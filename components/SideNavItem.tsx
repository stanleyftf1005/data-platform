"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { SafeReaction } from '@/app/types';
import { usePathname } from 'next/navigation';

interface SideNavItemProps {
    item?: SafeReaction | undefined;
    
}

const SideNavItem = ({item}: SideNavItemProps) => {
    
    const pathname = usePathname()
    
    const linkRef = useRef<HTMLAnchorElement>(null)

    const navPath = "/annotations/" + item?.id

    const active = (pathname === navPath)? "bg-neutral-100 border-[1.2px] border-neutral-200" : ""

    const isActive = (pathname === navPath)

    useEffect(() => {
        

        if(isActive && linkRef.current) {
            linkRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }
    }, [isActive])

    return (
    <Link href={`/annotations/${item?.id}`} ref={linkRef} className={`p-2 rounded-lg hover:bg-neutral-100 ${active}`} key={item?.id}>
        <h3 className="text-md font-semibold">{item?.rxID}</h3>
        <p className="text-sm font-normal text-neutral-400">{item?.status}</p>

    </Link>
  )
}

export default SideNavItem