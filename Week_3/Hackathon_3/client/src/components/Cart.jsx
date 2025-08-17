import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeFromCart } from "../api/cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    async function fetchCart() {
      try {
        const data = await getCart();
        setCart(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCart();
  }, [navigate]);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity <= 0) return; // prevent invalid quantities
    const updated = await updateCartItem(itemId, quantity);
    setCart(updated);
  };

  const handleRemove = async (itemId) => {
    const updated = await removeFromCart(itemId);
    setCart(updated);
  };

  if (!cart || cart.items.length === 0) {
    return <p className="p-6 text-gray-600">Your cart is empty.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.items.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between bg-white shadow rounded-lg p-4 mb-3"
        >
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-gray-500">
              ${item.priceAtAddition} x {item.quantity}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
            <button
              onClick={() => handleRemove(item._id)}
              className="ml-4 text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <p className="mt-4 font-bold">
        Total: $
        {cart.items
          .reduce((sum, item) => sum + item.priceAtAddition * item.quantity, 0)
          .toFixed(2)}
      </p>
    </div>
  );
}
