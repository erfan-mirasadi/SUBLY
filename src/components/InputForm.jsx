"use client";
import React, { useState } from 'react'

export default function InputForm({value,onChange,placeholder,name,disabled}) {
    const [isFocused,setIsFocused] = useState(false);
    const handleChange = (e) => onChange({target:{name,value:e.target.value}}); 
  return (
    <div onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className='w-full h-[48px] relative z-[1]'>
        <span className={`absolute select-none font-vazirmatn top-[-14px] left-2 translate-y-[-50%] z-[-1] duration-300 ease-in-out text-gray-500 ${!isFocused && value?.length === 0 ? "translate-y-[20px] translate-x-[6px] text-normal" : "text-sm"}`}>{placeholder}</span>
        <input disabled={disabled} type='tel' name={name} value={value} onChange={handleChange} className='w-full h-full  outline-none border-b-[1px] border-b-gray-300/20 shadow-gray-300/10 p-2' />
    </div>
  )
}
