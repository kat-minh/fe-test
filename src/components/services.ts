import { api } from "@/lib/axios"
import {
  AuthRespone,
  AuthResquest,
  EmployeeCreateRequest,
  EmployeeRespone,
} from "./types"

export const apiClient = {
  async login(body: AuthResquest): Promise<AuthRespone> {
    return (await api.post(
      "/auth/login",
      body,
    )) as unknown as Promise<AuthRespone>
  },

  async logout(): Promise<{}> {
    return (await api.post("/auth/logout", {})) as unknown as Promise<{}>
  },

  async getEmployees(): Promise<EmployeeRespone[]> {
    const response = await api.get("/employees")
    return response.data
  },

  async getEmpById(id: string): Promise<EmployeeRespone> {
    const response = await api.get(`/employees/${id}`)
    return response.data
  },

  async createEmployee(body: EmployeeCreateRequest): Promise<EmployeeRespone> {
    const response = await api.post("/employees", body)
    return response.data
  },
}
