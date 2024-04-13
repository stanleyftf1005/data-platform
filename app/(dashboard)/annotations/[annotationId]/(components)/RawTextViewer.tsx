'use client'

import {ScrollArea} from '@/components/ui/scroll-area';
import {Margin} from '@/components/Margin';
import {ButtonWithIcon} from '@/components/ButtonWithIcon';
import Link from 'next/link';
import {LuArrowUpRight} from 'react-icons/lu';
import {data} from '../../../data';
import LoadingUI from '@/components/LoadingUI';
import Image from 'next/image';

interface RawTextViewerProps {
    rawText: string|undefined;
    url: string;
    imagePath: string;
}

//"https://www.orgsyn.org/content/figures/"+



export default function RawTextViewer({rawText, url, imagePath}: RawTextViewerProps) {
    
    return(
        <ScrollArea className="w-1/2 flex-auto flex flex-col pb-12">
            <Margin className="h-full flex flex-col">
                <div className="mb-6 py-3">
                    <Image src={imagePath} width={500} height={300} alt="diagram"/>
                </div>
                
                
                <div className="flex mb-4 justify-between">
                    <div>
                        <div className="text-base font-semibold">Raw Data</div>
                        <div className="text-sm text-neutral-500">The original procedure text is shown below</div>
                    </div>
                    <Link href={url} target="_blank">
                        <ButtonWithIcon label="View Original" icon={LuArrowUpRight} className="text-sm rounded-xl h-10"></ButtonWithIcon>
                    </Link>
                        
                </div>

                <div className="border w-full rounded-md px-3 py-2 mb-8 text-base shadow-sm">
                    <LoadingUI height="full" width="w-[full]">
                        <p>{rawText}</p>
                    </LoadingUI>
                </div>
                
            </Margin>
        </ScrollArea>
    )
}