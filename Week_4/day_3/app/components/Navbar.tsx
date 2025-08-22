"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // react-icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#313131] text-[#AAAAAA]">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-11 gap-x-4 px-2 lg:px-0">
        {/* Logo Section */}
        <div className="relative w-6 h-6">
          <Image src="/Logo.png" alt="Logo" fill />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-x-4 items-center text-xs">
          <li>
            <Link href="#">Store</Link>
          </li>
          <li>
            <Link href="#">FAQ</Link>
          </li>
          <li>
            <Link href="#">Help</Link>
          </li>
          <li>
            <Link href="#">REAL ENGINE</Link>
          </li>
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-x-5 ml-auto">
          <div className="relative w-6 h-6">
            <Image src="/Glob.png" alt="Language" fill />
          </div>
          <div className="flex gap-x-1 items-center cursor-pointer">
            <div className="relative w-6 h-6">
              <Image src="/Sign.png" alt="Sign In" fill />
            </div>
            <p className="text-xs">SIGN IN</p>
          </div>
          <div className="h-11 w-28 bg-[#007AFF] text-white text-center flex items-center justify-center ml-auto cursor-pointer">
            <p className="text-xs">DOWNLOAD</p>
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX className="text-white text-2xl" />
            ) : (
              <FiMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#222] text-white px-5 py-4 space-y-4">
          <ul className="flex flex-col gap-y-3 text-sm">
            <li>
              <Link href="#">Store</Link>
            </li>
            <li>
              <Link href="#">FAQ</Link>
            </li>
            <li>
              <Link href="#">Help</Link>
            </li>
            <li>
              <Link href="#">REAL ENGINE</Link>
            </li>
          </ul>

          <div className="flex flex-col gap-y-4 mt-4">
            <div className="flex items-center gap-x-2">
              <div className="relative w-6 h-6">
                <Image src="/Glob.png" alt="Language" fill />
              </div>
              <span>Language</span>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="relative w-6 h-6">
                <Image src="/Sign.png" alt="Sign In" fill />
              </div>
              <span>SIGN IN</span>
            </div>
            <div className="h-10 w-full bg-[#007AFF] text-white flex items-center justify-center cursor-pointer rounded-md">
              <p>DOWNLOAD</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
