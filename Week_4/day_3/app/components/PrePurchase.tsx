"use client";

import Image from "next/image";
import React from "react";

export default function PrePurchase() {
  return (
    <div className="flex items-center gap-x-2 p-4 px-5 pr-14">
      <div className="relative w-[60px] h-20">
        <Image src="/GOW.jpg" alt="" fill className="rounded-lg" />
      </div>
      <p className="text-nowrap">God Of War 4</p>
    </div>
  );
}
