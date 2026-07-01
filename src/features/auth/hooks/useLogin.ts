import { apiClient } from "@/lib/apiClient"
import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const useLogin = () => {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (userData: { email: string; password: string }) =>
      apiClient.login(userData),
    onSuccess: (res) => {
      setToken(res.token)
      setUser(res.user)
      toast.success("Login successful!")
      if (res.user.role === "admin") {
        navigate("/admin", {replace: true})
      } else {
        navigate("/attendance", {replace: true})
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || "Login failed !")
    },
  })
}

export default useLogin
