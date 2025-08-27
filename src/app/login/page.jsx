"use client";
import InputForm from "@/src/components/InputForm";
import Accordion from "@/src/components/Accardion";
import { useState } from "react";
import Button from "@/src/components/Button";
import Timer from "@/src/components/ui/Timer";
import { useRouter } from "next/navigation";
import { useSendOtp, useVerifyOtp } from "@/src/hooks/mutate/auth";
import {
  useCartQuery,
  useSyncCartToServerMutation,
} from "@/src/hooks/mutate/cart";
import Link from "next/link";
import CustomPinField from "./PinField";

// Helper function to convert Persian/Arabic digits to English
const convertToEnglishDigits = (input) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const englishDigits = "0123456789";

  return input.replace(/[۰-۹٠-٩]/g, (char) => {
    const persianIndex = persianDigits.indexOf(char);
    const arabicIndex = arabicDigits.indexOf(char);

    if (persianIndex !== -1) return englishDigits[persianIndex];
    if (arabicIndex !== -1) return englishDigits[arabicIndex];
    return char;
  });
};

export default function LoginPage() {
  const [otp, setOtp] = useState("");
  const { data: cartItems, refetch } = useCartQuery();
  const { mutate: syncCartToServer } = useSyncCartToServerMutation();
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const { mutate, isPending } = useSendOtp();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      mutate(phone);
      setStep(2);
      // Focus on first PIN input after step change
      setTimeout(() => {
        const firstInput = document.querySelector("input[name='otp']");
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
    } else {
      verifyOtp(
        { phone, code: otp },
        {
          onSuccess: (res) => {
            console.log({ res });
            if (!cartItems || cartItems.length === 0) {
              syncCartToServer(res.user.id, {
                onSuccess: () => {
                  console.log("synced");
                  localStorage.removeItem("cart-items");
                  refetch();
                },
              });
            }
            router.replace("/");
          },
        }
      );
    }
  };

  const changePhone = () => {
    setStep(1);
    setPhone("");
    setOtp("");
  };

  return (
    <div className="w-full min-h-screen py-4 flex justify-center items-center">
      <form
        style={{ direction: "ltr" }}
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] mx-3 sm:mx-auto my-4 flex flex-col gap-4 shadow-lg border-[1px] border-gray-300/20 shadow-gray-300/10 rounded-md p-4"
      >
        <h1 className="text-4xl font-bold font-grotesk mb-10 text-center">
          <Link
            className="hover:text-gray-400 duration-300 transition-all hover:scale-110 cursor-pointer"
            href="/"
          >
            SUBLY
          </Link>
        </h1>

        <InputForm
          disabled={step === 2}
          value={phone}
          onChange={(e) => {
            const englishValue = convertToEnglishDigits(e.target.value);
            const numbersOnly = englishValue.replace(/\D/g, ""); // Only keep digits
            setPhone(numbersOnly);
          }}
          onKeyDown={(e) => {
            // Allow: backspace, delete, tab, escape, enter, home, end, left, right
            if (
              [46, 8, 9, 27, 13, 35, 36, 37, 39].indexOf(e.keyCode) !== -1 ||
              // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
              (e.keyCode === 65 && e.ctrlKey === true) ||
              (e.keyCode === 67 && e.ctrlKey === true) ||
              (e.keyCode === 86 && e.ctrlKey === true) ||
              (e.keyCode === 88 && e.ctrlKey === true)
            ) {
              return;
            }
            // Ensure that it is a number (0-9) or Persian/Arabic digits and stop the keypress
            if (
              (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
              (e.keyCode < 96 || e.keyCode > 105) &&
              // Allow Persian digits ۰-۹
              !(e.keyCode >= 1776 && e.keyCode <= 1785) &&
              // Allow Arabic digits ٠-٩
              !(e.keyCode >= 1632 && e.keyCode <= 1641)
            ) {
              e.preventDefault();
            }
          }}
          placeholder="شماره موبایل"
          name="phone"
          inputMode="numeric"
        />

        <div className="w-full text-right">
          <span
            onClick={changePhone}
            className={`text-sm text-gray-500 mt-[-10px] cursor-pointer float-right hover:text-gray-100 duration-300 ${
              step === 1 ? "opacity-0" : "opacity-100"
            }`}
          >
            تغییر شماره
          </span>
        </div>

        <Accordion show={step === 2}>
          <div className="my-8 mt-4">
            <Timer key={step} />
          </div>
          <div className="w-full flex flex-col my-5">
            <CustomPinField length={4} value={otp} onChange={setOtp} />
          </div>
        </Accordion>

        <Button
          type="submit"
          disabled={step === 1 ? !phone : !otp}
          loading={isPending || isVerifying}
        >
          {step === 1 ? "ارسال کد" : "ورود"}
        </Button>
      </form>
    </div>
  );
}
