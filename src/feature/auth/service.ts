import { api } from "@/lib/axios";
import { AuthResponse, loginSchema } from "@/type";


export const authApi = {

  async login(cre: loginSchema): Promise<AuthResponse> {
    return api.post("/auth/login", cre) as unknown as Promise<AuthResponse>
  },

  async logout(): Promise<void> {
    return await api.post("/auth/logout")
  }
}