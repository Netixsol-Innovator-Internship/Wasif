"use client";
import Image from "next/image";
import React from "react";

export default function FGCard() {
  return (
    <div>
      <div className="relative w-[220px] h-[315px]">
        <Image src="/DarkWood.jpg" alt="" fill />
      </div>
      <div className="space-y-2">
        <p>Darkwood</p>
        <p className="text-[#AAAAAA]">Free Now - Jul 25</p>
      </div>
    </div>
  );
}
