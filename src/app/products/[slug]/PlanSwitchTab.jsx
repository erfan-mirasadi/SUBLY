import Link from "next/link";
import React from "react";
import SelectTab from "./SelectTab";

export default function PlanSwitchTab({
  month = true,
  threeMonth = true,
  sixMonth = true,
  year = true,
  length = 4,
  params,
}) {
  const data = [
    ...(month ? [{ plan: 1, title: "۱ ماهه" }] : []),
    ...(threeMonth ? [{ plan: 3, title: "۳ ماهه" }] : []),
    ...(sixMonth ? [{ plan: 6, title: "۶ ماهه" }] : []),
    ...(year ? [{ plan: 12, title: "۱ ساله" }] : []),
  ];
  return (
    <div className="w-full max-w-[650px] mx-auto rounded-xl bg-gradient-to-br from-[#1a1a2e]/70 to-red-700/12 border border-gray-700/25 backdrop-blur-sm p-1 shadow-xl shadow-red-300/5">
      <div className="w-full flex items-center justify-center bg-black/30 rounded-lg relative overflow-hidden">
        <SelectTab length={length} />
        {data.map((item, index) => (
          <Link
            key={item.plan}
            href={`/products/${params}/?index=${index}&plan=${item.plan}`}
            scroll={false}
            dir="rtl"
            className="h-17 text-center flex justify-center items-center bg-transparent hover:bg-white/5 transition-all duration-300 relative z-10 group rounded-md border border-gray-500/10"
            style={{ width: `calc(${100 / length}%)` }}
          >
            <span className="text-white/80 group-hover:text-white font-vazirmatn text-sm font-medium transition-colors duration-300">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
