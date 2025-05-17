"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Image from "next/image";

const ProductSwiper = ({ items }) => {
  return (
    <div className="relative top-0 w-full max-w-screen mx-auto">
      <Swiper
        effect="coverflow"
        modules={[Navigation, Pagination, EffectCoverflow]}
        slidesPerView={"auto"}
        navigation={{
          // nextEl: ".swiper-button-next",
          // prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={-150}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ clickable: true }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => (
              <div className="flex justify-center items-center transition-all duration-500">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={300}
                  height={300}
                  className={`rounded-xl transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-30"
                  }`}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
