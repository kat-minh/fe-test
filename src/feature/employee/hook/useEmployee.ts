// src/feature/employee/hook/useEmployee.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { employeeApi } from "../services"
import { CreateEmployeeSchemaType } from "../schema"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { EmployeeRequest, EmployeeResponse } from "../type"

export const useEmployeesList = (search?: string) => {
  return useQuery({
    queryKey: ["employees", search],
    queryFn: () => employeeApi.getEmployees(search),
  })
}

export const useEmployeeDetail = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeApi.getEmployeeById(id),
  })
}

export const useCreateEmployeeMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<EmployeeResponse, Error, CreateEmployeeSchemaType>({
    mutationFn: (data: CreateEmployeeSchemaType) => {
      const payload: EmployeeRequest = {
        name: data.name,
        email: data.email,
        position: data.position,
        department: data.department,
        status: data.status,
      }
      return employeeApi.createEmployee(payload)
    },
    onSuccess: () => {
      toast.success("Tạo nhân viên thành công!")

      queryClient.invalidateQueries({ queryKey: ["employees"] })
      navigate("/admin")
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Tạo nhân viên thất bại")
    },
  })
}
