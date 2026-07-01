import { apiClient } from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => apiClient.getEmployeeById(id),
    enabled: !!id,
  })
}
