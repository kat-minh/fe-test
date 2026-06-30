import { QueryClient, useQuery } from "@tanstack/react-query"
import { adminApi } from "../service"

export const useEmployee = (id?: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => adminApi.getEmployeeById(id!),
    staleTime: 1000 * 60 * 1,
  })
}