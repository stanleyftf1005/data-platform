import { Reaction } from "@prisma/client";


export type SafeReaction = Omit<Reaction, "createdAt" | "updatedAt" |"steps"|"components"> & {
    createdAt: string;
    updatedAt: string;
    steps: steps[];
    components: components[];
}

export type steps = {
    index: number,
    actionType: string,
    actionProps?: actionProps[],
    materials?: materials[],
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
}

export type actionProps = {
    name?: string,
    value?: string,

}
