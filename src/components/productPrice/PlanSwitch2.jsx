// src/app/products/[slug]/components/PlanSwitch2.jsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const PlanSwitch2 = ({
  options = [],
  onChange,
  defaultIndex = 0,
  productSlug,
  currentPlan,
}) => {
  const [selected, setSelected] = useState(defaultIndex);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const xAmount = 1;

  const handleClick = (idx) => {
    setSelected(idx);
    const selectedOption = options[idx];

    // Call the original onChange for CountUp animation
    if (onChange) onChange(selectedOption, idx);

    // Navigate to new URL with smooth transition
    startTransition(() => {
      router.push(`/products/${productSlug}/${selectedOption.value}`, {
        scroll: false, // Prevent scrolling to top
      });
    });
  };

  // Calculate the width and left position of the indicator
  const widthPercent = 100 / options.length;
  const leftPercent = selected * widthPercent;

  return (
    <div
      className={`
        relative z-4 mx-auto flex min-w-[310px] w-[375px] rounded-3xl border-[3px] border-[#1959AD]/25 
        px-[${xAmount * 5}px] bg-[#080D27]/50 py-2 backdrop-blur-[6px] 
        max-md:w-full max-md:overflow-x-auto 
        ${isPending ? "opacity-70 pointer-events-none" : ""}
      `}
    >
      {/* Indicator */}
      <div
        className="absolute top-2 left-1 right-1 bottom-2 rounded-2xl bg-[#1959AD]/50 transition-all duration-500"
        style={{
          width: `${widthPercent}%`,
          left: `${
            selected === 0
              ? leftPercent + xAmount
              : selected === options.length - 1
              ? leftPercent - xAmount
              : leftPercent
          }%`,
          zIndex: 1,
        }}
      />
      {options.map((opt, idx) => (
        <button
          key={opt.value || opt.label || idx}
          className={
            "cursor-pointer base-bold relative z-2 h-16 flex-1 uppercase transition-colors duration-500 mx-1 whitespace-nowrap px-2 text-sm md:text-base " +
            (selected === idx
              ? "text-[#EAEDFF]"
              : "text-[#C4CBF5] hover:text-[rgb(184,107,107)]")
          }
          onClick={() => handleClick(idx)}
          disabled={isPending}
        >
          {opt.label || opt}
        </button>
      ))}
    </div>
  );
};

export default PlanSwitch2;
