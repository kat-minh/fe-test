import { api } from "@/lib/axios"
import { EmployeeRequest, EmployeeResponse } from "./types"

const BaseUrl = "/employees"
export const employeeService = {
  async getEmployees(): Promise<EmployeeResponse> {
    const data = await api.get(`${BaseUrl}`)
    return data as unknown as Promise<EmployeeResponse>
  },

  async getEmployee(id: string): Promise<EmployeeResponse> {
    const data = await api.get(`${BaseUrl}/${id}`)
    return data as unknown as Promise<EmployeeResponse>
  },

  async createEmployee(body: EmployeeRequest): Promise<EmployeeResponse> {
    const data = await api.post(`${BaseUrl}`, body)
    return data as unknown as Promise<EmployeeResponse>
  },
}
