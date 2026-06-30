export type UserRole = "admin" | "employee"

export interface RequireAuthProps {
  allowedRoles: UserRole[]
}
