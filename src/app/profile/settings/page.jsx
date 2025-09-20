"use client";
import { useState, useEffect } from "react";
import { useGetCurrentUser, useUpdateUser } from "@/src/hooks/query/user";
import Spinner from "@/src/components/ui/Spinner";
import Button from "@/src/components/Button";

export default function AccountSetting({}) {
  const { data: user, isPending } = useGetCurrentUser();
  const {
    mutate: updateUser,
    isPending: isUpdating,
    error,
    isSuccess,
  } = useUpdateUser();

  const [form, setForm] = useState({
    name: "",
    last_name: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Show success or error messages
  useEffect(() => {
    if (isSuccess) {
      setMessage("اطلاعات با موفقیت ذخیره شد");
      setTimeout(() => setMessage(""), 3000);
    }
    if (error) {
      setMessage(`خطا: ${error.message}`);
      setTimeout(() => setMessage(""), 5000);
    }
  }, [isSuccess, error]);

  // Handle input changes
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!form.name || !form.last_name || !form.phone) {
      setMessage("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      setMessage("شماره تلفن معتبر نیست");
      return;
    }

    // Call updateUser mutation
    updateUser({
      name: form.name.trim(),
      last_name: form.last_name.trim(),
      phone: form.phone.trim(),
    });
  };

  if (isPending) {
    return (
      <div className="fade-up flex justify-center items-center w-full mt-14">
        <div>
          <Spinner size={75} />
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="fade-up">اطلاعات کاربر یافت نشد</div>;
  }

  return (
    <div className="fade-up flex flex-col items-center justify-center w-full my-8">
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
            type="text"
            value={form.name}
            onChange={handleChange}
            className="rounded-md px-4 py-2 bg-[#0E0C15]/60 border border-[#f5f5f5]/20 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/40 font-vazirmatn"
            required
            disabled={isUpdating}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#ADA8C3] font-vazirmatn">نام خانوادگی</label>
          <input
            name="last_name"
            type="text"
            value={form.last_name}
            onChange={handleChange}
            className="rounded-md px-4 py-2 bg-[#0E0C15]/60 border border-[#f5f5f5]/20 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/40 font-vazirmatn"
            required
            disabled={isUpdating}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#ADA8C3] font-vazirmatn">شماره تلفن</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="rounded-md px-4 py-2 bg-[#0E0C15]/60 border border-[#f5f5f5]/20 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/40 font-vazirmatn"
            required
            pattern="^09\d{9}$"
            title="شماره تلفن معتبر وارد کنید"
            disabled={isUpdating}
          />
        </div>
        <div className="mt-9">
          <Button
            type="submit"
            className="mt-7 font-bold text-lg font-vazirmatn disabled:opacity-60"
            disabled={isUpdating || isPending}
          >
            {isUpdating ? <Spinner size={30} /> : "ذخیره اطلاعات"}
          </Button>
        </div>

        {message && (
          <div
            className={`text-center text-sm font-vazirmatn mt-5 ${
              isSuccess ? "text-green-800" : "text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
