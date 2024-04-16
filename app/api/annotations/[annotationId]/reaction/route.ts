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
        smiles,
        subreactions,
    } = body;

    console.log(smiles)
    console.log(subreactions)
    
    const reaction = await prisma.reaction.update({
        where: {
            id: params.annotationId,
        },
        data: {
            smiles: smiles,
            subreactions: subreactions,
        }
    });

    
    return NextResponse.json(reaction);
}