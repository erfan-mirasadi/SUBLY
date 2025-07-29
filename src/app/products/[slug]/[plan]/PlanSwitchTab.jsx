import Link from 'next/link'
import React from 'react'
import SelectTab from './SelectTab'

export default function PlanSwitchTab({month=true,threeMonth=true,sixMonth=true,year=true,length=4,params}) {
  return (
    <div className='w-full max-w-[500px] mx-auto rounded-lg bg-amber-500  p-2'>
        <div className='w-full flex items-center justify-center bg-yellow-500 relative'>
            <SelectTab length={length}/>
            <Link href={`/products/${params}/?type=1`} dir='rtl' className={` border h-[70px] text-center flex justify-center items-center bg-red-500`} style={{width:`calc(${100/length}%)`}}>
                <span>۱ ماهه</span>
            </Link>
            <Link href={`/products/${params}/?type=3`} dir='rtl' className={` border h-[70px] text-center flex justify-center items-center bg-red-500`} style={{width:`calc(${100/length}%)`}}>
                <span>۳ ماهه</span>
            </Link>
            <Link href={`/products/${params}/?type=6`} dir='rtl' className={` border h-[70px] text-center flex justify-center items-center bg-red-500`} style={{width:`calc(${100/length}%)`}}>
                <span>۶ ماهه</span>
            </Link>
            <Link href={`/products/${params}/?type=12`} dir='rtl' className={` border h-[70px] text-center flex justify-center items-center bg-red-500`} style={{width:`calc(${100/length}%)`}}>
                <span>۱ ساله</span>
            </Link>
        </div>
    </div>
  )
}
