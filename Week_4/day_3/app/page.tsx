import Catalog from "./components/Cataloge";
import Exclusive from "./components/Exclusive";
import Footer from "./components/Footer";
import FreeGames from "./components/FreeGames";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <>
      <div className="bg-black w-full h-full">
        <Navbar />
        <SearchSection />
        <Hero />
        <Slider />
        <Exclusive />
        <FreeGames />
        <Catalog />
        <Footer />
      </div>
    </>
  );
}
