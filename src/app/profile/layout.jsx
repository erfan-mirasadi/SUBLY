"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";
import Link from "next/link";

export default function ProfileLayout({children}) {
    const [isAuth,setIsAuth] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        const token = localStorage.getItem("subly_access_token");
        if(token){
            setIsAuth(true);
        }else{
            router.push("/login");
        }
    },[]);
  return (
    <div className="w-full min-h-screen pt-[100px] bg-red-500">
        {!isAuth ? <div className="w-full min-h-screen flex justify-center items-center"> <Spinner size={40}/> </div> : 
        <div className="w-full min-h-screen flex flex-col">
            <nav className="w-full flex justify-center items-center gap-4">
                <Link href="/profile/account">Account</Link>
                <Link href="/profile/settings">Settings</Link>
                <Link href="/profile/orders">Orders</Link>
            </nav>
            {children}
        </div>
    }
    </div>
  )
}
