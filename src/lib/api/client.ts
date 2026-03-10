import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.joinfabfour.org",
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

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // If we're not in the browser, just reject
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    const status = error?.response?.status;

    //  backend returns 402 for unauthorized (and sometimes you may also get 401/403)
    if (status === 401 || status === 402 || status === 403) {
      // Clear tokens so RequireAuth won't allow staying on protected pages
      // localStorage.removeItem("fab4_access");
      // localStorage.removeItem("fab4_refresh");
      // localStorage.removeItem("fab4_user");

      // Avoid infinite loop if you're already on login
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);