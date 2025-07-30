import React from "react";
import ClientPrice from "./ClientPrice";
import { FaCheckCircle } from "react-icons/fa";

export default function PlanCards({ data, plan }) {
  const features = [
    { id: 1, title: "Musics of the world" },
    { id: 2, title: "best of the world" },
    { id: 3, title: "videos of the world" },
    { id: 4, title: "rest of the world" },
  ];
  return (
    <div className="w-full max-w-[300px] mt-12 min-h-[300px] border-[1px] border-gray-200/20  hover:shadow-lg hover:shadow-gray-100/10 hover:translate-y-[-5px] duration-300 ease-in-out shadow-gray-200/20 rounded-lg p-5 flex flex-col justify-start">
      <h2 className="text-extrabold text-4xl">{data.model}</h2>
      <p className="text-gray-500 my-3">{data.description}</p>
      <ClientPrice productEntry={data} plan={plan} />
      <div className="flex flex-col gap-4 mt-8">
        {features.map((item) => (
          <div key={item.id} className="flex justify-start items-center py-2">
            <FaCheckCircle className="text-purple-400 mr-4 text-xl" />
            <span className="text-gray-500">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
