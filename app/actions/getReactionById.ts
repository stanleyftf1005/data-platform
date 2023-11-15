import { SafeReaction } from '@/app/types';
import { steps } from './../(dashboard)/(dataTable)/columns';
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
                steps: reaction.steps as steps[],
                createdAt : reaction.createdAt.toISOString(),
                updatedAt : reaction.updatedAt.toISOString()
            } as SafeReaction
        }
        
        
        
        
    } catch (error:any) {
        throw new Error(error)
    }
    
}