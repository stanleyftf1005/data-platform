import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import { Figtree } from 'next/font/google'
import './globals.css'
import {cn} from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'



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
    <ClerkProvider>
      <html lang="en">
        <body className={cn(figtree.className, 'overflow-hidden')}>
          {children}
          
          </body>
      </html>
    </ClerkProvider>
  )
}
