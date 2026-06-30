import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService } from "../service"

export const useLogout = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      console.log("Logout thanh cong")
      useAuthStore.getState().logout()
      navigate("/login")
    },
  })
}
