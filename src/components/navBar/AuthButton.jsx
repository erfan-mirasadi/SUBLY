"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AuthButton() {
  const [isAuth, setIsAuth] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!isAuth) {
      const token = localStorage.getItem("subly_access_token");
      if (token) {
        setIsAuth(true);
      }
    }
  }, [pathname, isAuth]);
  return (
    <>
      {isAuth && pathname !== "/login" ? (
        <Link
          href="/profile"
          className=" bg-[#0E0C15]/90 px-4 py-2 rounded-lg text-white font-vazirmatn cursor-pointer"
        >
          پروفایل
        </Link>
      ) : (
        <Link
          href="/login"
          className=" bg-[#0E0C15]/90 px-4 py-2 rounded-lg text-white font-vazirmatn cursor-pointer"
        >
          ورود
        </Link>
      )}
    </>
  );
}
