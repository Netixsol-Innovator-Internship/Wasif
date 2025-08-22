"use client";

import React from "react";
import Container from "./Container";
import Image from "next/image";
import PrePurchase from "./PrePurchase";

export default function Hero() {
  return (
    <div className="w-full bg-black">
      <Container className="flex gap-x-6">
        {/* Left Hero Banner */}
        <section className="bg-[url('/God_of_war.jpg')] max-w-[827px] lg:w-[827px] h-[432px] rounded-2xl bg-cover bg-no-repeat text-white pl-8 space-y-3.5">
          <p className="text-xs pt-48">PRE-PURCHASE AVAILABLE</p>
          <p className="max-w-[300px] text-base">
            Kratos now lives as a man in the realm of Norse Gods and monsters.
            It is in this harsh, unforgiving world that he must fight to survive
          </p>
          <button className="text-black bg-white p-3 rounded-sm">
            PRE-PURCHASE NOW
          </button>
        </section>

        {/* Right Column */}
        <section className="flex flex-col text-[#F5F5F5] space-y-3">
          <div className="flex items-center gap-x-2 bg-[#252525] p-4 px-5 pr-14 rounded-2xl">
            <div className="relative w-[60px] h-20">
              <Image
                src="/GOW.jpg"
                alt="God Of War 4"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <p className="whitespace-nowrap">God Of War 4</p>
          </div>

          <PrePurchase />
          <PrePurchase />
          <PrePurchase />
        </section>
      </Container>
    </div>
  );
}
