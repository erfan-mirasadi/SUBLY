import React from 'react'
import Spinner from './ui/Spinner'

export default function Button({children,variant="primary",loading=false,disabled=false}) {
  return (
    <>
    {variant === "primary" ? 
    <div className={`rounded-md h-[40px] bg-conic-gradient p-[1px] cursor-pointer ${loading ? "hover:scale-100" : "hover:scale-99"} duration-300 ease-in-out`}>
        <button disabled={loading || disabled} className={` text-white text-center flex justify-center items-center px-4 h-full bg-[#0E0C15]/97 w-full rounded-md  font-vazirmatn text-[18px] ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}>{loading ? <Spinner /> : children}</button>
    </div> 
    :
    <button className={` text-white px-4 py-2 text-center flex justify-center items-center rounded-md cursor-pointer hover:scale-95 duration-300 ease-in-out font-vazirmatn text-[18px]`}>{loading ? <Spinner /> : children}</button>
    }
    </>
  )
}
