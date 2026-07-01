import { apiClient } from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"

const useEmployeeList = (search?: string) => {
  return useQuery({
    queryKey: ["employees"] as const,
    queryFn: () => apiClient.getListEmployee(search),
    staleTime: 300_000,
  })
}

export default useEmployeeList
