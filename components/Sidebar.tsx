"use client"

import {LuTable2, LuUser2, LuFileEdit,LuSettings} from "react-icons/lu"
import Sidebarbutton from "./Sidebarbutton"
import { useContext, useMemo } from 'react'
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SafeReaction } from "@/app/types"
import { fetchReaction } from "../app/actions/fetchReactions"
import { Item } from "@radix-ui/react-select"
import Link from "next/link"
import SideNavItem from "@/components/SideNavItem"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface SidebarProps {
  reaction?: SafeReaction[] | undefined;
}


export default function Sidebar({reaction}: SidebarProps) {
  const pathname = usePathname()
  const {isAuthenticated} = useKindeBrowserClient();


  //const reaction = useContext(reactionContext)

  const route = useMemo(() => [
    {
      label: 'Dataset',
      icon: LuTable2,
      href: '/',
      active: pathname === '/',
    },
    /*
    {
      label: 'Annotations',
      icon: LuFileEdit,
      href: '/annotations',
      active: pathname === '/annotations/',
    },
    {
      label: 'Settings',s
      path: '/settings',
      icon: LuSettings,
      href: '/settings',
    }*/
  ], [pathname])


  
  return (
    <>
      <div className="py-2 my-2">
        <h2 className="mb-4 px-4 text-xl font-semibold tracking-tight">
          Dashboard
        </h2>
        <div className="space-y-1">
          {route.map((item) => (
            <Sidebarbutton
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              active={item.active}
            />
          
          ))}
        </div>
      </div>
      
      {pathname !== '/' && (
        <div className="grow flex flex-col max-h-[74%] border-t pt-3 overflow-hidden">

          <h3 className="text-sm text-neutral-500 font-medium mb-2">Annotations {`(${reaction?.length})`}</h3>
          <ScrollArea className="max-h-full">
            
            <div className="flex flex-col space-y-2">
              {reaction?.map((item) => {
                return (
                  <SideNavItem item={item} key={item.id}/>
                  
                )
              
              })}
            </div>
            
            
          </ScrollArea>
          
          

        </div>

      )}
      

      <div className="w-full bg-gray-100 rounded-lg mt-4">
        

        
          

          {isAuthenticated && (
            <LogoutLink>
              <Button variant="outline" className="w-full">
                Logout
              </Button>
            </LogoutLink>
          )}
          
        
        
      </div>
    </>
      

  )
}