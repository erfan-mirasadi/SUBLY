"use client";
import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseCircle } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { navigation } from "@/src/lib/staticData";
import NavItem from "./NavItem";
import { useQuery } from "@tanstack/react-query";
import { getCategoryQuery } from "@/src/hooks/query/category";
import { getCompanyQuery } from "@/src/hooks/query/company";
import Spinner from "../ui/Spinner";
import Link from "next/link";
import { useGetCurrentUser } from "@/src/hooks/query/user";
import SignoutButton from "./SignoutButton";

export default function Menu() {
  const { data: user, isPending: userLoading } = useGetCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [secondMenuOpen, setSecondMenuOpen] = useState(false);
  const [selectedMenuType, setSelectedMenuType] = useState(null);
  const secondMenuRef = useRef(null);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: getCategoryQuery.queryKey,
    queryFn: getCategoryQuery,
    staleTime: getCategoryQuery.staleTime,
  });

  const {
    data: companies,
    isLoading: isLoadingCompanies,
    isError: isErrorCompanies,
  } = useQuery({
    queryKey: getCompanyQuery.queryKey,
    queryFn: getCompanyQuery,
    staleTime: getCompanyQuery.staleTime,
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (secondMenuRef.current && !secondMenuRef.current.contains(e.target)) {
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    if (!isOpen) {
      setSecondMenuOpen(false);
    }
  }, [isOpen]);

  const itemClickHandler = (item) => {
    switch (item.title) {
      case "دسته بندی":
        setSecondMenuOpen(true);
        setSelectedMenuType("category");
        break;
      case "شرکت ها":
        setSecondMenuOpen(true);
        setSelectedMenuType("company");
        break;
      default:
        setIsOpen(false);
    }
  };

  return (
    <div className="md:hidden p-1 relative z-50">
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#0E0C15]/90 backdrop-blur-sm duration-300 transition-all ease-in-out z-40 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <span className="bg-conic-gradient p-[1px] rounded-full absolute top-5 right-5 cursor-pointer overflow-hidden">
          <span className="bg-red-500">
            <IoCloseCircle
              size={35}
              onClick={() => setIsOpen(false)}
              className="bg-[#0E0C15]/90 rounded-full"
            />
          </span>
        </span>
        <div className="flex flex-col items-center justify-start pt-[80px] gap-4 h-full">
          <div className="w-full flex flex-col items-center gap-2 mb-8">
            <span className="p-[1px] rounded-full w-fit font-vazirmatn">
              <FaCircleUser size={50} />
            </span>
            {userLoading ? (
              <Spinner size={24} />
            ) : user ? (
              <span>
                {user.name
                  ? user.name.split(" ")[0]
                  : user.phone
                  ? user.phone
                  : null}
              </span>
            ) : (
              <Link
                href="/login"
                className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors font-vazirmatn"
              >
                ورود
              </Link>
            )}
            {/* Show SignoutButton at the end of the menu for mobile */}
          </div>
          {navigation.map((item) => (
            <span key={item.id} onClick={() => itemClickHandler(item)}>
              <NavItem item={item} disableLink={!item.url}>
                {item.title}
              </NavItem>
            </span>
          ))}
          <div className="md:hidden mt-4 ">
            <SignoutButton />
          </div>
        </div>
        <div
          className={`fixed bottom-0 left-0 w-screen h-screen backdrop-blur-sm duration-300 transition-all ease-in-out z-40 ${
            secondMenuOpen
              ? "translate-y-0 visible"
              : "translate-y-full invisible"
          }`}
        >
          <div
            ref={secondMenuRef}
            className="w-full h-[60%] bg-[#0E0C15]/90 absolute bottom-0 rounded-t-3xl shadow-t-lg p-6"
          >
            <span className="bg-conic-gradient p-[1px] rounded-full absolute top-5 right-5 cursor-pointer overflow-hidden">
              <span className="bg-[#0E0C15]/90 rounded-full">
                <IoCloseCircle
                  size={35}
                  onClick={() => setSecondMenuOpen(false)}
                  className="text-white"
                />
              </span>
            </span>
            <div className="mt-12">
              <h3 className="text-white text-xl font-bold mb-6 text-center">
                {selectedMenuType === "category" ? "دسته‌بندی‌ها" : "شرکت‌ها"}
              </h3>
              <div className="space-y-4">
                {selectedMenuType === "category" && (
                  <div>
                    {isLoadingCategories && (
                      <div className="text-white text-center">
                        <Spinner />
                      </div>
                    )}
                    {isErrorCategories && (
                      <div className=" text-center text-red-400">
                        خطا در دریافت دسته‌بندی‌ها
                      </div>
                    )}
                    {!isLoadingCategories &&
                      !isErrorCategories &&
                      categories?.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/category/${cat.slug}`}
                              onClick={() => {
                                setSecondMenuOpen(false);
                                setIsOpen(false);
                              }}
                            >
                              <div className="bg-white/10 rounded-lg p-3 text-center hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="text-white text-sm">
                                  {cat.title}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                )}
                {selectedMenuType === "company" && (
                  <div>
                    {isLoadingCompanies && (
                      <div className="text-white text-center">
                        <Spinner />
                      </div>
                    )}
                    {isErrorCompanies && (
                      <div className="text-center text-red-400">
                        خطا در دریافت شرکت‌ها
                      </div>
                    )}
                    {!isLoadingCompanies &&
                      !isErrorCompanies &&
                      companies?.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          {companies.map((co) => (
                            <Link
                              key={co.id}
                              href={`/company/${co.slug}`}
                              onClick={() => {
                                setSecondMenuOpen(false);
                                setIsOpen(false);
                              }}
                            >
                              <div className="bg-white/10 rounded-lg p-3 text-center hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="text-white text-sm">
                                  {co.title}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RxHamburgerMenu
        size={25}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      />
    </div>
  );
}
