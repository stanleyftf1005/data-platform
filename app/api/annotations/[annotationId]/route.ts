import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

interface IParams {
  annotationId?: string;
}

export async function PATCH(
  request: Request, 
  { params }: { params: IParams }
){

    const body = await request.json();
    const { 
        steps,
        annotation,
    } = body;

    
    
    const reaction = await prisma.reaction.update({
        where: {
            id: params.annotationId,
        },
        data: {
            steps: steps,
            annotation: annotation,
        }
    });

    
    return NextResponse.json(reaction);
}