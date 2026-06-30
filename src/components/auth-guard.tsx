import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

export function GuestRoute() {
  const { token, user } = useAuthStore()
  const isAuthenticated = token && user

  if (isAuthenticated) {
    const path = user.role === "admin" ? "/admin" : "/attendance"
    return <Navigate to={path} replace />
  }

  return <Outlet />
}

export interface ProtectedRouteProps {
  allowedRoles: Array<"admin" | "employee">
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { token, user } = useAuthStore()
  const isAuthenticated = token && user

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (isAuthenticated && !allowedRoles.includes(user.role)) {
    const path = user.role === "admin" ? "/admin" : "/attendance"
    return <Navigate to={path} replace />
  }

  return <Outlet />
}
