import { useMutation } from "@tanstack/react-query"
import { AuthResquest } from "../types"
import { apiClient } from "../services"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"

export const useLoginMutation = () => {
  const navigate = useNavigate()
  const setTokens = useAuthStore((state) => state.setToken)
  return useMutation({
    mutationFn: (body: AuthResquest) => apiClient.login(body),
    onSuccess: (res) => {
      console.log(res)
      console.log("hi")
      setTokens(res.data.acessToken, res.data.user.role)
      console.log("thanh cong ae")
      if (res.data.user.role == "admin") {
        navigate("/admin")
      }
      if (res.data.user.role == "employee") {
        navigate("/attendance")
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })
}
export const useLogoutMutation = () => {
  const navigate = useNavigate()
  const setTokens = useAuthStore((state) => state.setToken)
  return useMutation({
    mutationFn: () => apiClient.logout(),
    onSuccess: (res) => {
      console.log(res)
      console.log("hi")
      console.log("thanh cong ae")
      setTokens(null, null)
      navigate("/")
    },
    onError: (error) => {
      console.log("LOI nma van xoa ae")
      setTokens(null, null)
      navigate("/")
    },
  })
}
export const useGetEmpMutation = () => {
  const navigate = useNavigate()
  return useMutation({})
}
