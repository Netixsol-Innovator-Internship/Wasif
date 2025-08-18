import React from "react";
import { Link } from "react-router-dom";

function Collections() {
  const teaCollections = [
    [
      {
        name: "BLACK TEA",
        src: "../../public/assets/blacktea.png",
        delay: "100",
      },
      {
        name: "GREEN TEA",
        src: "../../public/assets/greenTea.jpg",
        delay: "200",
      },
      {
        name: "WHITE TEA",
        src: "../../public/assets/whitetea.jpg",
        delay: "300",
      },
    ],
    [
      { name: "MATCHA", src: "../../public/assets/matcha.jpg", delay: "400" },
      {
        name: "HERBAL TEA",
        src: "../../public/assets/herbal.jpg",
        delay: "500",
      },
      { name: "CHAI", src: "../../public/assets/chai.jpg", delay: "600" },
    ],
    [
      { name: "OOLONG", src: "../../public/assets/olong.jpg", delay: "700" },
      {
        name: "ROOIBOS",
        src: "../../public/assets/roiboos.jpg",
        delay: "800",
      },
      {
        name: "TEAWARE",
        src: "../../public/assets/teaware.jpg",
        delay: "900",
      },
    ],
  ];

  return (
    <section
      id="collections"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 animate-fade-in-up">
          Our Collections
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {teaCollections.flat().map((tea) => (
          <Link
            key={tea.name}
            className={`group cursor-pointer animate-fade-in-up delay-${tea.delay}`}
            to={"/products"}
          >
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
              <img
                src={tea.src}
                alt={tea.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "/images/placeholders/collection-placeholder.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  VIEW COLLECTION
                </span>
              </div>
            </div>
            <h3 className="text-center text-sm font-medium text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors">
              {tea.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Collections;
