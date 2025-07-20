"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileDropdown from "./MobileDropdown";

const NAVIGATION_TABS = [
  { key: "category", label: "Category" },
  { key: "company", label: "Company" },
];

export default function DropdownNavigator({ onMobileMenuClose, isMenuOpen }) {
  const [activeTab, setActiveTab] = useState("category");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });

    fetch("/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data || []))
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      });
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setHoveredItem(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentList = activeTab === "category" ? categories : companies;

  // Split items into 5 rows × 4 columns (20 items total)
  const createGridLayout = (items) => {
    const grid = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const index = i * 4 + j;
        row.push(items[index] || null);
      }
      grid.push(row);
    }
    return grid;
  };

  const gridItems = createGridLayout(currentList);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Tab Switcher - Only visible on desktop */}
      <div className="hidden lg:flex items-center">
        {NAVIGATION_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setDropdownOpen(!dropdownOpen);
            }}
            onMouseEnter={() => {
              setHoveredTab(tab.key);
              if (dropdownOpen) {
                setActiveTab(tab.key);
              } else {
                setDropdownOpen(true);
              }
            }}
            onMouseLeave={() => {
              setHoveredTab(null);
              // Don't close dropdown immediately on mouse leave
            }}
            className={`
              relative
              block font-medium uppercase 
              transition-all duration-300
              px-6 py-8 text-2xl
              text-white/70
              lg:text-xs lg:py-1.5 lg:px-4 xl:px-6
              hover:text-white
              group
              focus:outline-none
              cursor-pointer
              ${activeTab === tab.key ? "text-white" : ""}
            `}
            type="button"
          >
            {tab.label}

            {/* bottom line - exactly like NavItem */}
            <span
              className={`
                absolute bottom-0 left-1/2 -translate-x-1/2
                h-[2px] bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] rounded-full
                transition-all duration-500
                ${
                  dropdownOpen && activeTab === tab.key
                    ? "w-1/2 opacity-40"
                    : hoveredTab === tab.key
                    ? "w-1/2 opacity-40"
                    : "w-0 opacity-0"
                }
                group-hover:w-1/3 group-hover:opacity-70
              `}
            />

            {/* dot - exactly like NavItem */}
            <span
              className={`
                absolute -left-1 top-1/2 -translate-y-1/2
                w-1.5 h-1.5 rounded-full
                transition-all duration-300
                ${
                  hoveredTab === tab.key
                    ? "bg-[#DD734F] opacity-100"
                    : "opacity-0"
                } 
                lg:hidden
              `}
            />
          </button>
        ))}
      </div>

      {/* Mobile Component */}
      <MobileDropdown
        categories={categories}
        companies={companies}
        onClose={onMobileMenuClose}
        isMenuOpen={isMenuOpen}
      />

      {/* Desktop Dropdown */}
      <div className="hidden lg:block">
        {dropdownOpen && (
          <div
            className="fixed left-0 top-[72px] w-full bg-[#0E0C15]/95 backdrop-blur-md border-t border-[#252134] z-50"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="max-w-[1440px] mx-auto px-8 py-8">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-white font-grotesk text-lg uppercase tracking-wider">
                  {activeTab === "category"
                    ? "Browse Categories"
                    : "Explore Companies"}
                </h3>
              </div>

              {/* Grid Layout 5×4 */}
              <div className="grid grid-cols-4 gap-6">
                {gridItems.map((row, rowIndex) =>
                  row.map((item, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="space-y-4">
                      {item && (
                        <Link
                          href={`/${activeTab}/${item.slug}`}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="block relative group"
                        >
                          <div className="text-white hover:text-white/90 transition-colors">
                            <span className="text-sm font-medium">
                              {item.title || item.name}
                            </span>
                            {/* Hover line from left to right */}
                            <div
                              className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] transition-all duration-300 ${
                                dropdownOpen && hoveredItem === item.id
                                  ? "w-full opacity-100"
                                  : "w-0 opacity-0"
                              }`}
                            />
                          </div>
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
