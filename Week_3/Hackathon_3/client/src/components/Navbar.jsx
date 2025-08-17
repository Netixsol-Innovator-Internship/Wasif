import React from "react";
import Logo from "/assets/psychiatry.png";
import Account from "/assets/person.png";
import Search from "/assets/search.png";
import Cart from "/assets/cart.png";
import { Link } from "react-router-dom";

const nav = [
  {
    id: 1,
    name: "Tea Collection",
    to: "/products",
  },
  {
    id: 2,
    name: "Accessories",
    to: "/",
  },
  {
    id: 3,
    name: "Blogs",
    to: "/products",
  },
  {
    id: 4,
    name: "Contact Us",
    to: "/contact",
  },
];

function Navbar() {
  return (
    <div className="w-full h-24 bg-white text-[#282828] flex items-center justify-between px-16">
      <div className="flex gap-x-2 items-center">
        <img src={Logo} alt="Brand Logo" />
        <h1 className="text-xl">Brand Name</h1>
      </div>
      <nav>
        <ul className="flex gap-x-8 uppercase font-medium">
          {nav.map((item) => (
            <li key={item.id}>
              <Link to={item.to}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex gap-x-10">
        <img src={Search} alt="Search" className="w-5 h-5" />
        <Link to={"/signup"}>
        <img src={Account} alt="Account" className="w-5 h-5" /></Link>
       <Link to={"/cart"}>
        <img src={Cart} alt="Cart" className="w-5 h-5" /></Link>
      </div>
    </div>
  );
}

export default Navbar;
