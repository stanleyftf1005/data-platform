import { SafeReaction } from '@/app/types';
import { steps } from "../types";
import prisma from "@/lib/prismadb";

interface IParams {
    annotationId : string

}

export default async function getReactionById(
    params : IParams
) {
    try{
        const {annotationId} = params
        const reaction = await prisma.reaction.findUnique({
            where : {
                id : annotationId
            }
        })
        
        if(reaction){
            return {
                ...reaction,
                url : reaction.url as string,
                steps: reaction.steps as steps[],
                createdAt : reaction.createdAt.toLocaleString(),
                updatedAt : reaction.updatedAt.toLocaleString()
            } as SafeReaction
        }
        
        
        
        
    } catch (error:any) {
        throw new Error(error)
    }
    
}