"use client";
import Image from "next/image";
import React from "react";

export default function SaleCard() {
  return (
    <div className="flex flex-col">
      <div className="w-[200px] h-[284px] relative">
        <Image src="/Valo.jpg" alt="" fill />
      </div>
      <div>
        <p>Valorant</p>
        <div className="flex gap-x-2 items-center">
            <p className="bg-[#0074E4] w-[53px] h-6 text-center rounded-md">-10%</p>
        <p className="line-through text-white/60">₹999</p>
        <p>₹850</p>
        </div>
      </div>
    </div>
  );
}
