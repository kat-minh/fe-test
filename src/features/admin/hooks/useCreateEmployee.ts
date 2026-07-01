import { apiClient } from "@/lib/apiClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const useCreateEmployee = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data) => apiClient.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      toast.success("Create employee successfull !")
      navigate("/admin")
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || "Create failed !")
    },
  })
}

export default useCreateEmployee
