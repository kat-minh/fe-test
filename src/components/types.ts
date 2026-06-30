export type Role = "admin" | "employee"

export interface User {
  id: string
  email: string
  name: string
  role: Role
}

export interface AuthRespone {
  acessToken: string
  user: User
}

export interface AuthResquest {
  email: string
  password: string
}

export interface EmployeeRespone {
  id: string
  name: string
  email: string
  position: string
  department: string
  status: string
  createdAt: string
}

export interface EmployeeCreateRequest {
  name: string
  email: string
  position: string
  department: string
  status: string
}
