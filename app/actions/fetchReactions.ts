import prisma from "@/lib/prismadb";
import { steps } from "../(dashboard)/(dataTable)/columns";

export const fetchReaction = async () => {
    let db_data = undefined;
  
    try{
      db_data = await prisma.reaction.findMany({
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
    
  
    
  
    const formattedData = db_data?.map((data) => ({
      id: data.id,
      imageURL: data.imageURL,
      rxID: data.rxID,
      url: data.url,
      status: data.status,
      rawText: data.rawText,
      steps: data.steps as steps[],
      annotation: data.annotation,
      createdAt: data.createdAt.toLocaleString(),
      updatedAt: data.updatedAt.toLocaleString(),
    }));
  
    return formattedData
  
  }