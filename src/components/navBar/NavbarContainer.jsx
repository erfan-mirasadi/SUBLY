"use client";
import { usePathname } from "next/navigation";
import React from "react";
export default function NavbarContainer({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  return (
    <>
      {!isLoginPage && (
        <div
          className={`fixed top-0 left-0 w-full z-50 border-b border-[#252134] bg-[#0E0C15]/90`}
        >
          {children}
        </div>
      )}
    </>
  );
}
