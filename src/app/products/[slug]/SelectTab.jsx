"use client"
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function SelectTab({length}) {
  const searchParams = useSearchParams();
  const index = searchParams.get("index");
  return (
    <div style={{width:`calc(${100/length}%)`,left:`calc(${index/length*100}%)`}} className='absolute duration-300 ease-in-out left-[1px] h-[70px] bg-blue-500/20 rounded-lg' />
  )
}
