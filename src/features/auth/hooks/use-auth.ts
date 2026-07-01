import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services/auth-service"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"

export function useUserLogin() {
  const goTo = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)
  return useMutation({
    mutationFn: authService.login,

    onSuccess: (responsePayload) => {
      setToken(responsePayload.token, responsePayload.user)
      if (responsePayload.user.role === "admin") {
        goTo("/admin")
      } else {
        goTo("/attendance")
      }
      console.log("Đăng nhập thành công chúc mừng bạn đã đăng nhập")
    },

    onError: (authError: any) => {
      console.log("Đăng nhập thất bại rồi xem lỗi ở đây nè " + authError)
    },
  })
}

export function useUserLogout() {
  const goTo = useNavigate()
  const queryClient = useQueryClient()
  const logout = useAuthStore.getState().logout

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout()
      queryClient.clear()
      goTo("/login")
      console.log(
        "Đăng xuất thành công. Bạn cần đăng nhập lại để thao tác tiếp",
      )
    },
    onError: () => {
      logout()
      queryClient.clear()
      goTo("/login")
      console.error(
        "Đăng xuất thất bại rồi bạn cần xem lại mạng và chờ server phản hồi sau",
      )
    },
  })
}
