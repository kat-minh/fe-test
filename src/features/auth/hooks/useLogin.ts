import { apiClient } from "@/lib/apiClient"
import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"

const useLogin = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (userData: { email: string; password: string }) =>
      apiClient.login(userData),
    onSuccess: (res) => {
      setToken(res.token)
      setUser(res.user)
      alert("Login successful !")
      const redirect = location.state?.from.pathname
      navigate(redirect || "/", { replace: true })
    },
    onError: (error: any) => {
      alert(error.response?.data.message || "Login failed !")
    },
  })
}

export default useLogin
