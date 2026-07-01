import { AuthUser } from "@/store/auth-store"
import { api } from "./axios"

export interface AuthLogin {
  token: string
  user: AuthUser | string
}

export interface Employee {
  id: string
  name: string
  email: string
  position: string
  department: string
  status: "on_leave" | "active" | "inactive"
  createdAt: string
}

export interface CreateEmployee {
  name: string
  email: string
  position: string
  department: string
  status: "on_leave" | "active" | "inactive"
}

export const apiClient = {
  async login(userData: {
    email: string
    password: string
  }): Promise<AuthLogin> {
    const res = await api.post("/auth/login", userData)
    console.log(res.data)
    return res.data
  },
  async logout(): Promise<void> {
    await api.post("/auth/logout")
  },

  async getListEmployee(search?: string): Promise<Employee[]> {
    const res = await api.get("/employees", {
      params: search ? { search } : undefined,
    })
    return res.data
  },

  async getEmployeeById(id: string): Promise<Employee> {
    const res = await api.get(`/employees/${id}`)
    return res.data
  },

  async createEmployee(data: CreateEmployee): Promise<Employee> {
    const res = await api.post("/employees", data)
    return res.data
  },
}
