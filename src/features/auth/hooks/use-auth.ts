import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services/auth-service"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"

export function useLogin() {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)
  return useMutation({
    mutationFn: authService.login,

    onSuccess: (data) => {
      setToken(data.token, data.user)
      if (data.user.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/attendance")
      }
      console.log("Đăng nhập thành công chúc mừng bạn đã đăng nhập")
    },

    onError: (error: any) => {
      console.log("Đăng nhập thất bại rồi xem lỗi ở đây nè " + error)
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const logout = useAuthStore.getState().logout

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout()
      queryClient.clear()
      navigate("/login")
      console.log(
        "Đăng xuất thành công. Bạn cần đăng nhập lại để thao tác tiếp",
      )
    },
    onError: () => {
      logout()
      queryClient.clear()
      navigate("/login")
      console.error(
        "Đăng xuất thất bại rồi bạn cần xem lại mạng và chờ server phản hồi sau",
      )
    },
  })
}
