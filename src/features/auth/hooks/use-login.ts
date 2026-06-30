import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService } from "../service"
import { LoginRequest } from "../types"

export const useLogin = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (body: LoginRequest) => authService.login(body),
    onSuccess: (response) => {
      console.log("Login thanh cong")
      useAuthStore.getState().setToken(response.token, response.user.role)
      const userRole = useAuthStore.getState().role
      if (userRole == "admin") {
        navigate("/admin")
      } else {
        navigate("/attendance")
      }
    },
  })
}
