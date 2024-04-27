import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { redirect } from 'next/navigation'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchReaction } from '../actions/fetchReactions';



export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const { isAuthenticated } = getKindeServerSession();

  if(!(await isAuthenticated())) {
    redirect('/api/auth/login')
  }

  

  

  let reaction = await fetchReaction()
  
  

  

  return (
    <>
      <div className="h-full w-full relative flex">
            
        <div className="flex max-h-full w-72 flex-col border-r px-3 pb-3 justify-between">
          <Sidebar reaction={reaction}/>
        </div>
        <div className="w-full max-h-full overflow-hidden">
          {children}  
        </div>
      
    
      </div>
      <Toaster/>
    </>
  )
}
