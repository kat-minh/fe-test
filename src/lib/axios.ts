import axios from "axios"
import { env } from "./env"
import { toast } from "sonner"
import { useAuthStore } from "@/feature/auth/store"

const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth()
      toast.error("Access token hết hạn")
      window.location.href = "/login"
      return Promise.reject(error)
    }
    const message = error.response?.data?.message || error.message
    const isLogoutEndpoint = error.config?.url?.includes("/auth/logout")

    if (!isLogoutEndpoint) {
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default apiClient
