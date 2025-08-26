"use client";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { getCategoryQuery } from "@/src/hooks/query/category";
import { getCompanyQuery } from "@/src/hooks/query/company";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import Link from "next/link";

export default function DropdownNavigator({ children, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const isCategory = item?.type === "category";
  const isCompany = item?.type === "company";

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: getCategoryQuery.queryKey,
    queryFn: getCategoryQuery,
    staleTime: getCategoryQuery.staleTime,
    enabled: isCategory,
  });

  const {
    data: companies,
    isLoading: isLoadingCompanies,
    isError: isErrorCompanies,
  } = useQuery({
    queryKey: getCompanyQuery.queryKey,
    queryFn: getCompanyQuery,
    staleTime: getCompanyQuery.staleTime,
    enabled: isCompany,
  });
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <NavItem item={item} disableLink onClick={() => setIsHovered((v) => !v)}>
        <span className="z-20">{children}</span>
      </NavItem>
      <div
        className={` hidden md:block fixed left-0 top-[50px] shadow-lg p-10 shadow-white/10 duration-300 transition-all ease-in-out w-[100vw] min-h-[200px] origin-top bg-[#0E0C15]/90 ${
          isHovered
            ? "visible opacity-100 scale-y-100"
            : "invisible opacity-0 scale-y-0"
        }`}
      >
        <div className="w-full h-full">
          {isCategory && (
            <>
              {isLoadingCategories && <Spinner />}
              {isErrorCategories && <div>خطا در دریافت دسته‌بندی‌ها</div>}
              {!isLoadingCategories && categories?.length > 0 && (
                <ul className="grid grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors font-vazirmatn"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {isCompany && (
            <>
              {isLoadingCompanies && <Spinner />}
              {isErrorCompanies && <div>خطا در دریافت شرکت‌ها</div>}
              {!isLoadingCompanies && companies?.length > 0 && (
                <ul className="grid grid-cols-3 gap-4">
                  {companies.map((co) => (
                    <li key={co.id}>
                      <Link
                        href={`/company/${co.slug}`}
                        className="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
                      >
                        {co.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
