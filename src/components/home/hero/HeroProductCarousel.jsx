"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toPersianNumbers } from "@/src/lib/persianNumbers";

// Hook for fetching products
import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "@/src/hooks/query/product";
import Button from "../../Button";

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
      .filter((product) => {
        const title = product.title.toLowerCase();
        return (
          title.includes("apple music") ||
          title.includes("spotify") ||
          title.includes("nuke") ||
          title.includes("youtube")
        );
      })
      .slice(0, 6);
  }, [products]);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (popularProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popularProducts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [popularProducts.length]);

  if (isLoading || error || popularProducts.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-b-[14px]">
        <div className="text-white font-vazirmatn text-xl">
          {isLoading ? "در حال بارگذاری..." : "محصولی یافت نشد"}
        </div>
      </div>
    );
  }

  const currentProduct = popularProducts[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentProduct.image_big_url}
          alt={currentProduct.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-vazirmatn mb-1">
          {currentProduct.title}
        </h1>

        {currentProduct.caption && (
          <p className="text-md md:text-md lg:text-xl font-vazirmatn mb-17 max-w-2xl leading-relaxed">
            {currentProduct.caption.length > 120
              ? `${currentProduct.caption.substring(0, 120)}...`
              : currentProduct.caption}
          </p>
        )}

        <div className="text-3xl md:text-4xl lg:text-5xl font-black text-yellow-300 font-vazirmatn mb-10">
          {(() => {
            // Use the same logic as ProductCard.jsx
            // Flatten all plans with their discount logic
            let allPlans =
              currentProduct.product_entry?.flatMap(
                (entry) =>
                  entry.product_plans?.map((plan) => {
                    let discounted =
                      plan.state === "outlet" && plan.discount_price;
                    return {
                      ...plan,
                      model: entry.model,
                      displayPrice: discounted
                        ? plan.price - plan.discount_price
                        : plan.price,
                      oldPrice: discounted ? plan.price : null,
                      isOutlet: discounted,
                    };
                  }) || []
              ) || [];

            // Find the plan with the lowest display price
            let lowestPlan =
              allPlans.length > 0
                ? allPlans.reduce(
                    (min, plan) =>
                      plan.displayPrice < min.displayPrice ? plan : min,
                    allPlans[0]
                  )
                : null;

            let price = lowestPlan ? lowestPlan.displayPrice : null;

            if (price !== null) {
              return `${toPersianNumbers(price.toLocaleString())} تومان`;
            }

            return "قیمت ویژه";
          })()}
        </div>

        <Link
          className="cursor-pointer  z-20"
          href={`/products/${currentProduct.slug}`}
        >
          <Button className="">مشاهده محصول</Button>
        </Link>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {popularProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-200 hover:scale-110  cursor-pointer ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
