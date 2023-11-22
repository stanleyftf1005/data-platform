import { Margin } from '@/components/Margin';
import {ScrollArea} from '@/components/ui/scroll-area';
import{data} from '../../data';
import RawTextViewer from './(components)/RawTextViewer';
import StepsForm from './(components)/StepsForm';
import {DialogDemo} from './(components)/DialogDemo';
import getReactionById from '@/app/actions/getReactionById';
import LoadingUI from '@/components/LoadingUI';
import DialogWrapper from './(components)/DialogWrapper';
import { LuImage, LuTextSelect, LuBadgeHelp } from 'react-icons/lu';
import Image from 'next/image';
import ReactionDiagram from '@/public/v100p0404.gif';

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
                <div className="flex grow justify-end space-x-4">
                    <DialogWrapper label="Diagram" title="Reaction Diagram" icon={<LuImage className="mr-1.5 h-4 w-4 stroke-[2px]"/>}>
                        <Image src={ReactionDiagram} width={400} height={400} alt="diagram"/>
                    </DialogWrapper>
                    <DialogWrapper label="Annotation" title="Annotation" description="This is the latest version of annotation." icon={<LuTextSelect className="mr-1.5 h-4 w-4 stroke-[2px]"/>}>
                        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                {reaction?.annotation.map((line) => {
                                    return (
                                        line + "\n"
                                    )
                                })}
                            </code>
                        </pre>
                    </DialogWrapper>
                    <DialogWrapper label="Guidelines" icon={<LuBadgeHelp className="mr-1.5 h-4 w-4 stroke-[2px]"/>}>rules</DialogWrapper>

                </div>
                {/*<div className="w-[100px]"></div>*/}

                
                
                
            </div> 
            <div className="flex w-full h-full">
                <ScrollArea className="w-1/2 border-r h-full relative">
                    {/*
                    <div className="py-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center"> 
                        <div className="">
                            <div className="text-base mx-4 font-semibold">Annotations</div>
                            <div className="text-sm mx-4 text-neutral-500">Annotations are used to train the model</div>
                        </div>
                        <div className="mr-4">
                            <DialogDemo label="View Annotation" annotation={reaction?.annotation}/>
                        </div>
                        
        
                    </div>
                    */}
                    
                    <Margin className="min-h-[400px] flex flex-col m-0">
                        <StepsForm reaction={reaction}/>

                    </Margin>
                </ScrollArea>
                <RawTextViewer rawText={reaction?.rawText} url={reaction?.url as string}/>
            </div>
        

        </>
       
            
    )
};


