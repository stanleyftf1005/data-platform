import React, { useContext, useState } from 'react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { materials } from '@/app/types';
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { FormContext } from './StepsForm';
import { steps } from '@/app/types';
import { MaterialListItem } from './MaterialListItem';



interface MaterialsListProps {
    // Define your props here
    index: number;
    materialsList: materials[];
    form: UseFormReturn<{
        steps: {
            index: number;
            actionType: string;
            actionProps: string;
            materials?: materials[],
        }[];
    }, any, undefined>;
}

const MaterialsList = ({index, materialsList, form} : MaterialsListProps) => {
    // Component logic here
    const [materials, setMaterials] = useState<materials[]>(materialsList);
    const {stepsValue, update} = useContext(FormContext)

    const emptyMaterial: materials = {
        material_name: "",
        quantity: "",
        mole: "",
        volume: "",
        concentration: "",
        production_rate: "",
    }


    const addMaterialStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setMaterials([...materials, emptyMaterial]);

        

    }

    const handleDeleteMaterial = (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => {

        const newMaterials = materials.filter((material, index) => index !== indexToRemove);
        setMaterials(newMaterials);

        
        if (update !== null){
            update(index, {
                ...stepsValue[index],
                materials: newMaterials
            
            })
            console.log(newMaterials)
        }else{
            console.log("Update is null")
        }
        
    }

    return (
        <div className='py-3'>
            {(materials!== undefined || null) ? (
                        materials.map((material, material_index) => (
                            
                            <MaterialListItem key={material_index} material={material} material_index={material_index} form={form} index={index} handleDeleteMaterial={handleDeleteMaterial} addMaterialStep={addMaterialStep}/>
                        ))
                        
            ) : null
            }

            <div className="flex flex-col justify-items-center mt-6">
                <Button size="sm" variant="ghost" className="w-full gap-1 place-self-center border" onClick={(e)=>addMaterialStep(e)}>
                
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Material
                </Button>
            </div>

        </div>
    );
}

export default MaterialsList;