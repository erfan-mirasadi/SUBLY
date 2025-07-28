"use client";
import { useState } from "react";
import { updateUserProfile } from "@/src/lib/auth";

// Modern AccountSetting component: edit name, last_name, phone
export default function AccountSetting({ user, onUserUpdate }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const success = await updateUserProfile(
      form.phone,
      form.name,
      form.last_name
    );
    setLoading(false);
    if (success) {
      setMessage("اطلاعات با موفقیت ذخیره شد!");
      if (onUserUpdate) onUserUpdate({ ...user, ...form });
    } else {
      setMessage("خطا در ذخیره اطلاعات. لطفاً دوباره تلاش کنید.");
    }
  };

  if (!user) return <div className="fade-up">No user info</div>;
  return (
    <div className="fade-up flex flex-col items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-[#18162A]/80 border border-[#252134] rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col gap-6"
      >
        <h3 className="text-xl font-bold text-[#f5f5f5] mb-2 text-center font-vazirmatn">
          ویرایش اطلاعات حساب
        </h3>
        <div className="flex flex-col gap-2">
          <label className="text-[#ADA8C3] font-vazirmatn">نام</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 bg-[#0E0C15]/60 border border-[#f5f5f5]/20 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/40 font-vazirmatn"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#ADA8C3] font-vazirmatn">نام خانوادگی</label>
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 bg-[#0E0C15]/60 border border-[#f5f5f5]/20 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/40 font-vazirmatn"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#ADA8C3] font-vazirmatn">شماره تلفن</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 bg-[#0E0C15]/60 border border-[#f5f5f5]/20 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/40 font-vazirmatn"
            required
            pattern="^09\d{9}$"
            title="شماره تلفن معتبر وارد کنید"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] text-white font-bold text-lg font-vazirmatn transition-all hover:scale-105 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "در حال ذخیره..." : "ذخیره اطلاعات"}
        </button>
        {message && (
          <div className="text-center text-sm mt-2 text-[#f59e0b] font-vazirmatn">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
