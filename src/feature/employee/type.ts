export interface Employee {
  id: string
  name: string
  email: string
  position: string
  department: string
  status: string
  createdAt: string
}

export interface EmployeeRequest {
  name: string
  email: string
  position: string
  department: string
  status: string
}

export interface EmployeeResponse {
  id: string
  name: string
  email: string
  position: string
  department: string
  status: "active" | "inactive" | string
  createdAt: string
}
