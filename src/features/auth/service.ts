import { api } from "@/lib/axios"
import { LoginRequest, LoginResponse } from "./types"

export const authService = {
  login(body: LoginRequest): Promise<LoginResponse> {
    const data = api.post(`/auth/login`, body)
    return data as unknown as Promise<LoginResponse>
  },
  logout() {
    const data = api.post(`/auth/login`)
    return data
  },
}
