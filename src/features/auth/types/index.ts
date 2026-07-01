export interface IUser {
  id: string
  email: string
  name: string
  role: "admin" | "employee"
}

export interface IAuthResponse {
  token: string
  user: IUser
}
