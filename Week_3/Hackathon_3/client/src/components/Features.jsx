import React from "react";

function Features() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              text: "450+ KIND OF LOOSELEAF TEA",
              src: "/assets/local_cafe.png",
            },
            {
              text: "CERTIFICATED ORGANIC TEAS",
              src: "/assets/redeem.png",
            },
            {
              text: "FREE DELIVERY",
              src: "/assets/local_shipping.png",
            },
            {
              text: "SAMPLE FOR ALL TEAS",
              src: "/assets/sell.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-center text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <img src={item.src} alt="" className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 tracking-wide">
                {item.text}
              </h3>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="text-center mt-12">
          <button className="border border-gray-300 text-gray-700 px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-100 transition-colors duration-200 rounded-md">
            LEARN MORE
          </button>
        </div>
      </div>
    </section>
  );
}

export default Features;
