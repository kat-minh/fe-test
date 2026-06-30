import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export function useEmmployeeDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      if (!id) return null
      const response = await api.get(`/employees/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}
