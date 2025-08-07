"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

const ProductSwiper = ({ items }) => {
  return (
    <div className="relative top-0 w-full max-w-screen mx-auto">
      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          margin-top: 2rem;
        }
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255, 255, 255, 0.2) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #fff !important;
        }
      `}</style>
      <Swiper
        effect="coverflow"
        modules={[Navigation, Pagination, EffectCoverflow]}
        slidesPerView="auto"
        centeredSlides
        loop
        grabCursor
        navigation
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 150,
          modifier: 1.5,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="swiper-container !px-12 pb-12"
      >
        {items.products.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`}>
            {({ isActive }) => (
              <div className="flex justify-center items-center transition-all duration-500">
                <Link href={`/products/${item.slug}`}>
                  <Image
                    src={item.image_small_url}
                    alt={item.title}
                    width={300}
                    height={300}
                    className={`rounded-xl transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-30"
                    }`}
                  />
                </Link>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
