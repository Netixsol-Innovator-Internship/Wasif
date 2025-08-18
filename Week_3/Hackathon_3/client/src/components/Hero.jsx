import React from "react";
import { Link } from "react-router-dom";
import Landing from "/assets/Landing Main Image.png";

function Hero() {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 w-full">
      {/* Left: Image */}
      <div className="flex justify-center items-center">
        <img
          src={Landing}
          alt="Hero"
          className="w-full h-full object-cover md:object-contain"
        />
      </div>

      {/* Right: Text */}
      <div className="font-display flex items-center justify-center px-6 sm:px-10 md:px-0">
        <div className="space-y-5 md:space-y-7 text-center md:text-left xl:w-[420px]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Every day is unique, just like our tea
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus
            adipiscing odio. Neque lacus nibh eros in.
          </p>
          <p className="hidden sm:block text-sm sm:text-base text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus
            adipiscing odio. Neque lacus nibh eros in.
          </p>
          <Link
            to="/products"
            className="bg-[#282828] text-white text-sm py-2 px-6 sm:px-8 inline-block w-full sm:w-[220px] md:w-[263px] text-center rounded"
          >
            Browse Teas
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
