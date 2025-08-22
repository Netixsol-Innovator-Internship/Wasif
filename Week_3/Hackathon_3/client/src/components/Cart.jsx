import { Link, useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useGetAllProductsQuery,
} from "../redux/apiSlice";

import Visa from "../../public/assets/Visa.png";
import MasterCard1 from "../../public/assets/maestro-dark-large.png";
import MasterCard2 from "../../public/assets/mastercard-dark-large.png";
import MasterCard3 from "../../public/assets/Group 30.png";
import Group from "../../public/assets/Group 29.png";

export default function Cart() {
  const navigate = useNavigate();

  // 🔹 Cart
  const {
    data: cart,
    isLoading: cartLoading,
    error: cartError,
  } = useGetCartQuery();

  // 🔹 Related products (fetch all, pick first 3)
  const { data: allProducts = [] } = useGetAllProductsQuery({});
  const related = allProducts.slice(0, 3);

  // 🔹 Mutations
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  // 🔹 Auth check
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return null;
  }

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity <= 0) return;
    try {
      await updateCartItem({ itemId, quantity }).unwrap();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart({ itemId }).unwrap();
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  if (cartLoading) return <p className="p-6 text-gray-600">Loading cart...</p>;
  if (cartError) return <p className="p-6 text-red-500">Failed to load cart.</p>;

  if (!cart || cart.items.length === 0) {
    return <p className="p-6 text-gray-600">Your cart is empty.</p>;
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.priceAtAddition * item.quantity,
    0
  );
  const delivery = 3.95;
  const total = subtotal + delivery;

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Cart Items */}
        <div>
          <h2 className="text-lg font-bold border-b pb-2 mb-4">1. MY BAG</h2>
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image?.url }
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-gray-500">€{item.priceAtAddition}</p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-sm text-red-500 mt-1"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity - 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-6 font-semibold">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 border px-6 py-2 rounded hover:bg-gray-100"
          >
            BACK TO SHOPPING
          </button>
        </div>

        {/* Right Column: Order Summary */}
        <div>
          <h2 className="text-lg font-bold border-b pb-2 mb-4">
            2. REVIEW & PAYMENT
          </h2>

          <div className="bg-gray-50 rounded-lg p-6 shadow">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery</span>
              <span>€{delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Estimated shipping time: 2 days
            </p>
            <button className="w-full mt-4 bg-black text-white py-2 rounded">
              CHECK OUT
            </button>
          </div>

          {/* Payment Options */}
          <div className="bg-gray-50 rounded-lg p-8 shadow mt-6">
            <h3 className="font-semibold mb-3">Payment type</h3>
            <div className="flex justify-between">
              <img src={Visa} alt="Visa" className="h-6" />
              <img src={MasterCard1} alt="MasterCard" className="h-6" />
              <img src={MasterCard2} alt="MasterCard" className="h-6" />
              <img src={MasterCard3} alt="MasterCard" className="h-6" />
              <img src={Group} alt="Other" className="h-6" />
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 rounded-lg p-6 shadow mt-6">
            <h3 className="font-semibold mb-3">Delivery and Retour</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>Order before 12:00 and we will ship the same day.</li>
              <li>Orders made after Friday 12:00 are processed on Monday.</li>
              <li>To return your articles, please contact us first.</li>
              <li>Postal charges for retour are not reimbursed.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-20 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Popular This Season
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
    </>
  );
}
