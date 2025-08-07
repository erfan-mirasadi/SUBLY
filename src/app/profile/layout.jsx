"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";
import Link from "next/link";
import { FaUser, FaCog, FaBox } from "react-icons/fa";
import { useGetCurrentUser } from "@/src/hooks/query/user";

export default function ProfileLayout({ children }) {
  const { data: user, isPending, error } = useGetCurrentUser();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("subly_access_token");
    if (token) {
      setIsAuth(true);
    } else {
      router.push("/login");
      return;
    }
    setIsLoading(false);
  }, [router]);

  // Helper function to check if link is active
  const isActiveLink = (href) => pathname === href;

  // Navigation items with React Icons
  const navItems = [
    { href: "/profile/account", label: "پروفایل", icon: FaUser },
    { href: "/profile/settings", label: "تنظیمات", icon: FaCog },
    { href: "/profile/orders", label: "سفارشات", icon: FaBox },
  ];

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0E0C15] to-[#18162A]">
        <div className="flex flex-col items-center gap-4">
          <Spinner size={50} />
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0E0C15] to-[#18162A]">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0E0C15] to-[#18162A] shadow-[0_-20px_40px_rgba(255,255,255,0.05)] shadow-white/5">
      {/* Header with user info */}
      <div className="pt-[95px] pb-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] rounded-full flex items-center justify-center">
              <FaUser className="w-6 h-6 text-white" />
            </div>
            <div className="border-b-2 border-[#ffff]/30 pb-2 inline-block">
              {user && (
                <div>
                  <h1 className="text-2xl font-bold text-[#f5f5f5] font-vazirmatn mb-1">
                    {user.name && user.last_name
                      ? `${user.name} ${user.last_name}`
                      : user.phone || "کاربر عزیز"}
                  </h1>
                  <p className="text-[#ADA8C3] font-vazirmatn">
                    {user.phone && `📱 ${user.phone}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="bg-[#18162A]/90 backdrop-blur-lg border border-[#DD734F]/30 rounded-2xl shadow-2xl p-3 md:p-4">
            <div className="flex justify-center items-center gap-3 md:gap-6">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-xl font-vazirmatn text-sm md:text-base
                      transition-all duration-300 hover:scale-105 relative overflow-hidden
                      ${
                        isActiveLink(item.href)
                          ? " text-white shadow-lg"
                          : "text-[#ADA8C3] hover:text-[#f5f5f5] hover:bg-[#252134]/50"
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="font-medium">{item.label}</span>

                    {/* Active indicator */}
                    {isActiveLink(item.href) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#DD734F] to-[#B9AEDF]"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-[#18162A]/10 backdrop-blur-lg border border-[#252134] rounded-2xl min-h-[500px] shadow-xl">
          {children}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#DD734F]/10 to-[#B9AEDF]/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#B9AEDF]/10 to-[#DD734F]/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
