import { Margin } from '@/components/Margin';
import {ScrollArea} from '@/components/ui/scroll-area';
import{data} from '../../data';
import RawTextViewer from './(components)/RawTextViewer';
import StepsForm from './(components)/StepsForm';
import {DialogDemo} from './(components)/DialogDemo';
import getReactionById from '@/app/actions/getReactionById';
import LoadingUI from '@/components/LoadingUI';
import DialogWrapper from './(components)/DialogWrapper';
import { LuImage, LuTextSelect, LuBadgeHelp, LuBoxes, LuAtom } from 'react-icons/lu';
import Image from 'next/image';
import ReactionDiagram from '@/public/v100p0404.gif';
import PropTable from '@/public/property-table.png';
import { StatusSelect } from './(components)/StatusSelect';
import ComponentsTable from './(components)/componentsTable';
import { ReactionSettings } from './(components)/ReactionSettings';
  

interface IParams {
    annotationId: string
}

export default async function Page({params}: {params: IParams}) {
    const reaction = await getReactionById(params);

    //console.log(reaction?.steps)
    console.log(reaction?.rxID)
    console.log(reaction)
    
    const imagePath = (rxID:string) => {
        return "https://www.orgsyn.org/content/figures/"+rxID+".gif";
    }

    const path = imagePath(reaction?.rxID as string);
    //handle invalid reaction id route here...
    
    return (
        <>
            <div className="w-full border-b flex justify-between items-center px-4 py-4 sticky top-0 z-10">
                <div className="flex space-x-3 items-center">
                    <h3 className="align-middle text-lg font-semibold">{reaction?.rxID}</h3>
                    <StatusSelect id={reaction?.id} status={reaction?.status}/>
            
                </div>
                
                <div className="flex grow justify-end space-x-4">
                    <DialogWrapper label="Reaction Settings" title="Reaction Settings" icon={<LuAtom className="mr-1.5 h-4 w-4 stroke-[2px]"/>}>
                        <ReactionSettings reaction={reaction}/>
                    </DialogWrapper>
                    
                    {reaction?.components !== undefined &&  reaction?.components.length > 0  ? (
                        <DialogWrapper label="Components" title="Components Table" icon={<LuBoxes className="mr-1.5 h-4 w-4 stroke-[2px]"/>}>
                            <ComponentsTable components={reaction?.components}/>
                        </DialogWrapper>
                    ) : null}
                    
                    
                    <DialogWrapper label="Annotation" title="Annotation" description="This is the latest version of annotation." icon={<LuTextSelect className="mr-1.5 h-4 w-4 stroke-[2px]"/>}>
                        <div className="mt-2 max-w-[850px] rounded-md bg-slate-950 p-4 text-pretty break-words">
                            {/*<code className="text-white max-w-[800px] text-wrap">*/}
                                
                                    {reaction?.annotation.map((line) => {
                                        return (
                                            <>
                                                <h1 className="text-lg text-white text-pretty">
                                                    {line}
                                                </h1>
                                            </>
                                            
                                        )
                                    })}
                                
                            {/*</code>*/}
                        </div>
                    </DialogWrapper>
                    <DialogWrapper label="Guidelines" title="Annotation Guidelines" description="Related properties and variables for annotation."icon={<LuBadgeHelp className="mr-1.5 h-4 w-4 stroke-[2px]"/>}>
                        <Image src={PropTable} width={600} height={600} alt="diagram"/>
                    </DialogWrapper>

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
                        {/*<div className="div"></div>*/}
                        <StepsForm reaction={reaction}/>

                    </Margin>
                </ScrollArea>
                <RawTextViewer imagePath={path} rawText={reaction?.rawText} url={reaction?.url as string}/>
            </div>
        

        </>
       
            
    )
};


