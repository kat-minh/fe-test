import { api } from "@/lib/axios"

export interface Employee {
  id: string
  name: string
  email: string
  position: string
  department: string
  status: string
  createAt: string
}

export interface CreateEmployeeInput {
  name: string
  email: string
  phone?: string
  position: string
  department: string
  status?: string
}

export const employeeApi = {
  getEmployees: async (): Promise<Employee[]> => {
    const response = await api.get<Employee[]>("/employees")
    return response.data
  },
  getEmployeeById: async (id: string): Promise<Employee> => {
    const response = await api.get<Employee>(`/employees/${id}`)
    return response.data
  },
  createEmployee: async (
    newEmployee: CreateEmployeeInput,
  ): Promise<Employee> => {
    const response = await api.post<Employee>("/employees", newEmployee)
    return response.data
  },
}
