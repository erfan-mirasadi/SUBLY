"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SelectTab({ length }) {
  const searchParams = useSearchParams();
  const index = searchParams.get("index");
  return (
    <div
      style={{
        width: `calc(${100 / length}%)`,
        left: `calc(${(index / length) * 100}%)`,
      }}
      className="absolute duration-500 ease-in-out left-[1px] h-17 bg-gradient-to-r from-blue-900/40 via-purple-700/30 to-pink-700/10 rounded-md shadow-md shadow-blue-500/15 backdrop-blur-sm"
    />
  );
}
