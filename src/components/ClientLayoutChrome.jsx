"use client";
import { usePathname } from "next/navigation";
import NavBar from "@/src/components/navBar/NavBar";
import Footer from "../components/Footer";

export default function ClientLayoutChrome({ children }) {
  const pathname = usePathname();
  const hideChrome = pathname === "/login";
  return (
    <>
      {!hideChrome && <NavBar />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}
