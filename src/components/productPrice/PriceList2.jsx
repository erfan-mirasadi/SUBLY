// src/app/products/[slug]/components/PriceList2.jsx
"use client";
// import Image from "next/image";
// import AddToCartButton from "@/src/components/products/AddToCartButton";
import PlanSwitch2 from "./PlanSwitch2";
import PriceCard2 from "./PriceCard2";
import { useRef, useState } from "react";

// Color map for entry ids (4 colors)
const modelColors = [
  "text-[#AC6AFF]", // purple
  "text-[#FF776F]", // red
  "text-[#FFC876]", // yellow
  "text-white", // white
];

function PriceList2({
  productEntry = [],
  productInfo = {},
  currentPlan,
  productSlug,
}) {
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

  // Use currentPlan from URL or first available plan
  const selectedPlan = currentPlan || options[0]?.value || "";
  const currentIndex = options.findIndex((opt) => opt.value === selectedPlan);

  const [clientSelectedPlan, setClientSelectedPlan] = useState(selectedPlan);
  const prevPrices = useRef({});

  const handlePlanChange = (selectedOption, idx) => {
    // Store current prices as previous prices for CountUp animation
    productEntry.forEach((entry) => {
      const plan = entry.product_plans.find(
        (p) => p.title?.toLowerCase() === clientSelectedPlan
      );
      let finalPrice = plan ? plan.price : null;
      if (plan && plan.state === "outlet" && plan.discount_price) {
        finalPrice = parseFloat((plan.price - plan.discount_price).toFixed(10));
      }
      prevPrices.current[entry.id] = finalPrice;
    });

    setClientSelectedPlan(selectedOption.value);
  };

  return (
    <div className="w-full">
      {/* PlanSwitch container with responsive width */}
      <div className="w-full overflow-x-auto md:overflow-visible">
        <PlanSwitch2
          options={options}
          defaultIndex={currentIndex >= 0 ? currentIndex : 0}
          onChange={handlePlanChange}
          productSlug={productSlug}
          currentPlan={clientSelectedPlan}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {productEntry.map((entry, idx) => {
          // Find the plan for the selected type
          let plan = entry.product_plans.find(
            (p) => p.title?.toLowerCase() === clientSelectedPlan
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

          // Use previous price for CountUp start
          const prevPrice = prevPrices.current[entry.id] ?? finalPrice;

          // Pick color for model title based on idx (cycle through 4 colors)
          const modelColor = modelColors[idx % modelColors.length];

          return (
            <PriceCard2
              key={entry.id}
              entry={entry}
              idx={idx}
              plan={plan}
              finalPrice={finalPrice}
              showOldPrice={showOldPrice}
              oldPrice={oldPrice}
              prevPrice={prevPrice}
              featuresList={featuresList}
              modelColor={modelColor}
              productInfo={productInfo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PriceList2;
