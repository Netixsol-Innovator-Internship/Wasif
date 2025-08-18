import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import { addToCart } from "../api/cart";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first!");
      navigate("/login");
      return;
    }

    try {
      await addToCart(product._id, 1);
      alert("Product added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add product to cart.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ====== TOP SECTION ====== */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        {product.image && (
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        )}

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold text-green-600 mb-6">
            ${product.price?.amount?.toFixed(2)}
          </p>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <button className="px-3 py-1 border rounded">-</button>
            <span>1</span>
            <button className="px-3 py-1 border rounded">+</button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ====== STEEPING + ABOUT SECTION ====== */}
      <div className="grid md:grid-cols-2 gap-8 mt-16 border-t pt-10">
        {/* Steeping Instructions */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Steeping instructions</h2>
          <ul className="space-y-4 text-gray-700">
            <li>🍵 <b>Serving Size:</b> 2 tsp per cup, 6 tsp per pot</li>
            <li>🔥 <b>Water Temperature:</b> 100°C</li>
            <li>⏳ <b>Steeping Time:</b> 3 - 5 minutes</li>
            <li>🎨 <b>Color after 3 minutes:</b> Deep Amber</li>
          </ul>
        </div>

        {/* About this tea */}
        <div>
          <h2 className="text-xl font-semibold mb-6">About this tea</h2>
          <div className="grid grid-cols-2 gap-y-3 text-gray-700 text-sm mb-4">
            <p><b>Flavor:</b> Spicy</p>
            <p><b>Qualities:</b> Smoothing</p>
            <p><b>Caffeine:</b> Medium</p>
            <p><b>Allergens:</b> Nuts-free</p>
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
        <h2 className="text-2xl font-semibold mb-6 text-center">You may also like</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Example static related products → Replace with API later */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="text-center">
              <img
                src="https://via.placeholder.com/200"
                alt="Related product"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-medium">Ceylon Ginger Cinnamon chai tea</h3>
              <p className="text-gray-600">€4.85 / 50 g</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
