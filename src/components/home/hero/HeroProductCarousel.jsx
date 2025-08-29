"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "@/src/hooks/query/product";
import { toPersianNumbers } from "@/src/lib/persianNumbers";
import Button from "../../Button";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";

// Helper function to find the lowest price
const getLowestPrice = (product) => {
  const allPlans =
    product.product_entry?.flatMap(
      (entry) =>
        entry.product_plans?.map((plan) => {
          const discounted = plan.state === "outlet" && plan.discount_price;
          return {
            ...plan,
            displayPrice: discounted
              ? plan.price - plan.discount_price
              : plan.price,
          };
        }) || []
    ) || [];

  const lowestPlan =
    allPlans.length > 0
      ? allPlans.reduce(
          (min, plan) => (plan.displayPrice < min.displayPrice ? plan : min),
          allPlans[0]
        )
      : null;

  return lowestPlan ? lowestPlan.displayPrice : null;
};

export default function HeroProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stripParenthetical = (s) =>
    typeof s === "string" ? s.replace(/\s*\(.*?\)\s*/g, "").trim() : s;

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: getProductsQuery.queryKey,
    queryFn: getProductsQuery,
    staleTime: getProductsQuery.staleTime,
  });

  const popularProducts = useMemo(() => {
    if (!products) return [];
    return products
      .filter((product) =>
        ["apple music", "spotify", "apple tv", "hbo max"].some((term) =>
          product.title.toLowerCase().includes(term)
        )
      )
      .slice(0, 6);
  }, [products]);

  // Auto-slide every 5 seconds for a more professional feel
  useEffect(() => {
    if (popularProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popularProducts.length);
    }, 5000); // Increased delay for a smoother, more deliberate feel

    return () => clearInterval(interval);
  }, [popularProducts.length]);

  if (isLoading || error || popularProducts.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-b-2xl">
        <div className="text-white font-vazirmatn text-xl">
          {isLoading ? <Spinner /> : "محصولی یافت نشد"}
        </div>
      </div>
    );
  }

  const currentProduct = popularProducts[currentIndex];
  const lowestPrice = getLowestPrice(currentProduct);
  const formattedPrice =
    lowestPrice !== null
      ? `${toPersianNumbers(lowestPrice.toLocaleString())} تومان`
      : "قیمت ویژه";

  // strip parenthetical parts and remove any leading Persian word 'اکانت' (and following spaces)
  const displayedTitle = stripParenthetical(currentProduct.title)
    .replace(/^\s*اکانت\s*/iu, "")
    .trim();

  return (
    <div className="relative w-full h-full overflow-hidden bg-black transition-all duration-500 rounded-[14px] ">
      {/* Background Image with subtle animation */}
      <div className="absolute inset-0 transition-opacity duration-1000 ">
        {popularProducts.map((product, index) => (
          <Image
            key={product.id}
            src={product.image_big_url}
            alt={product.title}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out rounded-2xl ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-start text-white text-center h-full px-8 pt-2">
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-black font-vazirmatn mt-0 animate-fade-in-up sticky top-0 z-30">
          <Heading
            title={displayedTitle}
            tag={currentProduct.caption}
            className="scale-140"
          />
        </h1>

        {/* {currentProduct.caption && (
          <p className="text-sm md:text-md font-vazirmatn mb-40 max-w-2xl leading-relaxed animate-fade-in-up delay-200 text-white/65">
            <Heading title={displayedTitle} tag={currentProduct.caption} />
          </p>
        )} */}

        <div className="flex-1" />
      </div>

      {/* Price and CTA pinned to the bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3 z-30 px-4 mb-10">
        <div className="text-md md:text-xl lg:text-2xl text-yellow-200 font-vazirmatn m-2.5 animate-fade-in-up delay-600 backdrop-blur-md shadow-md border-1 border-yellow-200/10 rounded-2xl p-3">
          {formattedPrice}
        </div>
        <Link
          className="cursor-pointer z-20 animate-fade-in-up delay-600"
          href={`/products/${currentProduct.slug}`}
        >
          {/* <Button className="transform transition-transform duration-300 hover:scale-110">
            مشاهده محصول
          </Button> */}
        </Link>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {popularProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
