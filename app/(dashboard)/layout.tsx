import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import { Figtree } from 'next/font/google'
import '../globals.css'
import Sidebar from '@/components/Sidebar'
import {cn} from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'



//const inter = Inter({ subsets: ['latin'] })
const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Data Platform',
  description: 'Annotation tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(figtree.className, 'overflow-hidden')}>
        <div className="h-full w-full relative flex">
          
          <div className="hidden md:flex max-h-full w-64 flex-col border-r px-3 pb-3">
            <Sidebar/>
          </div>
          <div className="w-full max-h-full">
            {children}  
          </div>
          
        
        </div>
        <Toaster/>
        
        </body>
    </html>
  )
}
