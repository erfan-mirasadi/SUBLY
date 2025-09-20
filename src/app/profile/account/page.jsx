"use client";
import Spinner from "@/src/components/ui/Spinner";
import { useGetCurrentUser } from "@/src/hooks/query/user";
import { FaUser, FaPhone, FaCalendarAlt } from "react-icons/fa";

function AccountPage() {
  const { data: user, isPending, error, refetch } = useGetCurrentUser();
  if (isPending) {
    return (
      <div className="fade-up">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <div className="fade-up">Error: {error.message}</div>;
  }
  if (!user) {
    return <div className="fade-up">No user info</div>;
  }
  return (
    <div className="fade-up w-full flex flex-col my-8 items-center justify-center">
      <div className="w-full max-w-md bg-[#18162A]/80 border border-[#252134] rounded-2xl shadow-lg p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <FaUser className="text-[#B9AEDF] text-xl" />
          <span className="text-[#ADA8C3] font-vazirmatn">نام:</span>
          <span className="text-[#f5f5f5] font-bold font-vazirmatn">
            {user?.name || "-"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FaUser className="text-[#B9AEDF] text-xl" />
          <span className="text-[#ADA8C3] font-vazirmatn">نام خانوادگی:</span>
          <span className="text-[#f5f5f5] font-bold font-vazirmatn">
            {user?.last_name || "-"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="text-[#B9AEDF] text-xl" />
          <span className="text-[#ADA8C3] font-vazirmatn">شماره تلفن:</span>
          <span className="text-[#f5f5f5] font-bold font-vazirmatn">
            {user?.phone || "-"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-[#B9AEDF] text-xl" />
          <span className="text-[#ADA8C3] font-vazirmatn">تاریخ عضویت:</span>
          <span className="text-[#f5f5f5] font-bold font-vazirmatn">
            {user?.created_at
              ? new Date(user?.created_at).toLocaleDateString("fa-IR")
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
