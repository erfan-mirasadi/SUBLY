import { useState } from "react";
import PlanSwitch from "./PlanSwitch";
import Link from "next/link";
import CountUp from "react-countup";
import Image from "next/image";

// import { product } from "../../products/AllProducts";

const pricing = [
  {
    id: 0,
    productId: null,
    title: "Basic",
    monthly: 19,
    annual: 12,
    sixmonth: 13,
    description: "AI chatbot, personalized recommendations",
    features: [
      "An AI chatbot that",
      "Personalized recommendations",
      "Ability to explore the app ",
    ],
  },
  {
    id: 1,
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    monthly: 11,
    annual: 30,
    threemonth: 20,
    sixmonth: 22,
    features: [
      "An advanced AI chatbot ",
      "An analytics dashboard ",
      "Priority support to solve i",
    ],
  },
  {
    id: 2,
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    // monthly: 20,
    // annual: 62,
    threemonth: 43,
    sixmonth: 50,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: 3,
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    monthly: 11,
    annual: false,
    threemonth: 20,
    sixmonth: false,
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
];

const options = [
  { label: "Monthly", value: "monthly" },
  { label: "Annual", value: "annual" },
  { label: "3 month", value: "threemonth" },
  { label: "6 month", value: "sixmonth" },
];

function PriceList() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  return (
    <div className="w-full">
      {/* PlanSwitch container with responsive width */}
      <div className="w-full overflow-x-auto md:overflow-visible">
        <PlanSwitch
          options={options}
          defaultIndex={0}
          onChange={(selectedOption, idx) => {
            console.log(selectedOption, idx);
            setSelectedPlan(selectedOption.value);
          }}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {pricing.map((item) => (
          <div
            key={item.id}
            className={`w-full max-w-[19rem] mx-auto h-full px-6 bg-[#0E0C15] border border-[#252134] rounded-[2rem] py-8 my-4
              ${item.id === 0 ? "[&>h4]:text-[#FFC876]" : ""}
              ${
                item.id % 2 === 0
                  ? "[&>h4]:text-[#AC6AFF]"
                  : "[&>h4]:text-[#FF776F]"
              }
            `}
          >
            <h4 className="text-[2rem] leading-normal mb-4">{item.title}</h4>

            <p className="font-light text-[0.875rem] leading-6 md:text-base min-h-[4rem] mb-3 text-[#FFFF]/50 ">
              {item.description}
            </p>

            <div className="flex items-center h-[5.5rem] mb-6">
              {item[selectedPlan] && (
                <>
                  <div className="text-[2rem] leading-normal md:text-[2.5rem]">
                    $
                  </div>
                  <div className="text-[5.5rem] leading-none font-bold">
                    <CountUp
                      start={item.monthly}
                      end={item[selectedPlan]}
                      duration={0.4}
                      useEasing={false}
                      preserveValue
                    />
                  </div>
                </>
              )}
            </div>

            <Link
              href={
                typeof item[selectedPlan] === "number" ? "BUY" : "Contact us"
              }
            >
              <button className="cursor-pointer w-full mb-6 bg-amber-50 text-black rounded-2xl">
                {typeof item[selectedPlan] === "number" ? "BUY" : "Contact us"}
              </button>
            </Link>

            <ul>
              {item.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start py-5 border-t border-[#252134]"
                >
                  <Image src="/check.svg" width={24} height={24} alt="Check" />
                  <p className="font-light text-[0.875rem] leading-6 md:text-base ml-4 text-amber-50">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceList;
