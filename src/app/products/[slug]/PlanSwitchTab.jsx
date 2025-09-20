import Link from "next/link";
import React from "react";
import SelectTab from "./SelectTab";
import { toPersianNumbers } from "@/src/lib/persianNumbers";

export default function PlanSwitchTab({ params, data, currentPlan }) {
  // Extract unique available plans from the product data
  const availablePlans = [];
  const seenDurations = new Set();

  data.product_entry?.forEach((entry) => {
    entry.product_plans
      ?.filter((plan) => plan.is_available !== false)
      ?.forEach((plan) => {
        const duration = parseInt(plan.title);
        if (!seenDurations.has(duration)) {
          seenDurations.add(duration);
          availablePlans.push({
            duration,
            title: `${toPersianNumbers(plan.title)} ماهه`,
            id: plan.id,
          });
        }
      });
  });

  // Sort by duration and get length
  availablePlans.sort((a, b) => a.duration - b.duration);
  const length = availablePlans.length;

  return (
    <div className="w-full max-w-[650px] mx-auto rounded-xl bg-gradient-to-br from-[#1a1a2e]/70 to-red-700/12 border border-gray-700/25 backdrop-blur-sm p-1 shadow-xl shadow-red-300/5">
      <div className="w-full flex items-center justify-center bg-black/30 rounded-lg relative overflow-hidden">
        <SelectTab length={length} />
        {availablePlans.map((item, index) => {
          const isActive = item.duration === parseInt(currentPlan);

          return (
            <Link
              key={`plan-${item.duration}-${item.id}`}
              href={`/products/${params}/?index=${index}&plan=${item.duration}`}
              scroll={false}
              className={`h-17 text-center flex justify-center items-center bg-transparent hover:bg-white/5 transition-all duration-300 relative z-10 group rounded-md border border-gray-500/10 ${
                isActive ? "text-white" : ""
              }`}
              style={{ width: `calc(${100 / length}%)` }}
            >
              <span className="text-white/80 group-hover:text-white font-vazirmatn text-sm font-medium transition-colors duration-300">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
