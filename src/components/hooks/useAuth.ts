import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
      setTokens(res.data.token, res.data.user.role)
      console.log(res.data.token)

      if (res.data.user.role === "admin") navigate("/admin")
      if (res.data.user.role === "employee") navigate("/attendance")
    },
    onError: (error) => {
      console.log(error)

      //  alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.")
    },
  })
}
export const useLogoutMutation = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  return useMutation({
    mutationFn: () => apiClient.logout(),
    onSuccess: (res) => {
      logout()
      navigate("/")
    },
    onError: () => {
      console.log("LOI nma van xoa ae")
      logout()
      navigate("/")
    },
  })
}

export const useEmployeesQuery = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: apiClient.getEmployees,
  })
}

export const useEmployeeDetailQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => apiClient.getEmpById(id as string),
    enabled: !!id
  })
}

export const useCreateEmployeeMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: apiClient.createEmployee,
    onSuccess: () => {
      alert("Tạo nhân viên thành công!")
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      navigate("/admin")
    },
    onError: () => {
      alert("Tạo nhân viên thất bại. Vui lòng thử lại.")
    },
  })
}
