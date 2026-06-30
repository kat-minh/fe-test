import { api } from "@/lib/axios"

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials)
    return data
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout")
  },

  async getUser(): Promise<User> {
    const { data } = await api.get<User>("/auth/me")
    return data
  },
}
