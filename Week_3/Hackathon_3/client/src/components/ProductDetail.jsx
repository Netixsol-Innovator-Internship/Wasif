import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useAddToCartMutation,
} from "../redux/apiSlice";

import AddBag from "/assets/local_mall.png";
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

  // 🔹 Fetch product
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  // 🔹 Fetch all products for "related"
  const { data: allProducts = [] } = useGetAllProductsQuery({});

  // 🔹 Add to cart mutation
  const [addToCart] = useAddToCartMutation();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const related = allProducts.filter((p) => p._id !== id).slice(0, 3);

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
      await addToCart({ productId: product._id, quantity }).unwrap();
      alert(`Added ${quantity} x ${product.name} (${selectedVariant.label}) to cart!`);
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add product to cart.");
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error || !product) return <p className="p-6">Product not found.</p>;

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
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center gap-6 text-sm text-gray-700 mb-4">
            <span>🌍 Origin: {product.origins?.country}</span>
            <span>🍃 Organic</span>
            <span>🌱 Vegan</span>
          </div>

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

          {/* Quantity */}
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

      {/* Related products */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">You may also like</h2>
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
