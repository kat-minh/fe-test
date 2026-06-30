import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store"
import { AuthResponse, LoginRequest } from "../type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../service"
import { toast } from "sonner"

export const useLoginMutation = () => {
  const location = useLocation()

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/"

  const navigate = useNavigate()

  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res: any) => {
      setAuth({
        accessToken: res.token,
        role: res.user.role,
      })
      toast.success("Đăng nhập thành công")
      if (res.user.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/attendance")
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    },
  })
}

export const useLogoutMutation = () => {
  const navigate = useNavigate()
  const clearTokens = useAuthStore((state) => state.clearAuth)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return authApi.logout()
    },

    onSuccess: () => {
      clearTokens()
      queryClient.removeQueries()
      toast.success("Đăng xuất thành công")
      navigate("/login")
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Đăng xuất gặp sự cố, nhưng vẫn đăng xuất",
      )
      clearTokens()
      queryClient.removeQueries()
      console.log(error.response?.data?.message)
    },

    onSettled: () => {},
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],

    queryFn: authApi.getMe,
  })
}
