import axios from "axios"

/**
 * Shared axios instance.
 *
 * `baseURL` comes from VITE_API_BASE_URL (see .env.example). It is intentionally
 * left empty for now — point it at a real API when you have one.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor — attach auth token, etc.
api.interceptors.request.use((config) => {
  return config
})

// Response interceptor — unwrap data / handle errors globally.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralize error handling here (toast, logout on 401, etc.).
    return Promise.reject(error)
  },
)
