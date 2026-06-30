import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { employeeService } from "../services"
import { EmployeeRequest } from "../types"

export const useAddEmployee = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (body: EmployeeRequest) => employeeService.createEmployee(body),
    onSuccess: () => {
      console.log("Them thanh cong")
      navigate("/admin")
    },
  })
}
