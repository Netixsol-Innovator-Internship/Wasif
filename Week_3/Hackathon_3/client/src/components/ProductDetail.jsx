import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { addToCart } from "../api/cart";

export default function ProductDetail() {
  const { id } = useParams();
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
    try {
      await addToCart(product._id, 1);
      alert("Product added to cart!");
    } catch (err) {
      alert("Please login to add to cart.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {product.image && (
        <img src={product.image.url} alt={product.name} className="w-full h-80 object-cover rounded-xl mb-6" />
      )}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-lg font-semibold text-green-600 mb-4">
        ${product.price?.amount?.toFixed(2)}
      </p>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
