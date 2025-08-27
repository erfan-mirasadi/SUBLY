"use client";
import { useState, useRef, useEffect } from "react";

// Custom PIN Field Component for RTL
const CustomPinField = ({ length = 4, onChange, value = "" }) => {
  const [pins, setPins] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  // Convert Persian/Arabic digits to English
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

  useEffect(() => {
    // Update pins when value changes from parent
    if (value !== pins.join("")) {
      const newPins = value
        .split("")
        .concat(Array(length).fill(""))
        .slice(0, length);
      setPins(newPins);
    }
  }, [value, length, pins]);

  const handleChange = (index, digit) => {
    // Convert Persian/Arabic digits to English
    const englishDigit = convertToEnglishDigits(digit);

    if (!/^\d*$/.test(englishDigit)) return; // Only allow numbers

    const newPins = [...pins];
    newPins[index] = englishDigit;
    setPins(newPins);

    const newValue = newPins.join("");
    onChange(newValue);

    // Move to next input if digit is entered and not the last input
    if (englishDigit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    // Convert Persian/Arabic digits to English before processing
    const englishText = convertToEnglishDigits(pastedText);
    const digitsOnly = englishText.replace(/\D/g, "");

    if (digitsOnly.length === length) {
      // If pasted text has exactly the right number of digits, fill all inputs
      const newPins = digitsOnly.split("");
      setPins(newPins);
      onChange(newPins.join(""));

      // Focus on the last input
      inputRefs.current[length - 1]?.focus();
    } else if (digitsOnly.length > 0) {
      // If pasted text has some digits, fill from current position
      const newPins = [...pins];
      const remainingSlots = length - index;
      const digitsToUse = digitsOnly.slice(0, remainingSlots);

      for (let i = 0; i < digitsToUse.length; i++) {
        if (index + i < length) {
          newPins[index + i] = digitsToUse[i];
        }
      }

      setPins(newPins);
      onChange(newPins.join(""));

      // Focus on the next empty input or the last filled one
      const nextIndex = Math.min(index + digitsToUse.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      className="flex gap-2 justify-center items-center"
      style={{ direction: "ltr" }}
      onPaste={(e) => handlePaste(e, 0)} // Add paste to container
    >
      {pins.map((pin, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={pin}
          onChange={(e) => handleChange(index, e.target.value)}
          onPaste={(e) => handlePaste(e, index)}
          onKeyDown={(e) => {
            // Handle Ctrl+V / Cmd+V for paste
            if ((e.ctrlKey || e.metaKey) && e.key === "v") {
              // Let the paste event handle it, don't prevent default here
              return;
            }

            // Handle navigation keys first
            if (e.key === "Backspace") {
              if (!pins[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
              } else {
                const newPins = [...pins];
                newPins[index] = "";
                setPins(newPins);
                onChange(newPins.join(""));
              }
              return;
            } else if (e.key === "ArrowLeft" && index > 0) {
              inputRefs.current[index - 1]?.focus();
              return;
            } else if (e.key === "ArrowRight" && index < length - 1) {
              inputRefs.current[index + 1]?.focus();
              return;
            }

            // Allow: delete, tab, escape, enter, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            if (
              [46, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
              (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
              (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
              (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
              (e.keyCode === 88 && (e.ctrlKey || e.metaKey))
            ) {
              return;
            }

            // Only allow numbers (0-9), Persian digits (۰-۹), Arabic digits (٠-٩)
            if (
              (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
              (e.keyCode < 96 || e.keyCode > 105) &&
              // Persian digits
              !/[۰-۹]/.test(e.key) &&
              // Arabic digits
              !/[٠-٩]/.test(e.key)
            ) {
              e.preventDefault();
            }
          }}
          className="outline-none text-[16px] w-[48px] h-[48px] text-center font-code rounded-md border-[1px] border-gray-300/20 shadow-gray-300/10 bg-transparent focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          style={{
            direction: "ltr",
            textAlign: "center",
          }}
          name="otp"
        />
      ))}
    </div>
  );
};

export default CustomPinField;
