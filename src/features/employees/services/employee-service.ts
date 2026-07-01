import { api } from "@/lib/axios"
import { IEmployee } from "../types"
import { EmployeeFormInputs } from "../schemas/employee-schema"

export const employeeApi = {
  fetchAll: async (): Promise<IEmployee[]> => {
    return api.get("/employees")
  },

  fetchById: async (id: string | null): Promise<IEmployee> => {
    return api.get(`/employees/${id}`)
  },

  createNew: async (data: EmployeeFormInputs): Promise<IEmployee> => {
    return api.post("/employees", data)
  },
}
