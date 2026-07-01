export interface IEmployee {
  id: string
  name: string
  email: string
  position: string
  department: string
  status: "active" | "on_leave" | "inactive"
}
