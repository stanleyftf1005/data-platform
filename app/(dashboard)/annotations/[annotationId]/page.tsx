import { Margin } from '@/components/Margin';
import {ScrollArea} from '@/components/ui/scroll-area';
import {sample} from './_text';
import{data} from '../../data';
import RawTextViewer from './(components)/RawTextViewer';
import StepsForm from './(components)/StepsForm';
import {DialogDemo} from './(components)/DialogDemo';
import getReactionById from '@/app/actions/getReactionById';

interface IParams {
    annotationId: string
}

export default async function Page({params}: {params: IParams}) {
    const reaction = await getReactionById(params);

    console.log(reaction)


    //handle invalid reaction id route here...
    
    return (
        <>
            <div className="w-full border-b flex justify-between items-center px-4 py-4 sticky top-0 z-10">
                <h3 className="text-lg font-semibold">{reaction?.rxID}</h3>
                
                
            </div> 
            <div className="flex w-full h-full">
                <ScrollArea className="w-1/2 border-r h-full relative">
                    <div className="py-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center"> 
                        <div className="">
                            <div className="text-base mx-4 font-semibold">Annotations</div>
                            <div className="text-sm mx-4 text-neutral-500">Annotations are used to train the model</div>
                        </div>
                        <div className="mr-4">
                            <DialogDemo label="View Rules" annotation={reaction?.annotation}/>
                        </div>
                        
        
                    </div>
                    
                    <Margin className="min-h-[400px] flex flex-col">
                        <StepsForm reaction={reaction}/>

                    </Margin>
                </ScrollArea>
                <RawTextViewer sample={sample}/>
            </div>
        

        </>
       
            
    )
};


