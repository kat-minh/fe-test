import { employeeApi } from "@/store/api/employee.api"
import { useQuery } from "@tanstack/react-query"

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: employeeApi.getEmployees,
  })
}
