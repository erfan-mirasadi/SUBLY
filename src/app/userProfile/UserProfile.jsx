"use client";
import Image from "next/image";
import Account from "./Account";
import AccountSetting from "./AccountSetting";
import Orders from "./Orders";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserByPhone } from "@/src/lib/auth";

function UserProfile() {
  const { data: session } = useSession();
  const phone = session?.user?.phone;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 0:Profile, 1:Setting, 2:Orders
  const [fade, setFade] = useState(true);

  // Fetch user info from Supabase
  const fetchUser = async () => {
    if (!phone) return;
    setLoading(true);
    const userData = await getUserByPhone(phone);
    setUser(userData);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [phone]);

  // Callback to refresh user info after profile update
  const handleUserUpdate = () => {
    fetchUser();
  };

  const tabList = [
    { title: "پروفایل", component: <Account user={user} /> },
    {
      title: "ویرایش اطلاعات",
      component: <AccountSetting user={user} onUserUpdate={handleUserUpdate} />,
    },
    { title: "سفارش‌ها", component: <Orders /> },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  // Handle fade effect on tab change
  const handleTabChange = (idx) => {
    if (idx === activeTab) return;
    setFade(false);
    setTimeout(() => {
      setActiveTab(idx);
      setFade(true);
    }, 180); // match transition duration
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg text-[#ADA8C3]">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  return (
    <section className="flex min-h-screen w-full h-full relative items-center justify-center bg-transparent">
      <Image
        className="w-full h-full absolute bg-amber-50 top-0 left-0 object-cover opacity-10 z-0"
        src="/hero/robot.jpg"
        width={688}
        height={953}
        alt="Background"
        priority
      />
      <div className="relative z-10 w-full flex justify-center items-start lg:items-center pt-10 lg:pt-24">
        <div className="bg-[#18162A]/80 border border-[#252134] rounded-2xl shadow-xl p-8 flex flex-col gap-6 items-center w-full max-w-md lg:max-w-lg mx-auto">
          {/* Header */}
          <h2 className="text-2xl font-bold text-[#f5f5f5] mb-2 text-center font-vazirmatn">
            پروفایل کاربر
          </h2>
          {/* Tab Buttons */}
          <div className="flex w-full justify-center gap-2 mb-4">
            {tabList.map((tab, idx) => (
              <button
                key={tab.title}
                onClick={() => handleTabChange(idx)}
                className={`px-4 py-2 rounded-xl font-vazirmatn text-base transition-all duration-200 font-bold
                  ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] text-white shadow"
                      : "bg-[#0E0C15]/60 text-[#ADA8C3] hover:bg-[#252134]"
                  }
                `}
              >
                {tab.title}
              </button>
            ))}
          </div>
          {/* Tab Content - fixed min-height, fade effect */}
          <div
            className={`w-full min-h-[260px] flex flex-col items-center justify-center transition-opacity duration-200 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {tabList[activeTab].component}
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] text-white font-bold text-lg font-vazirmatn transition-all hover:scale-105 cursor-pointer"
          >
            خروج از حساب
          </button>
        </div>
      </div>
    </section>
  );
}
export default UserProfile;
