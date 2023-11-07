'use client'

import {ScrollArea} from '@/components/ui/scroll-area';
import {Margin} from '@/components/Margin';
import {ButtonWithIcon} from '@/components/ButtonWithIcon';
import Link from 'next/link';
import {LuArrowUpRight} from 'react-icons/lu';
import {data} from '../../data';

interface RawTextViewerProps {
    sample: string[];
}

export default function RawTextViewer({sample}: RawTextViewerProps) {
    return(
        <div className="w-3/5 flex-auto flex flex-col">
            <Margin className="h-full flex flex-col">
                <div className="flex mb-4 justify-between">
                    <div>
                        <div className="text-base font-semibold">Raw Data</div>
                        <div className="text-sm text-neutral-500">The original procedure text is shown below</div>
                    </div>
                    <Link href={data[0].url} target="_blank">
                        <ButtonWithIcon label="View Original" icon={LuArrowUpRight} className="text-sm rounded-xl h-10"></ButtonWithIcon>
                    </Link>
                        
                </div>
                <ScrollArea className="border w-full max-h-[520px] rounded-md px-3 py-2 text-base shadow-sm">
                    <p>{sample[0]}</p>
                </ScrollArea>
                
            </Margin>
        </div>
    )
}