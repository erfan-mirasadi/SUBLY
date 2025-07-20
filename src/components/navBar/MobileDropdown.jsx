"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAVIGATION_TABS = [
  { key: "category", label: "Category" },
  { key: "company", label: "Company" },
];

export default function MobileDropdown({
  categories = [],
  companies = [],
  onClose,
  isMenuOpen,
}) {
  const [activeTab, setActiveTab] = useState("category");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // اگر منوی اصلی بسته شد، dropdown هم بسته شود
  useEffect(() => {
    if (!isMenuOpen) {
      setDropdownOpen(false);
    }
  }, [isMenuOpen]);

  const currentList = activeTab === "category" ? categories : companies;

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Button */}
      <button
        className="px-4 py-2 text-white/70 hover:text-white transition-colors"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="flex items-center gap-2">
          <span>{activeTab === "category" ? "Categories" : "Companies"}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Full Screen Mobile Dropdown */}
      {dropdownOpen && (
        <div className="fixed inset-0 py-18 z-50 font-grotesk bg-[#0E0C15]/95 backdrop-blur-md">
          {/* Background image - same as MobileMenu */}
          <div className="absolute inset-0 opacity-[.03] pointer-events-none">
            <Image
              className="w-full h-full object-cover"
              src="/hero/robot.jpg"
              width={688}
              height={953}
              alt="Background"
            />
          </div>

          {/* Side lines - same as MobileMenu */}
          {/* <div className="absolute top-0 left-5 w-[1px] h-full bg-[#252134] pointer-events-none"></div>
          <div className="absolute top-0 right-5 w-[1px] h-full bg-[#252134] pointer-events-none"></div> */}

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-6 border-2 border-[#252134] rounded-lg">
              <div className="flex gap-4">
                {NAVIGATION_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-2.5 text-md font-grotesk uppercase transition-colors cursor-pointer ${
                      activeTab === tab.key
                        ? "text-white border-b-3 border-[#DD734F]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setDropdownOpen(false)}
                className="mr-5 scale-118 hover:text-white transition-colors cursor-pointer"
              >
                ❌
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-3">
                {currentList && currentList.length > 0 ? (
                  currentList.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${activeTab}/${item.slug}`}
                      onClick={() => {
                        setDropdownOpen(false);
                        if (onClose) onClose();
                      }}
                      className="block relative py-4 px-6 text-white hover:bg-[#252134]/30 rounded-xl transition-colors group border border-[#252134]/50 hover:border-[#252134]"
                    >
                      <span className="text-lg font-medium">
                        {item.title || item.name}
                      </span>
                      {/* Hover line from left to right */}
                      <div className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] transition-all duration-300 w-0 group-hover:w-full opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="text-[#ADA8C3] text-lg">
                      Loading... ({currentList?.length || 0} items)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
