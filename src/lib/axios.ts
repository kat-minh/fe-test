import { useAuthStore } from "@/store/auth-store"
import axios from "axios"

/**
 * Shared axios instance.
 *
 * `baseURL` comes from VITE_API_BASE_URL (see .env.example). It falls back to the
 * bundled reference backend on http://localhost:4000 so a fresh clone just works.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor — attach auth token, etc.
api.interceptors.request.use(
  (config) => {

    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error) => Promise.reject(error)
)

// Response interceptor — unwrap data / handle errors globally.
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Centralize error handling here (toast, logout on 401, etc.).
    return Promise.reject(error)
  },
)
