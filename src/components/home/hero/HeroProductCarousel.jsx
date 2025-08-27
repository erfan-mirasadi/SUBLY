"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "@/src/hooks/query/product";
import { toPersianNumbers } from "@/src/lib/persianNumbers";
import Button from "../../Button";
import Spinner from "../../ui/Spinner";

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
        ["apple music", "spotify", "nuke", "youtube"].some((term) =>
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
            priority={index === 0} // Only load the first image with high priority
          />
        ))}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs"></div>
      </div>

      {/* Content */}
      <div className="relative  flex flex-col items-center justify-center text-white text-center h-full px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-vazirmatn mb-2 animate-fade-in-up">
          {currentProduct.title}
        </h1>

        {currentProduct.caption && (
          <p className="text-sm md:text-lg lg:text-xl font-vazirmatn mb-6 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
            {currentProduct.caption.length > 120
              ? `${currentProduct.caption.substring(0, 120)}...`
              : currentProduct.caption}
          </p>
        )}

        <div className="text-2xl md:text-3xl lg:text-4xl font-black text-yellow-300 font-vazirmatn mb-8 animate-fade-in-up delay-400">
          {formattedPrice}
        </div>

        <Link
          className="cursor-pointer z-20 animate-fade-in-up delay-600"
          href={`/products/${currentProduct.slug}`}
        >
          <Button className="transform transition-transform duration-300 hover:scale-105">
            مشاهده محصول
          </Button>
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
