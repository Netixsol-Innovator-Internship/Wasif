import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Collections from "../components/Collections";

function LandingPage() {
  return (
    <div className="h-full">
      <Hero />
      <Features/>
      <Collections/>
    </div>
  );
}

export default LandingPage;
