import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

export const AuthGuard = ({
  allowedRole,
}: {
  allowedRole: "admin" | "employee"
}) => {
  const token = useAuthStore((state) => state.token)
  const role = useAuthStore((state) => state.role)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role !== allowedRole) {
    return <Navigate to={role === "admin" ? "/admin" : "/attendance"} replace />
  }

  return <Outlet />
}
