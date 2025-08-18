import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById, getAllProducts } from "../api/products";
import { addToCart } from "../api/cart";
import AddBag from "/assets/local_mall.png";
import Language from "/assets/language.png";
import First from "/assets/50g.png";
import Second from "/assets/100g.png";
import Third from "/assets/250kg.png";
import Forth from "/assets/1kg.png";
import samp from "/assets/samp.png";

const productOptions = [
  { label: "50g bag", src: First },
  { label: "100g bag", src: Second },
  { label: "250g bag", src: Third },
  { label: "1kg bag", src: Forth },
  { label: "Sampler", src: samp },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    async function fetchProductAndRelated() {
      try {
        const data = await getProductById(id);
        setProduct(data);

        const allProducts = await getAllProducts({});
        const filtered = allProducts.filter((p) => p._id !== id);

        setRelated(filtered.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductAndRelated();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first!");
      navigate("/login");
      return;
    }

    if (!selectedVariant) {
      alert("Please select a variant before adding to cart.");
      return;
    }

    try {
      await addToCart(product._id, quantity);
      alert(
        `Added ${quantity} x ${product.name} (${selectedVariant}) to cart!`
      );
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add product to cart.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {product.image && (
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-[420px] object-contain bg-white rounded-xl shadow-md"
          />
        )}

        {/* Product Info */}
        <div>
          {/* Title */}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Short Description */}
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-sm text-gray-700 mb-4">
            <span>🌍 Origin: {product.origins?.country}</span>
            <span>🍃 Organic</span>
            <span>🌱 Vegan</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-semibold text-gray-900 mb-6">
            €{product.price?.amount?.toFixed(2)} / {product.price?.unit || "g"}
          </p>

          {/* Variants */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Variants</h3>
            <div className="flex gap-3 flex-wrap">
              {productOptions.map((variant, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    selectedVariant === variant
                      ? "border-black bg-gray-100"
                      : "hover:border-black"
                  }`}
                >
                  <img src={variant.src} alt="" className="mx-auto" />
                  {variant.label}
                </button>
              ))}
            </div>
          </div>

          {/*  Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className={`px-8 py-3 rounded-lg w-full md:w-auto flex items-center gap-2 transition ${
              selectedVariant
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            <img src={AddBag} alt="" className="w-4 h-4" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* ====== STEEPING + ABOUT SECTION ====== */}
      <div className="grid md:grid-cols-2 gap-8 mt-16 border-t pt-10 bg-gray-50 rounded-xl p-6">
        {/* Steeping Instructions */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Steeping instructions</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              🍵 <b>Serving Size:</b> 2 tsp per cup, 6 tsp per pot
            </li>
            <li>
              🔥 <b>Water Temperature:</b> 100°C
            </li>
            <li>
              ⏳ <b>Steeping Time:</b> 3 - 5 minutes
            </li>
            <li>
              🎨 <b>Color after 3 minutes:</b> Deep Amber
            </li>
          </ul>
        </div>

        {/* About this tea */}
        <div>
          <h2 className="text-xl font-semibold mb-6">About this tea</h2>
          <div className="grid grid-cols-2 gap-y-3 text-gray-700 text-sm mb-4">
            <p>
              <b>Flavor:</b> Spicy
            </p>
            <p>
              <b>Qualities:</b> Smoothing
            </p>
            <p>
              <b>Caffeine:</b> Medium
            </p>
            <p>
              <b>Allergens:</b> Nuts-free
            </p>
          </div>
          <h3 className="font-semibold">Ingredients</h3>
          <p className="text-gray-600">
            Black Ceylon tea, Green tea, Ginger root, Cloves, Black pepper,
            Cinnamon sticks, Cardamom, Cinnamon pieces.
          </p>
        </div>
      </div>

      {/* ====== RELATED PRODUCTS ====== */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          You may also like
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {related.map((p) => (
            <Link
              key={p._id}
              to={`/products/${p._id}`}
              className="text-center hover:shadow-lg p-4 rounded-lg transition"
            >
              <img
                src={p.image?.url}
                alt={p.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-medium truncate">{p.name}</h3>
              <p className="text-gray-600">
                €{p.price?.amount?.toFixed(2)} / {p.price?.unit || "g"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
