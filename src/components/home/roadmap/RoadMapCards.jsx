import Image from "next/image";
import check from "@/public/check.svg";

function RoadMapCards({ item }) {
  return (
    <div>
      <li className="mb-3 py-3 " key={item.id}>
        <div className="flex items-center">
          <Image src={check} width={24} height={24} alt="check" />
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
