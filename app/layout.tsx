import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import { Figtree } from 'next/font/google'
import './globals.css'
import {cn} from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation'
import { fetchReaction } from '../app/actions/fetchReactions'


//const inter = Inter({ subsets: ['latin'] })
const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Data Platform',
  description: 'Annotation tool',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = getKindeServerSession();

  if(!(await isAuthenticated())) {
    redirect('/api/auth/login')
  }

  
  //const reaction = await fetchReaction()
  
  return ( 
    

    //<ClerkProvider>

    <html lang="en">
      <body className={cn(figtree.className, 'overflow-hidden')}>
        {children}
      </body>
    </html>
    //</ClerkProvider>
  )
}
