import { useQuery } from "@tanstack/react-query"
import { adminSerivce } from "../services"

export const useGetAllEmployees = () => {
    return useQuery({
        queryKey: ["employee"],
        queryFn: () => adminSerivce.getAllEmployees()
    })
}