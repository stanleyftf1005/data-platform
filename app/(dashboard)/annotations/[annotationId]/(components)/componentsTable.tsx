'use client';
import React from 'react';
import { components } from '@/app/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import clipboardCopy  from 'clipboard-copy';
import Image from 'next/image';

interface ComponentsTableProps {
    // define your props here
    components?: components[];
}

const ComponentsTable = ({components}: ComponentsTableProps) => {

    // Q: filter components, only keep the ones if the accuracy is higher than 80%, show me the code
    //
    const filterComponents = (components: components[]) => {
        return components?.filter((component) => component.confidence > 0.7);
    }

    const handleCopy = (text: string) => {
        clipboardCopy(text)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch((error) => {
                console.error('Failed to copy text to clipboard:', error);
            });
    };
    

    const filteredComponents = (components !== undefined &&  components.length > 0 ) ? filterComponents(components) : undefined;

    return (
        <div className='relative max-h-[400px] overflow-auto'>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow className='sticky top-0'>
                            <TableHead>Component Name</TableHead>
                            <TableHead>SMILES</TableHead>
                            <TableHead>Structure</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        
                            {filteredComponents?.map((component, index) => (
                                
                                <TableRow key={index}>
                                    <TableCell className="font-medium capitalize">
                                        {component.com_name}
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className='h-8 px-2 ml-3 text-xs font-medium' onClick={()=>handleCopy(component.com_name)}>Copy</Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-20 h-12">
                                                <div>
                                                    <div className="space-y-1">
                                                        
                                                        <p className="text-xs font-medium text-center">
                                                            Copied
                                                        </p>
                                                    </div>
                                                
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        
                                    </TableCell>
                                    <TableCell>
                                        {component.smiles}
                                        
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <Button variant="outline" className='h-8 px-2 ml-3 text-xs font-medium' onClick={()=>handleCopy(component.smiles)}>Copy</Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-20 h-12">
                                                <div>
                                                    <div className="space-y-1">
                                                        
                                                        <p className="text-xs font-medium text-center">
                                                            Copied
                                                        </p>
                                                    </div>
                                                
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                    <TableCell className='min-w-[150px]'>
                                        <Image src={`https://www.orgsyn.org/httphandlers/substancetooltip.ashx?id=${component.img_id}`} alt={component.com_name} width={150} height={150} />
                                    </TableCell>
                                </TableRow>
                            
                            ))}
                        
                       
                    </TableBody>
            </Table>

        </div>
    );
}

export default ComponentsTable;