// src/app/products/[slug]/components/PriceCard2.jsx
import Image from "next/image";
import AddToCartButton from "@/src/components/products/AddToCartButton";
import PriceDisplay2 from "./PriceDisplay2";

function PriceCard2({
  entry,
  idx,
  plan,
  finalPrice,
  showOldPrice,
  oldPrice,
  prevPrice,
  featuresList,
  modelColor,
  productInfo,
}) {
  return (
    <div
      className={`w-full max-w-[19rem] mx-auto h-full px-6 bg-[#0E0C15] border border-[#252134] rounded-[2rem] py-8 my-4`}
    >
      <h4
        className={`text-[2rem] leading-normal mb-4 font-bold font-sans uppercase ${modelColor}`}
      >
        {entry.model}
      </h4>
      <p className="font-light text-[0.875rem] leading-6 md:text-base min-h-[4rem] mb-3 text-[#FFFF]/50">
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
          <PriceDisplay2 prevPrice={prevPrice} finalPrice={finalPrice} />
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
            <Image src="/check.svg" width={24} height={24} alt="Check" />
            <p className="font-light text-[0.875rem] leading-6 md:text-base ml-4 text-amber-50">
              {feature}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriceCard2;
