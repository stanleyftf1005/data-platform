'use client'

import { Margin } from '@/components/Margin';
import {ScrollArea} from '@/components/ui/scroll-area';
import {sample} from './_text';
import RawTextViewer from './(components)/RawTextViewer';
import StepsForm from './(components)/StepsForm';
import {data} from '../data';


export default function Page() {
    return (
        <>
            <div className="w-full border-b flex justify-between items-center px-4 py-4 sticky top-0 z-10">
                <h3 className="text-lg font-semibold">{data[0].id}</h3>
                
            </div> 
            <div className="flex w-full h-full">
                <ScrollArea className="w-2/5 border-r h-full relative">
                    
                    <div className="py-4 border-b sticky top-0 bg-white z-10">
                        <div className="text-base mx-4 font-semibold">Annotations</div>
                        <div className="text-sm mx-4 text-neutral-500">Annotations are used to train the model</div>
                    </div>
                    <Margin className="min-h-[400px] flex flex-col">
                        <StepsForm/>
                        

                    </Margin>
                </ScrollArea>
                <RawTextViewer sample={sample}/>
            </div>
        

        </>
       
            
    )
};


