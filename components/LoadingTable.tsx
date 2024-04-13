import React from 'react'
import LoadingRow from '@/components/LoadingRow'

interface LoadingProps {
    rows?: number;
}

const LoadingTable = ({rows}:LoadingProps) => {
return (
    <div className="w-full space-y-4 py-6 px-4 border rounded-md">
        {Array.from(Array(rows).keys()).map((i) => (
            <LoadingRow key={i} />
        ))}
        <LoadingRow />
    </div>
)
    
}

export default LoadingTable