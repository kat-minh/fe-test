import { api } from "@/lib/axios"
import { AuthRespone, AuthResquest, EmployeeRespone } from "./types"

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
  async getEmpById(id: string): Promise<EmployeeRespone> {
    return (await api.get(
      "/employees",
      id,
    )) as unknown as Promise<EmployeeRespone>
  },
}
