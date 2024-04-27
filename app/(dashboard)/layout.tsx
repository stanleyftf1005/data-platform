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

  const { isAuthenticated, getUser } = getKindeServerSession();

  if(!(await isAuthenticated())) {
    redirect('/api/auth/login')
  }

  //const user = await getUser()
  const user = {
    id: "kp_eb0f466699db4c509f42a922c3fdb267"
  }

  

  let reaction = await fetchReaction()


  /*
  if (user) {
    switch (user.id) {
      case "kp_50c0c663b26c4bf58dbbd9794a5cbc8c":
        reaction = reaction.slice(0, Math.floor(length/4)+1)

      case "kp_eb0f466699db4c509f42a922c3fdb267":
        reaction = reaction.slice(Math.floor(length/4)+1, Math.floor(length/2)+1)
      
      case "kp_670c430302e3417592808190fa2678d8":
        reaction = reaction.slice(Math.floor(length/2)+1, length-Math.floor(length/4)+1)

      case "kp_d6e1e0e0704e4701a288d5f88ee94527":
        reaction = reaction.slice(length-Math.floor(length/4)+1, length)
    }
  }
  */

  

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
