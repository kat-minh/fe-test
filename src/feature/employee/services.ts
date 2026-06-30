// src/feature/employee/services.ts
import { Employee, EmployeeRequest } from "./type"
import axios from "@/lib/axios"

export const employeeApi = {
  async getEmployees(search?: string): Promise<Employee[]> {
    return axios.get("/employees", { params: { search } })
  },

  async getEmployeeById(id: string): Promise<Employee> {
    return axios.get(`/employees/${id}`)
  },

  async createEmployee(data: EmployeeRequest): Promise<Employee> {
    return axios.post("/employees", data)
  },
}
