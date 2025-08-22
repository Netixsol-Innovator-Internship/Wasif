"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Container from "./Container";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SaleCard from "./SaleCard";

export default function Slider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="text-white bg-black h-full w-full pt-2 py-4">
      <Container>
        {/* Header */}
        <div className="flex justify-between py-4">
          <div className="flex gap-x-2 items-center">
            <p className="text-lg">Game on Sale</p>
            <div className="relative w-1.5 h-1.5 cursor-pointer">
              <Image src="/sale.png" alt="Sale Arrow" fill />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="space-x-2 flex">
            <button
              ref={prevRef}
              className="bg-[#202020] rounded-full p-1.5 cursor-pointer disabled:opacity-50"
            >
              <IoIosArrowBack />
            </button>
            <button
              ref={nextRef}
              className="bg-[#202020] rounded-full p-1.5 cursor-pointer disabled:opacity-50"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2} // default for <490px handled separately
          breakpoints={{
            0: { slidesPerView: 1 }, // <490px → 1 card
            490: { slidesPerView: 2 }, // ≥490px → 2 cards
            768: { slidesPerView: 3 }, // ≥768px → 3 cards
            1024: { slidesPerView: 4 }, // ≥1024px → 4 cards
            1140: { slidesPerView: 5 }, // ≥1140px → 5 cards
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          className="mt-10"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
            <SwiperSlide key={i}>
              <SaleCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
