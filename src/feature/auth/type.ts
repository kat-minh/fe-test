import { UserRole } from "@/types"

export interface AuthResponse {
  accessToken: string
  role: UserRole
}

export interface LoginRequest {
  email: string
  password: string
}

export interface getMeResponse {
  user: {
    id: string
    email: string
    name: string
    role: UserRole
  }
}
