'use client'

import { Margin } from '@/components/Margin';
import {data} from '../data';
import {ButtonWithIcon} from '@/components/ButtonWithIcon';
import Link from 'next/link';
import {LuArrowUpRight} from 'react-icons/lu';


export default function Annotation() {
    return (
       <>
        <div className="flex-1 border-b flex justify-between items-center px-6 py-3 sticky top-0 z-10">
            <h3 className="text-base font-medium">{data[0].id}</h3>
            <Link href={data[0].url} target="_blank">
                <ButtonWithIcon label="View Original" icon={LuArrowUpRight} className="text-xs rounded-full px-3 py-0 h-8"></ButtonWithIcon>
            </Link>
            
            

        </div>  
        
        <Margin>
        </Margin>

       </>
       
            
    );
};


