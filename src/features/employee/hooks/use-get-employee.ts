import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { employeeService } from "../services"

export const useGetEmployee = () => {
  const id = useParams()
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeService.getEmployee(id),
  })
}
