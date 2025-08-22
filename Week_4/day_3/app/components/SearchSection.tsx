import React from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";

export default function SearchSection() {
  return (
    <>
      <div className="w-full bg-black p-6">
        <Container className="flex gap-x-6 items-center">
          <div className="max-w-[220px] h-10 bg-[#202020] rounded-4xl flex items-center gap-x-3 px-2.5">
            <Image src="/Search.png" alt="Search Icon" width={23} height={23} />
            <input
              type="text"
              placeholder="Search Store"
              className="text-[#A0A0A0] text-xs focus:outline-none"
            />
          </div>
          <ul className="flex gap-x-4 text-[#666666] text-xs">
            <li>
              <Link href="#" className="text-white"> Discover</Link>
            </li>
            <li>
              <Link href="#">Browse</Link>
            </li>
            <li>
              <Link href="#">News</Link>
            </li>
          </ul>
        </Container>
      </div>
    </>
  );
}
