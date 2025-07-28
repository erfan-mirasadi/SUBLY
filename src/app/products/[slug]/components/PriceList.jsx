import { useState, useRef } from "react";
import PlanSwitch from "./PlanSwitch";
import Link from "next/link";
import CountUp from "react-countup";
import Image from "next/image";
import AddToCartButton from "@/src/components/products/AddToCartButton";

// Color map for entry ids (4 colors)
const modelColors = [
  "text-[#AC6AFF]", // purple
  "text-[#FF776F]", // red
  "text-[#FFC876]", // yellow
  "text-white", // white
];

function PriceList({ productEntry = [], productInfo = {} }) {
  // Extract all unique plan titles from all product_entry items
  const allPlanTitles = Array.from(
    new Set(
      productEntry
        .flatMap((entry) => entry.product_plans.map((plan) => plan.title))
        .filter(Boolean)
    )
  );

  // Build dynamic options for PlanSwitch
  const options = allPlanTitles.map((title) => ({
    label: title.charAt(0).toUpperCase() + title.slice(1),
    value: title.toLowerCase(),
  }));

  const [selectedPlan, setSelectedPlan] = useState(options[0]?.value || "");
  const prevPrices = useRef({});

  const handlePlanChange = (selectedOption, idx) => {
    productEntry.forEach((entry) => {
      const plan = entry.product_plans.find(
        (p) => p.title?.toLowerCase() === selectedPlan
      );
      let finalPrice = plan ? plan.price : null;
      if (plan && plan.state === "outlet" && plan.discount_price) {
        finalPrice = parseFloat((plan.price - plan.discount_price).toFixed(10));
      }
      prevPrices.current[entry.id] = finalPrice;
    });
    setSelectedPlan(selectedOption.value);
  };

  return (
    <div className="w-full">
      {/* PlanSwitch container with responsive width */}
      <div className="w-full overflow-x-auto md:overflow-visible">
        <PlanSwitch
          options={options}
          defaultIndex={0}
          onChange={handlePlanChange}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {productEntry.map((entry, idx) => {
          // Find the plan for the selected type
          let plan = entry.product_plans.find(
            (p) => p.title?.toLowerCase() === selectedPlan
          );

          // Features: handle string or array
          let featuresList = [];
          if (Array.isArray(entry.features)) {
            featuresList = entry.features;
          } else if (typeof entry.features === "string") {
            featuresList = entry.features
              .split(",")
              .map((f) => f.trim())
              .filter(Boolean);
          }

          // Price calculation and display logic
          let finalPrice = plan ? plan.price : null;
          let showOldPrice = false;
          let oldPrice = null;
          if (plan && plan.state === "outlet" && plan.discount_price) {
            showOldPrice = true;
            oldPrice = plan.price;
            finalPrice = parseFloat(
              (plan.price - plan.discount_price).toFixed(10)
            );
          }

          // Determine decimals for CountUp
          let decimals = 0;
          if (finalPrice !== null && !Number.isInteger(finalPrice)) {
            const decimalStr = finalPrice.toString().split(".")[1] || "";
            decimals = decimalStr.replace(/0+$/, "").length;
            if (decimals === 0) decimals = 2;
          }

          // Button text logic
          const buttonText = plan ? "BUY" : "Contact us";

          // Use previous price for CountUp start
          const prevPrice = prevPrices.current[entry.id] ?? finalPrice;

          // Pick color for model title based on idx (cycle through 4 colors)
          const modelColor = modelColors[idx % modelColors.length];

          return (
            <div
              key={entry.id}
              className={`w-full max-w-[19rem] mx-auto h-full px-6 bg-[#0E0C15] border border-[#252134] rounded-[2rem] py-8 my-4`}
            >
              <h4
                className={`text-[2rem] leading-normal mb-4 font-bold font-sans uppercase  ${modelColor}`}
              >
                {entry.model}
              </h4>
              <p className="font-light text-[0.875rem] leading-6 md:text-base min-h-[4rem] mb-3 text-[#FFFF]/50 ">
                {entry.description}
              </p>
              <div className="flex items-center h-[5.5rem] mb-6 relative">
                {plan && showOldPrice && (
                  <span className="absolute right-0 -top-8 flex items-center text-red-500 text-base md:text-lg line-through font-bold bg-white/10 px-2 py-1 rounded-md shadow-sm z-10">
                    <span className="mr-1">${oldPrice}</span>
                    <span className="text-xs text-red-400 ml-1">USD</span>
                  </span>
                )}
                {plan && finalPrice !== null && (
                  <>
                    <div className="text-[2rem] leading-normal md:text-[2.5rem] flex items-end">
                      $
                    </div>
                    <div className="text-[5.5rem] leading-none font-bold">
                      <CountUp
                        start={prevPrice}
                        end={finalPrice}
                        decimals={decimals}
                        decimal=","
                        duration={0.4}
                        useEasing={false}
                        preserveValue
                      />
                    </div>
                  </>
                )}
              </div>
              {plan ? (
                <AddToCartButton
                  plan={{
                    id: plan.id,
                    title: plan.title,
                    price: finalPrice,
                    oldPrice: oldPrice,
                    duration: plan.duration,
                    state: plan.state,
                    discount_price: plan.discount_price,
                  }}
                  productInfo={{
                    id: productInfo.id,
                    title: productInfo.title,
                    image_small_url: productInfo.image_small_url,
                    caption: productInfo.caption,
                    model: entry.model,
                  }}
                />
              ) : (
                <button
                  className="w-full mb-6 bg-gray-400 text-white rounded-2xl px-6 py-3 font-medium cursor-not-allowed"
                  disabled
                >
                  Contact us
                </button>
              )}
              <ul>
                {featuresList.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start py-5 border-t border-[#252134]"
                  >
                    <Image
                      src="/check.svg"
                      width={24}
                      height={24}
                      alt="Check"
                    />
                    <p className="font-light text-[0.875rem] leading-6 md:text-base ml-4 text-amber-50">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PriceList;
