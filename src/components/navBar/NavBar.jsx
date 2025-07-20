"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import MobileMenu from "./MobileMenu";
import useActiveLink from "@/src/hooks/useActiveLink";
import DropdownNavigator from "./DropdownNavigator";

const navigation = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Products",
    url: "/products",
  },
  {
    id: 3,
    title: "Company",
    url: "/compony",
  },
  {
    id: 4,
    title: "Category",
    url: "/category",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
];

function NavBar() {
  const [openNavigation, setOpenNavigation] = useState(false);
  const activeHash = useActiveLink(); //hook to get the current active hash

  //for hiding the scrollbar when the menu is open
  useEffect(() => {
    if (openNavigation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openNavigation]);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-[#252134] lg:bg-[#0E0C15]/90 ${
        openNavigation ? "bg-[#0E0C15]" : "bg-[#0E0C15]/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 lg:px-8 xl:px-10 max-w-[1440px] mx-auto">
        <Link href="/" className="block w-[140px] xl:mr-8">
          <div className="text-2xl text-white font-grotesk uppercase">
            SUBLY
          </div>
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[72px] left-0 right-0 bottom-0 bg-[#1B1B2E] lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row -top-[72px] md:top-0">
            {navigation
              .filter(
                (item) => item.title !== "Category" && item.title !== "Company"
              )
              .map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={item.url === activeHash}
                  onClick={handleClick}
                />
              ))}
            {/* Switcher for Category/Company */}
            <DropdownNavigator />
          </div>

          {openNavigation && <MobileMenu />}
        </nav>

        <div className="hidden lg:flex items-center gap-4 text-xs font-grotesk">
          <a
            href="/signup"
            className="text-[#FFFFFF]/50 hover:text-[#ADA8C3] px-4 py-2"
          >
            New account
          </a>
          <a
            href="/signin"
            className="px-4 py-2 bg-[#FFFFFF]/50 rounded-lg text-[#1B1B2E] font-medium hover:bg-opacity-90 transition-all "
          >
            Sign in
          </a>
        </div>

        <button
          className="flex lg:hidden items-center justify-center w-10 h-10 group"
          onClick={toggleNavigation}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute left-0 w-full h-[2px] bg-white rounded-sm transition-all duration-300 group-hover:bg-[#AC6AFF]/50 ${
                openNavigation ? "top-[7.5px] rotate-150" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 w-full h-[2px] bg-white rounded-sm transition-all duration-300 group-hover:bg-[#AC6AFF]/80 ${
                openNavigation ? "bottom-[10px] -rotate-150" : "bottom-0.5"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
export default NavBar;
