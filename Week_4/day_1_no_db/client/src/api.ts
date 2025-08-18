import axios from "axios";
import type { Task } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://tsserver-chi.vercel.app";

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" }
});

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
};

export const createTask = async (title: string): Promise<Task> => {
  const { data } = await api.post<Task>("/tasks", { title });
  return data;
};

export const updateTask = async (id: string, patch: Partial<Task>): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${id}`, patch);
  return data;
};

export const deleteTask = async (id: string): Promise<Task> => {
  const { data } = await api.delete<Task>(`/tasks/${id}`);
  return data;
};
