import Image from "next/image";
import check from "@/public/check.svg";
import { FaCheckCircle } from "react-icons/fa";

function RoadMapCards({ item }) {
  return (
    <div>
      <li className="mb-3 py-3 " key={item.id}>
        <div className="flex items-center">
          <FaCheckCircle className="w-4 h-4 my-1 ml-3 text-purple-800 shrink-0" />
          <h6 className="font-light text-sm leading-6 md:text-base ml-5">
            {item.title}
          </h6>
        </div>
        {item.text && (
          <p className="font-light text-sm leading-6 md:text-base mt-3 text-[#757185]">
            {item.text}
          </p>
        )}
      </li>
    </div>
  );
}

export default RoadMapCards;
