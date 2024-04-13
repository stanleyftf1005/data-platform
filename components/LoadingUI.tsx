import React from 'react'
import SkeletonUI from '@/components/SkeletonUI'
import { Suspense } from 'react';

interface LoadingUIProps {
    height: string;
    width: string;
    children?: React.ReactNode;
}

const LoadingUI = ({height, width, children}:LoadingUIProps) => {
  return (
    <Suspense fallback={<SkeletonUI height={height} width={width} />}>
        {children}
    </Suspense>
  )
}

export default LoadingUI