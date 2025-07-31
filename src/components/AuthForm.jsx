"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import OtpInput from "./OtpInput";
import {
  getUserByPhone,
  sendOTP,
  verifyOTP,
  updateUserProfile,
} from "@/src/lib/auth";
import { signIn } from "next-auth/react";

// ------------------------
// Define the fields for Login and Sign Up modes
// ------------------------
const loginFields = [{ name: "Number", label: "تلفن", type: "tel" }];

const signUpFields = [
  { name: "firstName", label: "نام ", type: "text" },
  { name: "lastName", label: "نام خانوادگی", type: "text" },
  // { name: "phoneNumber", label: "تلفن", type: "tel" },
];

// ------------------------
// Main Component
// ------------------------
const AuthForm = ({ isLogin = true, onSwitchAuthMode }) => {
  // If isLogin is true, start with phone step; if false, start with signup step
  const [step, setStep] = useState(isLogin ? "phone" : "signup");
  const [formData, setFormData] = useState({});
  const inputRefs = useRef({});
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If isLogin prop changes, reset step accordingly
  React.useEffect(() => {
    setStep(isLogin ? "phone" : "signup");
    setFormData({});
    setPhone("");
  }, [isLogin]);

  // ------------------------
  // Track input value changes
  // ------------------------
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ------------------------
  // Mark an input as focused
  // ------------------------
  const handleFocus = (name) => {
    setFormData((prevData) => ({ ...prevData, [`${name}Focused`]: true }));
  };

  // ------------------------
  // Reset focus state if field is empty on blur
  // ------------------------
  const handleBlur = (name) => {
    if (!formData[name]) {
      setFormData((prevData) => ({
        ...prevData,
        [`${name}Focused`]: false,
      }));
    }
  };

  // ------------------------
  // Handle form submit
  // ------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === "phone") {
      const phoneNumber = formData["Number"];
      setPhone(phoneNumber);
      try {
        await sendOTP(phoneNumber);
        setStep("otp");
      } catch (err) {
        console.error("خطا در ارسال کد:", err);
      }
    } else if (step === "signup") {
      // Update user profile in Supabase
      const { firstName, lastName } = formData;
      const success = await updateUserProfile(phone, firstName, lastName);
      if (success) {
        // Fetch updated user info
        const user = await getUserByPhone(phone);
        if (user) {
          // Set session with NextAuth
          await signIn("credentials", {
            phone: user.phone,
            redirect: false,
          });
          setIsLoggedIn(true);
          // Redirect to previous page or userProfile
          const redirect = localStorage.getItem("redirectAfterLogin");
          if (redirect) {
            localStorage.removeItem("redirectAfterLogin");
            window.location.href = redirect;
          } else {
            const url = `/userProfile/${
              user.name || user.firstName || "user"
            }-${user.last_name || user.lastName || ""}`;
            window.location.href = url;
          }
        } else {
          alert("خطا در دریافت اطلاعات کاربر. لطفاً دوباره تلاش کنید.");
        }
      } else {
        alert("خطا در ثبت نام. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  // OTP Complete Handler
  const handleOtpComplete = async (code) => {
    // Use new verifyOTP logic
    console.log("phone sent to verifyOTP:", phone);
    console.log("code sent to verifyOTP:", code);
    const result = await verifyOTP(phone, code);
    console.log("verifyOTP result:", result);
    if (!result.success) {
      alert("کد وارد شده اشتباه است 😓");
      return;
    }
    if (result.needsProfile) {
      // User is new or missing profile info: go to signup step
      setStep("signup");
    } else {
      // User is complete: fetch user info, set session, redirect
      const user = await getUserByPhone(phone);
      if (user) {
        await signIn("credentials", {
          phone: user.phone,
          redirect: false,
        });
        setIsLoggedIn(true);
        const redirect = localStorage.getItem("redirectAfterLogin");
        if (redirect) {
          localStorage.removeItem("redirectAfterLogin");
          window.location.href = redirect;
        } else {
          const url = `/userProfile/${user.name || user.firstName || "user"}-${
            user.last_name || user.lastName || ""
          }`;
          window.location.href = url;
        }
      } else {
        alert("خطا در دریافت اطلاعات کاربر. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  // ------------------------
  // OTP Timeout Handler
  // ------------------------
  const handleOtpTimeout = () => {
    setStep("phone");
    setFormData({});
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* ------------------------
          Background Image Layer
        ------------------------ */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          className="w-full h-full object-cover opacity-35"
          src="/hero/robot.jpg"
          width={688}
          height={953}
          alt="Background"
        />
      </div>

      {/* ------------------------
          Glassmorphism Form Container
        ------------------------ */}
      <div className="bg-transparent backdrop-filter backdrop-blur-md rounded-3xl shadow-2xl p-21 m-2 w-full max-w-md border-2 border-[#ffff]/45 border-opacity-30">
        {/* ------------------------
            Heading
          ------------------------ */}
        <div className="relative -mt-2.5 mb-12">
          <h2 className="text-center text-xl font-grotesk text-white bg-[#ffff]/20 bg-opacity-20 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[70px] p-2.5 rounded-2xl border-2 border-[#ffff]/45  border-opacity-30">
            SUBLY
          </h2>
        </div>

        {/* ------------------------
            The Form
          ------------------------ */}
        {/* Switch between login and signup */}
        {typeof onSwitchAuthMode === "function" && (
          <div className="mb-6 flex justify-center">
            {step === "phone" ? (
              <button
                type="button"
                onClick={onSwitchAuthMode}
                className="text-[#f5f5f5] underline font-vazirmatn"
              >
                ثبت نام نکرده‌اید؟ ثبت نام
              </button>
            ) : (
              <button
                type="button"
                onClick={onSwitchAuthMode}
                className="text-[#f5f5f5] underline font-vazirmatn"
              >
                حساب دارید؟ ورود
              </button>
            )}
          </div>
        )}
        {step === "phone" && (
          <form onSubmit={handleSubmit}>
            {loginFields.map((field) => (
              <div className="mb-6 relative" key={field.name}>
                {/* ------------------------
                    Input Field
                  ------------------------ */}
                <input
                  ref={(el) => (inputRefs.current[field.name] = el)}
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={() => handleBlur(field.name)}
                  className={`font-code block w-full px-4 py-3 text-[#f5f5f5]  bg-opacity-10 border-[1px] border-gray-400 rounded-3xl focus:outline-none focus:ring-1 focus:ring-white/60 focus:p-4 focus:ring-opacity-50 peer transition-all duration-450 ${
                    formData[field.name] ? " text-[#f5f5f5]/80" : ""
                  } ${field.inputClassName || ""}`}
                  placeholder={field.placeholder}
                />

                {/* ------------------------
                    Floating Label
                  ------------------------ */}
                <label
                  htmlFor={field.name}
                  className={`absolute left-4 select-none text-gray-400 font-vazirmatn transition-all duration-300 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black/40 peer-focus:bg-[#f5f5f5] peer-focus:border-1 peer-focus:border-gray-100 peer-focus:px-2 rounded-2xl ${
                    formData[field.name]
                      ? "-top-2 left-2 text-xs bg-[#f5f5f5] border border-gray-100 text-black/40 backdrop-blur-2xl px-2"
                      : "top-3"
                  } ${field.labelClassName || ""}`}
                >
                  {field.label}
                </label>
              </div>
            ))}

            {/* ------------------------
                Submit Button
              ------------------------ */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className="w-full px-6 py-3 tracking-wide uppercase text-[#f5f5f5] transition-colors font-vazirmatn duration-300 transform rounded-2xl bg-[#f5f5f5]/20 hover:bg-[#f5f5f5]/50 border-[#f5f5f5]/50 border-2 focus:outline-none focus:ring-2 focus:duration-500 focus:p-[12px] text-lg"
              >
                ورود
              </button>
            </div>
          </form>
        )}
        {step === "otp" && (
          <OtpInput
            onComplete={handleOtpComplete}
            onTimeout={handleOtpTimeout}
            phone={phone}
          />
        )}
        {step === "signup" && (
          <form onSubmit={handleSubmit}>
            {signUpFields.map((field) => (
              <div className="mb-6 relative" key={field.name}>
                <input
                  ref={(el) => (inputRefs.current[field.name] = el)}
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={() => handleBlur(field.name)}
                  className={`font-vazirmatn block w-full px-4 py-3 text-[#f5f5f5]  bg-opacity-10 border-[1px] border-gray-400 rounded-3xl focus:outline-none focus:ring-1 focus:ring-white/60 focus:p-4 focus:ring-opacity-50 peer transition-all duration-450 ${
                    formData[field.name] ? " text-[#f5f5f5]/80" : ""
                  } ${field.inputClassName || ""}`}
                />

                {/* ------------------------
                    Floating Label
                  ------------------------ */}
                <label
                  htmlFor={field.name}
                  className={`absolute left-4 select-none text-gray-400 font-vazirmatn transition-all duration-300 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black/40 peer-focus:bg-[#f5f5f5] peer-focus:border-1 peer-focus:border-gray-100 peer-focus:px-2 rounded-2xl ${
                    formData[field.name]
                      ? "-top-2 left-2 text-xs bg-[#f5f5f5] border border-gray-100 text-black/40 backdrop-blur-2xl px-2"
                      : "top-3"
                  } ${field.labelClassName || ""}`}
                >
                  {field.label}
                </label>
              </div>
            ))}
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className="w-full px-6 py-3 tracking-wide uppercase text-[#f5f5f5] transition-colors font-vazirmatn duration-300 transform rounded-2xl bg-[#f5f5f5]/20 hover:bg-[#f5f5f5]/50 border-[#f5f5f5]/50 border-2 focus:outline-none focus:ring-2 focus:duration-500 focus:p-[12px] text-lg cursor-pointer"
              >
                ثبت نام
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
