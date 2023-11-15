import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function POST(
  request: Request, 
) {
  

  const body = await request.json();
  const { 
    imageURL,
    rxID,
    url,
    status,
    rawText,
    steps,
    annotation,
   } = body;



  const listing = await prisma.reaction.create({
    data: {
        imageURL,
        rxID,
        url,
        status,
        rawText,
        steps,
        annotation
    }
  });

  return NextResponse.json(listing);
}