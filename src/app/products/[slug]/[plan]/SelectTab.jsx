"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

export default function SelectTab({length}) {
    const pathname = usePathname()
    console.log(pathname);
  return (
    <div style={{width:`calc(${100/length}%)`}} className='absolute left-[1px] h-[70px] bg-blue-500 rounded-lg' />
  )
}
