import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse } from "./types";

export const authService = {
    login: async(data: LoginRequest) : Promise<LoginResponse> => {
        const response = await api.post("auth/login", data)
        return response.data
    },
    logout: async() => {
        const response = await api.post("auth/logout")
        return response.data
    }
}