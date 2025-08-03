import React from "react";
import ClientPrice from "./ClientPrice";
import { FaCheckCircle } from "react-icons/fa";

export default function PlanCards({ data, plan, index }) {
  const colors = [
    "text-[#ffd294]", //yellow
    "text-[#ff4353]", //red
    "text-[#7794b6]", //blue
    "text-[#f2799b]", //pink
    "text-[##dffaff]", //blue.white
  ];
  const modelColor = colors[index % colors.length];

  return (
    <div className="w-full mt-12 min-h-[200px] md:min-h-[300px] border-[1px] border-gray-200/20  hover:shadow-lg hover:shadow-gray-100/10 hover:translate-y-[-5px] duration-300 ease-in-out shadow-gray-200/20 rounded-lg p-5 flex flex-col justify-start">
      <h2 className={`text-extrabold text-4xl font-poppins ${modelColor}`}>
        {data.model}
      </h2>
      <p className="text-gray-500 my-3">{data.description}</p>
      <ClientPrice productEntry={data} plan={plan} />
      <div className="flex flex-col gap-4 mt-8">
        {data.features ? (
          data.features.split(",").map((item, index) => (
            <div key={index} className="flex justify-start items-center py-2">
              <FaCheckCircle className="text-purple-400 mr-4 text-xl" />
              <span className="text-gray-500">{item.trim()}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-4">
            هیچ ویژگی‌ای یافت نشد
          </div>
        )}
      </div>
    </div>
  );
}
