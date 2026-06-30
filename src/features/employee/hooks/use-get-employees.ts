import { useQuery } from "@tanstack/react-query"
import { employeeService } from "../services"

export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => employeeService.getEmployees(),
  })
}
