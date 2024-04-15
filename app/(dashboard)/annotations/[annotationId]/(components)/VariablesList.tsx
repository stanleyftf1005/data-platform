import React, { useContext, useState } from 'react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { FormContext } from './StepsForm';
import { steps, materials, actionProps } from '@/app/types';
import { VariableListItem } from './VariableListItem';



interface VariablesListProps {
    // Define your props here
    index: number;
    variablesList: actionProps[];
    actionTypeValue: string;
    form: UseFormReturn<{
        steps: steps[];
    }, any, undefined>;
}

const VariablesList = ({index, variablesList, form, actionTypeValue} : VariablesListProps) => {
    // Component logic here
    const [variables, setVariables] = useState<actionProps[]>(variablesList);
    const {stepsValue, update} = useContext(FormContext)

    const emptyVariable: actionProps = {
        name: "",
        value: "",
    }


    const addVariableStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setVariables([...variables, emptyVariable]);

        

    }

    const handleDeleteVariable = (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => {

        const newVariables = variables.filter((variable, index) => index !== indexToRemove);
        setVariables(newVariables);

        
        if (update !== null){
            update(index, {
                ...stepsValue[index],
                actionProps: newVariables
            
            })
            console.log(newVariables)
        }else{
            console.log("Update is null")
        }
        
    }

    return (
        <div className='py-1'>
            {(variables!== undefined || null) ? (
                        variables.map((variable, variable_index) => (
                            
                            <VariableListItem key={variable_index} variable={variable} variable_index={variable_index} form={form} index={index} actionTypeValue={actionTypeValue} handleDeleteVariable={handleDeleteVariable} addVariableStep={addVariableStep}/>
                        ))
                        
            ) : null
            }

            <div className="flex flex-col justify-items-center mt-6">
                <Button size="sm" variant="secondary" className="w-full gap-1 place-self-center border" onClick={(e)=>addVariableStep(e)}>
                
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Action Variables
                </Button>
            </div>

        </div>
    );
}

export default VariablesList;