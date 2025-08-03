"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toPersianNumbers } from "@/src/lib/persianNumbers";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Hook for fetching products
import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "@/src/hooks/query/product";

export default function HeroProductCarousel() {
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
      .slice(0, 12); // Increased for better loop effect
  }, [products]);

  if (isLoading || error || popularProducts.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-white font-vazirmatn text-xl">
          {isLoading ? "در حال بارگذاری..." : "محصولی یافت نشد"}
        </div>
      </div>
    );
  }

  return (
    <div>
      <style jsx global>{`
        .movie-carousel-swiper {
          width: 100% !important;
          height: 1000px !important;
          padding: 50px 0 200px 0 !important; /* افزایش padding برای فضای انعکاس */
        }

        .movie-carousel-swiper .swiper-slide {
          width: 800px !important;
          height: 600px !important;
          background-position: center !important;
          background-size: cover !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          overflow: visible !important; /* تغییر از hidden به visible برای نمایش انعکاس */
          transition: all 0.3s ease !important;
          position: relative !important;
        }

        .movie-carousel-swiper .swiper-slide-active {
          transform: scale(1.1) !important;
        }

        .movie-product-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.3s ease !important;
          border-radius: 0 !important;
        }

        /* اثر انعکاس شیشه‌ای */
        .reflection-container {
          position: relative !important;
        }

        .reflection-container::after {
          content: "" !important;
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background-image: var(--reflection-image) !important;
          background-size: cover !important;
          background-position: center !important;
          border-radius: 15px !important;
          transform: scaleY(-1.1) !important; /* برعکس کردن عمودی */
          opacity: 0.1 !important;
          margin-top: 50px !important;
          mask: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 20%,
            rgba(0, 0, 0, 0.2) 30%,
            rgba(0, 0, 0, 0.6) 60%,
            rgba(0, 0, 0, 1) 100%
          ) !important;
          -webkit-mask: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 20%,
            rgba(0, 0, 0, 0.2) 30%,
            rgba(0, 0, 0, 0.6) 60%,
            rgba(0, 0, 0, 1) 100%
          ) !important;
          z-index: -1 !important;
        }

        .movie-carousel-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          transition: all 0.3s ease !important;
        }

        .movie-carousel-swiper .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.3) !important;
        }

        @media (max-width: 768px) {
          .movie-carousel-swiper {
            width: 90% !important;
            height: 700px !important; /* افزایش برای موبایل */
          }
          .movie-carousel-swiper .swiper-slide {
            width: 220px !important;
            height: 320px !important;
          }
        }
      `}</style>

      {/* Removed internal header to make carousel flush to top */}

      {/* Swiper Carousel */}
      <Swiper
        effect="coverflow"
        modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
        slidesPerView="auto"
        centeredSlides
        loop
        grabCursor
        coverflowEffect={{
          rotate: 35,
          stretch: 10,
          depth: 1000,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={3000}
        className="movie-carousel-swiper"
      >
        {popularProducts.map((product, index) => (
          <SwiperSlide key={`${product.id}-${index}`}>
            <Link href={`/products/${product.slug}`}>
              <div
                className="relative w-full h-full group cursor-pointer reflection-container"
                style={{
                  "--reflection-image": `url(${product.image_big_url})`,
                }}
              >
                {/* Product Image */}
                <Image
                  src={product.image_big_url}
                  alt={product.title}
                  fill
                  className="movie-product-image group-hover:scale-105"
                  loading="lazy"
                />

                {/* Default Info Overlay (Always Visible) */}
                <div className="absolute bottom-0 left-0 right-4 p-4">
                  <h3 className="text-white font-vazirmatn font-bold text-lg mb-1 truncate">
                    {product.title}
                  </h3>
                  <div className="text-green-400 font-vazirmatn font-bold text-sm">
                    {toPersianNumbers(
                      product.price?.toLocaleString() || "قیمت ویژه"
                    )}{" "}
                    تومان
                  </div>
                </div>

                {/* Hover Overlay with Details */}
                <div className="absolute -m-5 inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 p-6">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-3 font-vazirmatn">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-sm mb-4 font-vazirmatn text-gray-200 leading-relaxed">
                        {product.description.length > 80
                          ? `${product.description.substring(0, 80)}...`
                          : product.description}
                      </p>
                    )}

                    <div className="mb-4">
                      <span className="text-2xl font-bold text-green-400 font-vazirmatn">
                        {product.price?.toLocaleString()
                          ? toPersianNumbers(product.price.toLocaleString())
                          : "قیمت ویژه"}{" "}
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
