import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_PRODUCTS;


export const getAllProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const res = await axios.get(
    `${API_URL}${queryParams ? `?${queryParams}` : ""}`
  );
  return res.data;
};


export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const getFilterOptions = async () => {
  const res = await axios.get(`${API_URL}/filter-options`);
  return res.data;
};
