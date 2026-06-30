import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { employeeService } from "../services/employee-service"
import { useNavigate } from "react-router-dom"

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: employeeService.getAll,
  })
}

export function useEmployeeById(id?: string) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeService.getById(id!),
    enabled: !!id,
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: employeeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      navigate("/admin")
    },
  })
}
