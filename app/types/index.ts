import { Reaction } from "@prisma/client";


export type SafeReaction = Omit<Reaction, "createdAt" | "updatedAt" |"steps"|"components"|"subreactions"> & {
    createdAt: string;
    updatedAt: string;
    steps: steps[];
    components: components[];
    subreactions: subReactions[];
}

export type steps = {
    index: number,
    actionType: string,
    actionProps?: actionProps[],
    materials?: materials[],
    subreaction_index?: number,
}

export type components = {
    com_name: string,
    img_id: string,
    img_path: string,
    smiles: string,
    confidence: number,
}

export type materials = {
    material_name?: string;
    quantity?: string;
    mole?: string;
    volume?: string;
    concentration?: string;
    production_rate?: string;
    smiles?: string;
    role?: string;
}

export type actionProps = {
    name?: string,
    value?: string,

}

export type subReactions = {
    index?: number,
    rawText?: string,

}
