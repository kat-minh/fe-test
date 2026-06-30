import { apiClient } from "@/lib/apiClient"
import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"

const useLogout = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: () => {
      return apiClient.logout()
    },
    onSuccess: () => {
      logout()
      alert("Logout successful!")
      navigate("/", { replace: true })
    },
    onError: (error: any) => {
      alert(error.response?.data.message || "Logout failed !")
    },
  })
}

export default useLogout
