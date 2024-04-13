"use client"
import React from 'react'
import SkeletonUI from '@/components/SkeletonUI'

const LoadingRow = () => {
  return (
    <div className="flex justify-start space-x-3 py-2">
        <div className="w-1/5">
        <SkeletonUI height='25px' width='full'/>
        </div>
        <div className="w-2/5">
        <SkeletonUI height='25px' width='full'/>
        </div>
        <div className="w-1/5">
        <SkeletonUI height='25px' width='full'/>
        </div>
        <div className="w-1/5">
        <SkeletonUI height='25px' width='full'/>
        </div>
  </div>
  )
}

export default LoadingRow