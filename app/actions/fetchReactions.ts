import prisma from "@/lib/prismadb";
import { steps } from "../types";
import { SafeReaction } from "../types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export const fetchReaction = async () => {
    let reaction = undefined;

    const { getUser } = getKindeServerSession();

    const user = await getUser()


    

    
    
  
    try{
      reaction = await prisma.reaction.findMany({
        orderBy: [
          {
            createdAt: 'desc'
          }
        ]
      })
      
    } catch (e) {
      console.log(e)
      throw new Error('/ route failed')
    }

    const length = reaction.length

    if (user) {
      switch (user.id) {
        case "kp_50c0c663b26c4bf58dbbd9794a5cbc8c":
          reaction = reaction.slice(0, Math.floor(length/4)+1)
          break
  
        case "kp_eb0f466699db4c509f42a922c3fdb267":
          reaction = reaction.slice(Math.floor(length/4)+1, Math.floor(length/2)+1)
          break
        
        case "kp_670c430302e3417592808190fa2678d8":
          reaction = reaction.slice(Math.floor(length/2)+1, length-Math.floor(length/4)+1)
          break
  
        case "kp_d6e1e0e0704e4701a288d5f88ee94527":
          reaction = reaction.slice(length-Math.floor(length/4)+1, length)
          break
      }
    }
    
    
    
  
    const formattedData = reaction?.map((data) => ({
      id: data.id,
      imageURL: data.imageURL,
      rxID: data.rxID,
      url: data.url,
      status: data.status,
      rawText: data.rawText,
      steps: data.steps as steps[],
      smiles: data.smiles,
      annotation: data.annotation,
      createdAt: data.createdAt.toLocaleString(),
      updatedAt: data.updatedAt.toLocaleString(),
    }) as SafeReaction);
  
    return formattedData
  
  }