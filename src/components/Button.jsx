import React from 'react'

export default function Button({children,variant="primary"}) {
  return (
    <>
    {variant === "primary" ? 
    <div className=' rounded-md h-[40px] bg-conic-gradient p-[1px] cursor-pointer hover:scale-99 duration-300 ease-in-out'>
        <button className={` text-white px-4 h-full bg-[#0E0C15]/90 w-full rounded-md cursor-pointer`}>{children}</button>
    </div> 
    :
    <button className={` text-white px-4 py-2 rounded-md cursor-pointer hover:scale-95 duration-300 ease-in-out`}>{children}</button>
    }
    </>
  )
}
