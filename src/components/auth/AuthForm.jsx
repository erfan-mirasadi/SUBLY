"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";

// ------------------------
// Define the fields for Login and Sign Up modes
// ------------------------
const loginFields = [{ name: "Number", label: "Number", type: "tel" }];

const signUpFields = [
  { name: "firstName", label: "نام ", type: "text" },
  { name: "lastName", label: "نام خانوادگی", type: "text" },
  { name: "phoneNumber", label: "تلفن", type: "tel" },
];

// ------------------------
// Main Component
// ------------------------
const AuthForm = ({ isLogin, onSubmit }) => {
  const fieldsToRender = isLogin ? loginFields : signUpFields;

  const [formData, setFormData] = useState({});
  const inputRefs = useRef({});

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
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
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
        <div className="relative -mt-4 mb-8">
          <h2 className="text-center text-xl font-grotesk text-white bg-[#ffff]/20 bg-opacity-20 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[70px] px-3 py-2 rounded-2xl border-2 border-[#ffff]/45  border-opacity-30">
            SUBLY
          </h2>
        </div>

        {/* ------------------------
            The Form
          ------------------------ */}
        <form onSubmit={handleSubmit}>
          {fieldsToRender.map((field) => (
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
                className={`absolute left-4 select-none text-gray-400 font-code transition-all duration-300 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black/40 peer-focus:bg-[#f5f5f5] peer-focus:border-1 peer-focus:border-gray-100 peer-focus:px-2 rounded-2xl ${
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
          <Link href="/userProfile">
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className="w-full px-6 py-3 tracking-wide uppercase text-[#f5f5f5] transition-colors font-vazirmatn duration-300 transform rounded-2xl bg-[#f5f5f5]/20 hover:bg-[#f5f5f5]/50 border-[#f5f5f5]/50 border-2 focus:outline-none focus:ring-2 focus:duration-500 focus:p-[12px] text-lg"
              >
                ورود
              </button>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
