import { employeeApi, CreateEmployeeInput } from "@/store/api/employee.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function useCreateEmployee() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (newEmployee: CreateEmployeeInput) =>
      employeeApi.createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      toast.success("Tạo mới nhân viên thành công")
      navigate("/admin")
    },
  })
}
