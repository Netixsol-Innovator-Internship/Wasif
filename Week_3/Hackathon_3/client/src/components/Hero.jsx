import React from "react";
import { Link } from "react-router-dom";
import Landing from "/assets/Landing Main Image.png";
function Hero() {
  return (
    <div className="h-screen grid  grid-cols-1 md:grid-cols-2 w-full">
      <div>
        <img src={Landing} alt="" />
      </div>
      <div className="font-display gap-x-2 xl:w-[420px] text-wrap flex items-center justify-center ">
        <div className="space-y-7">
          <h1 className="text-4xl font-bold">Every day is unique, just like our tea</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus
            adipiscing odio. Neque lacus nibh eros in.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus
            adipiscing odio. Neque lacus nibh eros in.
          </p>
          <Link
            to={"./products"}
            className="bg-[#282828] text-white text-sm py-2 px-8 inline-block w-[263px] text-center"
          >
            Browse Teas
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
