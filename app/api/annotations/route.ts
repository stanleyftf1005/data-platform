import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function POST(
  request: Request, 
) {
  

  const body = await request.json();
  /*
  const { 
    imageURL,
    rxID,
    url,
    status,
    rawText,
    steps,
    annotation,
    origin,
    smiles,
    components,
   } = body;*/


  
  const listing = await prisma.reaction.createMany({
    data: body
  });
  console.log(body)

  return NextResponse.json(listing);
}