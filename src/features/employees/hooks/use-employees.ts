import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { employeeApi } from "../services/employee-service"
import { useNavigate } from "react-router-dom"

export function useEmployeeList() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: employeeApi.fetchAll,
  })
}

export function useEmployeeDetail(id?: string) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeApi.fetchById(id!),
    enabled: !!id,
  })
}

export function useAddEmployee() {
  const queryClient = useQueryClient()
  const goTo = useNavigate()

  return useMutation({
    mutationFn: employeeApi.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      goTo("/admin")
    },
  })
}
