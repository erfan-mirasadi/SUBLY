"use client";
import { useLogout } from "@/src/hooks/mutate/auth";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoExit, IoExitOutline } from "react-icons/io5";
import Spinner from "../ui/Spinner";

function SignoutButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { mutate: logout, isPending } = useLogout();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuth) {
      const token = localStorage.getItem("subly_access_token");
      if (token) {
        setIsAuth(true);
      }
    }
  }, [pathname, isAuth]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  if (isPending) return <Spinner size={20} />;

  if (!isAuth) return null;

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="خروج"
      className="flex flex-col items-center justify-center text-[#B9AEDF]/50 hover:text-[#B9AEDF] transition-colors duration-300 cursor-pointer hover:scale-110 p-2 rounded-full md:rounded-lg md:flex-row md:gap-2"
    >
      {isHovered ? <IoExit size={27} /> : <IoExitOutline size={27} />}
      <span className="mt-2 text-[#B9AEDF] bg-[#18162A]/80 px-4 py-1 rounded-lg text-sm font-vazirmatn shadow-md md:hidden">
        خروج
      </span>
    </button>
  );
}

export default SignoutButton;
