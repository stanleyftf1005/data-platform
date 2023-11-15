import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'



export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="h-full w-full relative flex">
            
        <div className="hidden md:flex max-h-full w-64 flex-col border-r px-3 pb-3">
          <Sidebar/>
        </div>
        <div className="w-full max-h-full">
          {children}  
        </div>
      
    
      </div>
      <Toaster/>
    </>
  )
}
