import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_TASKS;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const getAllTasks = async () => {
  const res = await axios.get(`${API_URL}`, getAuthHeaders());
  return res.data;
};

// Get tasks with title filter
export const getTasksByTitle = async (title) => {
  const res = await axios.get(`${API_URL}/task?title=${encodeURIComponent(title)}`, getAuthHeaders());
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return res.data;
};

export const createTask = async (title, completed = false) => {
  const res = await axios.post(`${API_URL}`, { title, completed }, getAuthHeaders());
  return res.data;
};

export const updateTask = async (id, title, completed) => {
  const res = await axios.put(`${API_URL}/${id}`, { title, completed }, getAuthHeaders());
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return res.data;
};


export const getTaskStats = async () => {
  const res = await axios.get(`${API_URL}/stats`, getAuthHeaders());
  return res.data;
};
