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
    <div className="flex justify-center items-center text-[#B9AEDF]/50 hover:text-[#B9AEDF] transition-colors duration-300">
      <button
        onClick={handleLogout}
        disabled={isPending}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="خروج"
        className="cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center p-2 rounded-full"
      >
        {isHovered ? <IoExit size={27} /> : <IoExitOutline size={27} />}
      </button>
    </div>
  );
}

export default SignoutButton;
