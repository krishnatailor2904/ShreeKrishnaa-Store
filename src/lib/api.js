import axios from "axios";

export const API_BASE = (
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

api.interceptors.request.use((config) => {
  const tokens = localStorage.getItem("sk_tokens");

  if (tokens) {
    try {
      const { access } = JSON.parse(tokens);

      if (access) {
        config.headers.Authorization = `Bearer ${access}`;
      }
    } catch (error) {
      console.error("Invalid token data:", error);
    }
  }

  return config;
});

export default api;