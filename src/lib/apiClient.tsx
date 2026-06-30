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

export const apiClient = {
  async login(userData: {
    email: string
    password: string
  }): Promise<AuthLogin> {
    const res = await api.post("/auth/login", userData)
    console.log(res.data.data)
    return res.data
  },
  async logout(): Promise<void> {
    await api.post("/auth/logout")
  },

  async getListEmployee(): Promise<Employee[] | null> {
    const res = await api.get("/employees")

    return res.data
  },
}
