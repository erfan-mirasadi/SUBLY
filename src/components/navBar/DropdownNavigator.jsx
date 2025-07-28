"use client";
import React, { useState } from 'react'
import NavItem from './NavItem';

export default function DropdownNavigator({children,item}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <NavItem item={item} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
      <div className={` hiiden md:block fixed left-0 top-[50px] shadow-lg p-10 shadow-white/10 duration-300 transition-all ease-in-out w-[100vw] min-h-[200px] origin-top bg-[#0E0C15]/90 ${isHovered ? 'visible opacity-100 scale-y-100' : 'invisible opacity-0 scale-y-0'}`}>
        <div className='w-full h-full bg-red-500'>1</div>
      </div>
      <span className='z-20'>{children}</span>
    </NavItem>
  )
}