import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_CART;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get current user's cart
export const getCart = async () => {
  const res = await axios.get(`${API_URL}`, getAuthHeaders());
  return res.data;
};

// Add product to cart
export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post(
    `${API_URL}/add`,
    { productId, quantity },
    getAuthHeaders()
  );
  return res.data;
};

// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  const res = await axios.put(
    `${API_URL}/${itemId}`,
    { quantity },
    getAuthHeaders()
  );
  return res.data;
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
  const res = await axios.delete(`${API_URL}/${itemId}`, getAuthHeaders());
  return res.data;
};
