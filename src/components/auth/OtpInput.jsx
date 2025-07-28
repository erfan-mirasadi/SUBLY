import React, { useRef, useState, useEffect } from "react";

const OTP_LENGTH = 4;
const TIMER_SECONDS = 120;

/**
 * OtpInput component: Handles OTP code input and animated timer.
 * - Shows a timer (mm:ss) with animation on changing digits.
 * - Shows 4 input boxes for OTP code.
 * - Shows a message with the phone number.
 * - Handles hydration error by initializing timer only after mount.
 */
const OtpInput = ({ onComplete, onTimeout, phone }) => {
  // State for OTP code digits
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  // State for which OTP input is focused
  const [activeIndex, setActiveIndex] = useState(0);
  // State for timer (seconds left), initialized as null to avoid hydration error
  const [secondsLeft, setSecondsLeft] = useState(null);
  // State for animation on each timer digit
  const [animArr, setAnimArr] = useState([false, false, false, false, false]);
  // State for previous timer digits (for animation detection)
  const [prevDigits, setPrevDigits] = useState(["0", "2", ":", "0", "0"]);
  // Ref for OTP input elements
  const inputRefs = useRef([]);

  // On mount, set timer to TIMER_SECONDS (prevents hydration mismatch)
  useEffect(() => {
    setSecondsLeft(TIMER_SECONDS);
  }, []);

  // Timer logic: decrease secondsLeft every second (only if timer started)
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft === 0) {
      onTimeout && onTimeout();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onTimeout]);

  // Calculate timer digits (mm:ss as array)
  const min =
    secondsLeft !== null
      ? Math.floor(secondsLeft / 60)
          .toString()
          .padStart(2, "0")
      : "00";
  const sec =
    secondsLeft !== null
      ? (secondsLeft % 60).toString().padStart(2, "0")
      : "00";
  const timerArray = [min[0], min[1], ":", sec[0], sec[1]];

  // Animation: Only animate the digit that changes
  useEffect(() => {
    if (secondsLeft === null) return;
    let changed = [false, false, false, false, false];
    for (let i = 0; i < 5; i++) {
      if (timerArray[i] !== prevDigits[i]) {
        changed[i] = true;
      }
    }
    setAnimArr(changed);
    setPrevDigits(timerArray);
    // Remove animation class after 500ms
    const timeout = setTimeout(() => {
      setAnimArr([false, false, false, false, false]);
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [secondsLeft]);

  // Focus next OTP input on change
  useEffect(() => {
    if (activeIndex < OTP_LENGTH && inputRefs.current[activeIndex]) {
      inputRefs.current[activeIndex].focus();
    }
  }, [activeIndex]);

  // Handle OTP input change
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[0];
    setOtp(newOtp);
    if (idx < OTP_LENGTH - 1) {
      setActiveIndex(idx + 1);
    }
    // If all OTP digits are filled, call onComplete
    if (idx === OTP_LENGTH - 1 && newOtp.every((d) => d)) {
      onComplete && onComplete(newOtp.join(""));
    }
  };

  // Handle backspace in OTP input
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        setActiveIndex(idx - 1);
      }
    }
  };

  // Render nothing until timer is initialized (prevents hydration error)
  if (secondsLeft === null) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Message: Code sent to phone number */}
      {phone && (
        <div className="mb-4 text-sm text-[#f5f5f5] font-vazirmatn text-center bg-[#0E0C15]/60 px-4 py-2 rounded-2xl border border-[#f5f5f5]/20">
          کد به شماره <span className="font-bold font-code">{phone}</span> ارسال
          شد
        </div>
      )}
      {/* Timer: Each digit in a small square, only animate changed digit */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex gap-1 justify-center items-center">
          {timerArray.map((digit, idx) =>
            digit === ":" ? (
              <span
                key={idx}
                className="text-base font-bold font-code text-[#f5f5f5] mx-0.5 select-none"
              >
                :
              </span>
            ) : (
              <div
                key={idx}
                className={`w-7 h-8 flex items-center justify-center bg-[#0E0C15]/60 border-2 border-[#f5f5f5]/40 rounded-lg shadow text-[#f5f5f5] text-base font-bold font-code select-none transition-all duration-300 ${
                  animArr[idx] ? "animate-fade-scale" : ""
                }`}
              >
                {digit}
              </div>
            )
          )}
        </div>
        <span className="mt-2 text-xs text-[#f5f5f5]/70 font-vazirmatn">
          کد تایید را وارد کنید
        </span>
      </div>
      {/* OTP Inputs: 4 squares for code */}
      <div className="flex gap-4 justify-center mb-2">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputRefs.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onFocus={() => setActiveIndex(idx)}
            className={`w-14 h-14 text-center text-2xl font-bold font-code bg-[#0E0C15]/60 border-2 border-[#f5f5f5]/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/60 transition-all duration-300 text-[#f5f5f5] ${
              digit ? "bg-[#f5f5f5]/10" : ""
            }`}
            style={{ direction: "ltr" }}
            autoFocus={idx === 0}
          />
        ))}
      </div>
      {/* Animation style for timer digits */}
      <style jsx>{`
        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: scale(1.3);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-scale {
          animation: fadeScale 0.5s;
        }
      `}</style>
    </div>
  );
};

export default OtpInput;
