import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.joinfabfour.org/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const access = localStorage.getItem("fab4_access");
    if (access) config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});