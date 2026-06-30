import { useQuery } from "@tanstack/react-query"
import { employeeService } from "../services"

export const useGetEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeService.getEmployee(id),
  })
}
