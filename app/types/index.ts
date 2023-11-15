import { Reaction } from "@prisma/client";
import { steps } from "../(dashboard)/(dataTable)/columns";

export type SafeReaction = Omit<Reaction, "createdAt" | "updatedAt" |"steps"> & {
    createdAt: string;
    updatedAt: string;
    steps: steps[];
}