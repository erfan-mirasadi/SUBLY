"use client"
import React, { useEffect, useRef, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseCircle } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { navigation } from '@/src/lib/staticData';
import NavItem from './NavItem';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [secondMenuOpen, setSecondMenuOpen] = useState(false);
    const secondMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                secondMenuRef.current &&
                !secondMenuRef.current.contains(e.target)
            ) {
                setSecondMenuOpen(false);
            }
        };

        if (secondMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [secondMenuOpen]);

    useEffect(()=>{
        if(isOpen){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
        if(!isOpen){
            setSecondMenuOpen(false);
        }
    },[isOpen])
    
    const itemClickHandler = (item) => {
        switch(item.title){
            case "Category":
                setSecondMenuOpen(true);
                break;
            case "Company":
                setSecondMenuOpen(true);
                break;
            default:
                setIsOpen(false);
        }

    }

  return (
    <div className='md:hidden p-1 relative z-50'>
        <div className={`fixed top-0 left-0 w-screen h-screen bg-[#0E0C15]/90 backdrop-blur-sm duration-300 transition-all ease-in-out z-40 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <span className="bg-conic-gradient p-[1px] rounded-full absolute top-5 right-5 cursor-pointer overflow-hidden">
               <span className='bg-red-500'><IoCloseCircle size={35} onClick={()=>setIsOpen(false)} className='bg-[#0E0C15]/90 rounded-full'/></span>
            </span>
            <div className='flex flex-col items-center justify-start pt-[80px] gap-4 h-full'>
                <div className='w-full flex flex-col items-center gap-2 mb-8'>
                <span className=" p-[1px] rounded-full w-fit">
                    <FaCircleUser size={50}/>
                </span>
                    <span>فرزین محمدی</span>
                </div>
                {navigation.map((item)=>(<span key={item.id} onClick={()=>itemClickHandler(item)}><NavItem href={item.url}  item={item}>{item.title}</NavItem></span>))}
            </div>
            <div className={`fixed bottom-0 left-0 w-screen h-screen backdrop-blur-sm duration-300 transition-all ease-in-out z-40 ${secondMenuOpen ? 'translate-y-0 visible' : 'translate-y-full invisible'}`}>
                <div ref={secondMenuRef} className='w-full h-[60%] bg-blue-500 absolute bottom-0 rounded-t-3xl shadow-t-lg'>
                   <span className="bg-conic-gradient p-[1px] rounded-full absolute top-5 right-5 cursor-pointer overflow-hidden">
                       <span className='bg-red-500'> <IoCloseCircle size={35} onClick={()=>setSecondMenuOpen(false)} className='bg-[#0E0C15]/90 rounded-full'/></span>
                   </span>
                </div>
            </div>
        </div>
        <RxHamburgerMenu size={25} onClick={()=>setIsOpen(true)} className='cursor-pointer' />
    </div>
  )
}
