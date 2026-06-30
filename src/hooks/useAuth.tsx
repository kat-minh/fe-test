import { authApi, LoginRequest, LoginResponse } from "@/store/api/auth.api"
import { useAuthStore } from "@/store/auth-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setToken)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data: LoginResponse) => {
      console.log("Dữ liệu server trả về: ", data)

      setAuth(data.token, data.user)
      if (data.user.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/attendance")
      }
    },
    onError: (error: any) => {
      console.error("Đăng nhập thất bại:", error)
    },
  })
}

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: () => {
      logout()
      queryClient.clear()
      navigate("/login")
    },

    onError: () => {
      logout()
      queryClient.clear()
      navigate("/login")
    },
  })
}
