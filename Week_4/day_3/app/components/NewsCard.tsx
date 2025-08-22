"use client";
import Image from "next/image";

export default function NewsCard() {
  return (
    <div className="text-white space-y-3">
      <div className="relative w-[353px] h-[198px] ">
        <Image src="/NFS.jpg" alt="" fill className="rounded-2xl" />
      </div>
      <div className="flex flex-col gap-y-1.5">
        <p>NFS UNBOUND</p>
        <p className="text-white/60  text-wrap text-sm">
          Pre-purchase NFS Unbound and get an exclusive Driving Effect, License
          Plate, $150,000 Bank, and more.
        </p>
        <p>₹3,444</p>
      </div>
    </div>
  );
}
