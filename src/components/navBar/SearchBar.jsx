"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "@/src/hooks/query/product";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";

export default function SearchBar({ onProductClick }) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const { data: products = [] } = useQuery({
    queryKey: getProductsQuery.queryKey,
    queryFn: getProductsQuery,
    staleTime: getProductsQuery.staleTime,
  });

  const results = term.trim()
    ? products.filter((p) =>
        p.title?.toLowerCase().includes(term.toLowerCase())
      )
    : [];

  // Outside click handler - just for desktop
  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        // only work outside click on desktop (md and up)
        if (window.innerWidth >= 768) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  // Close handler for mobile and desktop
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setTerm(""), 150);
  };

  // Focus and select input when opening
  useEffect(() => {
    if (open && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [open]);

  // Prevent body scroll in mobile
  useEffect(() => {
    if (open && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Clear term when closing
  const handleToggle = () => {
    setOpen((prev) => {
      const newState = !prev;
      if (!newState) {
        // Clear term when closing
        setTimeout(() => setTerm(""), 0);
      }
      return newState;
    });
  };

  const handleProductClick = () => {
    handleClose();
    //for closing the main menu
    if (onProductClick) {
      onProductClick();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="p-2 rounded-md bg-transparent transition flex items-center justify-center cursor-pointer"
        aria-label="search"
      >
        <BsSearch className="text-gray-600 w-6 h-6 md:w-4 md:h-4 hover:text-white hover:scale-110 transition-all duration-300" />
      </button>

      {/* Desktop Version */}
      <div
        aria-hidden={!open}
        className={
          "hidden md:block absolute left-0 mt-2 w-[320px] bg-[#0E0C15] border border-[#252134] rounded-lg p-3 z-40 transform transition-all duration-200 origin-top " +
          (open
            ? "opacity-100 translate-y-3 scale-100 pointer-events-auto shadow-lg shadow-gray-800/30"
            : "opacity-0 -translate-y-5 scale-95 pointer-events-none")
        }
      >
        <input
          ref={inputRef}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="جستجو بر اساس عنوان..."
          className="w-full p-2 font-vazirmatn rounded-md bg-[#15131D] border border-[#252134] text-white/40 outline-none focus:border-[#3a3654] transition-colors"
        />

        <ul className="mt-2 max-h-48 overflow-auto">
          {term && results.length === 0 ? (
            <li className="text-sm text-[#757185] p-2">یافت نشد</li>
          ) : (
            results.map((p) => (
              <li key={p.id} className="p-2">
                <Link
                  href={`/products/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white block hover:text-gray-300 transition-colors"
                >
                  {p.title}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Mobile Version - Full Screen */}
      <div
        className={`md:hidden fixed top-0 left-0 w-screen h-screen bg-[#0E0C15]/95 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Close Button */}
        <span className="bg-conic-gradient p-[1px] rounded-full absolute top-5 right-5 cursor-pointer overflow-hidden">
          <span className="bg-red-500">
            <IoCloseCircle
              size={35}
              onClick={handleClose}
              className="bg-[#0E0C15]/90 rounded-full text-white"
            />
          </span>
        </span>

        {/* Search Content */}
        <div className="flex flex-col items-center justify-start pt-20 px-6 h-full">
          {/* Search Input */}
          <div className="w-full max-w-md mb-6">
            <div className="relative">
              <BsSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="جستجو بر اساس عنوان..."
                className="w-full p-4 pr-12 font-vazirmatn rounded-xl bg-[#15131D] border border-[#252134] text-white placeholder-gray-400 outline-none focus:border-[#3a3654] transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="w-full max-w-md flex-1 overflow-hidden">
            {term && (
              <div className="bg-[#15131D] border border-[#252134] rounded-xl overflow-hidden">
                <div className="max-h-[60vh] overflow-y-auto">
                  {results.length === 0 ? (
                    <div className="text-center text-[#757185] p-6">
                      <BsSearch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg">یافت نشد</p>
                      <p className="text-sm mt-1">محصول مورد نظر یافت نشد</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-[#252134]">
                      {results.map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/products/${p.slug}`}
                            onClick={handleProductClick}
                            className="block p-4 text-white hover:bg-[#1a1825] transition-colors active:bg-[#1f1d2a]"
                          >
                            <div className="flex items-center gap-3">
                              <BsSearch className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <span className="text-sm font-vazirmatn truncate">
                                {p.title}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Empty State when no search term */}
          {!term && (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <BsSearch className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl text-white font-vazirmatn mb-2">
                جستجو کنید
              </h3>
              <p className="text-gray-400 font-vazirmatn">
                نام محصول مورد نظر خود را تایپ کنید
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
