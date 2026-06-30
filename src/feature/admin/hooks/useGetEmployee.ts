import { useQuery } from "@tanstack/react-query"
import { adminApi } from "../service"

export const useGetAllEmployee = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: adminApi.getEmployee,
    staleTime: 1000 * 6 * 5,
  })
}