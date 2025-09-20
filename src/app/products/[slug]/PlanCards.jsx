import React from "react";
import ClientPrice from "./ClientPrice";
import { FaCheckCircle } from "react-icons/fa";

export default function PlanCards({ data, plan, index }) {
  const colors = [
    "text-[#ffd294]", //yellow
    "text-[#ff4353]", //red
    "text-[#7794b6]", //blue
    "text-[#f2799b]", //pink
    "text-[#dffaff]", //blue-white
  ];
  const modelColor = colors[index % colors.length];

  // Check if current plan is available
  const currentPlan = data.product_plans?.find((p) => p.title === plan);
  const isAvailable = currentPlan?.is_available !== false; // Default to true if null/undefined

  return (
    <div className="w-full mt-8 md:mt-12 border border-gray-200/20 hover:shadow-lg hover:shadow-gray-100/10 hover:-translate-y-1 duration-300 ease-in-out shadow-gray-200/20 rounded-lg p-3 sm:p-5 flex flex-col justify-start font-vazirmatn">
      <div className="flex-grow">
        <h2
          className={`font-extrabold text-2xl sm:text-3xl lg:text-4xl font-vazirmatn flex items-center ${modelColor}`}
        >
          {data.model}
        </h2>
        <p className="text-sm sm:text-base text-gray-400 my-2 sm:my-3 font-vazirmatn flex items-center">
          {data.description}
        </p>
        <ClientPrice productEntry={data} plan={plan} />
      </div>

      <div className="flex flex-col gap-2 mt-4 sm:mt-6">
        {data.features ? (
          data.features.split("،").map((item, index) => (
            <div key={index} className="flex items-center py-1">
              <FaCheckCircle className="text-purple-400 w-4 h-4 shrink-0 ml-2" />
              <span className="text-sm sm:text-base text-gray-400">
                {item.trim()}
              </span>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-4 text-sm">
            هیچ ویژگی‌ای یافت نشد
          </div>
        )}
      </div>
    </div>
  );
}
