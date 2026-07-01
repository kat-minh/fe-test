import { apiClient } from "@/lib/apiClient"
import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

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
      toast.success("Login successfull !")
      if(res.user.role === "admin"){
        navigate("/admin", {replace: true})
      } else {
        navigate("/attendance", {replace: true})
      }
    },
    onError: (error: any) => {
      // alert(error.response?.data.message || "Logout failed !")
      toast.error(error.response?.data.message || "Logout failed !")
    },
  })
}

export default useLogin
