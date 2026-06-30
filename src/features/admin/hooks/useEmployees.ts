import { apiClient } from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"

export const useEmployees = (search?: string) => {
  return useQuery({
    queryKey: ["employees"] as const,
    queryFn: () => apiClient.getListEmployee(),
    staleTime: 300_000,
  })
}
