"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SelectTab({ length }) {
  const searchParams = useSearchParams();
  const index = parseInt(searchParams.get("index") || "0");

  // Check if parent container has RTL direction
  const isRTL = true; // Since PlanSwitchTab uses dir="rtl"

  // Calculate position based on direction
  const leftPosition = isRTL
    ? `calc(${((length - 1 - index) / length) * 100}%)`
    : `calc(${(index / length) * 100}%)`;

  return (
    <div
      style={{
        width: `calc(${100 / length}%)`,
        left: leftPosition,
      }}
      className="absolute duration-500 ease-in-out h-17 bg-gradient-to-r from-blue-900/40 via-purple-700/30 to-pink-700/10 rounded-md shadow-md shadow-blue-500/15 backdrop-blur-sm"
    />
  );
}
