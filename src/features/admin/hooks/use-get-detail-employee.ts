import { useQuery } from "@tanstack/react-query"
import { adminSerivce } from "../services"

export const useGetDetailEmployee = (id: string | undefined) => {

    return useQuery({
        queryKey: ["employees", id],
        queryFn: () => adminSerivce.getEmployeeDetail(id!)
    })
}