import { api } from "@/lib/axios"
import { Employee } from "../types"
import { EmployeeFormFields } from "../schemas/employee-schema"

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    return api.get("/employees")
  },

  getById: async (id: string | null): Promise<Employee> => {
    return api.get(`/employees/${id}`)
  },

  create: async (data: EmployeeFormFields): Promise<Employee> => {
    return api.post("/employees", data)
  },
}
