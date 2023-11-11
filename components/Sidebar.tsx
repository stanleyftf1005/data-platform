'use client'

import {LuTable2, LuUser2, LuFileEdit,LuSettings} from "react-icons/lu"
import Sidebarbutton from "./Sidebarbutton"
import { useMemo } from 'react'
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs";


export default function Sidebar() {
  
  const pathname = usePathname()

  const route = useMemo(() => [
    {
      label: 'Dataset',
      icon: LuTable2,
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'Annotations',
      icon: LuFileEdit,
      href: '/annotations',
      active: pathname === '/annotations',
    },
    /*{
      label: 'Settings',
      path: '/settings',
      icon: LuSettings,
      href: '/settings',
    }*/
  ], [pathname])
  
  return (
    <>
      <div className="flex-1 py-2 my-4">
        <h2 className="mb-6 px-4 text-xl font-semibold tracking-tight">
          Dashboard
        </h2>
        <div className="space-y-1.5">
          {route.map((item) => (
            <Sidebarbutton
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              active={item.active}
            />
          
          ))}
          {/*<Sidebarbutton active label="Dataset" icon={LuTable2}/>
          <Sidebarbutton label="Annotations" icon={LuFileEdit}/>
          <Sidebarbutton label="Members" icon={LuUser2}/>
          <Sidebarbutton label="Settings" icon={LuSettings}/>*/}
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-lg h-16 mb-4">
        <UserButton afterSignOutUrl="/"/>
      </div>
    </>
      

  )
}