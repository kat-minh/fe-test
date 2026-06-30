import { api } from "@/lib/axios"
import { LoginRequest, LoginResponse } from "./types"

export const authService = {
  async login(body: LoginRequest): Promise<LoginResponse> {
    const data = await api.post(`/auth/login`, body)
    return data as unknown as Promise<LoginResponse>
  },
  async logout() {
    return await api.post(`/auth/logout`)
  },
}
