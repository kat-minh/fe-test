import axios from "@/lib/axios"
import { AuthResponse, getMeResponse } from "./type"

export const authApi = {
  async logout(): Promise<void> {
    return axios.post("/auth/logout")
  },

  async login(data: {
    email: string
    password: string
  }): Promise<AuthResponse> {
    return axios.post("/auth/login", data)
  },

  async getMe(): Promise<getMeResponse> {
    return axios.get("/auth/me")
  },
}
