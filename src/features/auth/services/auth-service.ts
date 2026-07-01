import { api } from "@/lib/axios"
import { IAuthResponse } from "../types"
import { LoginFormInputs } from "../schemas/auth-schema"

export const authService = {
  login: async (userCredentials: LoginFormInputs): Promise<IAuthResponse> => {
    return api.post("/auth/login", userCredentials)
  },

  logout: async () => {
    return api.post("/auth/logout")
  },
}
