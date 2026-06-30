import { useQuery } from "@tanstack/react-query"
import { employeeApi } from "../service"

export const useGetEmployee = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: () => employeeApi.getEmployee(),
    staleTime: 1000 * 6 * 5,
  })
}