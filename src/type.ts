export type Role = "admin" | "employee"

//=== User
export interface User {
  id: string,
  email: string,
  name: string,
  role: Role
}

export interface AuthAction {
  setToken: (token: string | null, user: User) => void
  clearToken: () => void
}

export interface AuthState {
  token: string | null
  user: User | null
}


//đầu vào 
export interface loginSchema {
  email: string,
  password: string
}

//đầu ra
export interface AuthResponse {
  token: string,
  user: User
}