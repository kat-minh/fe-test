import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

export function GuestRoute() {
  const { token, user } = useAuthStore()
  const hasLoggedIn = token && user

  if (hasLoggedIn) {
    const targetPath = user.role === "admin" ? "/admin" : "/attendance"
    return <Navigate to={targetPath} replace />
  }

  return <Outlet />
}

export interface ProtectedRouteProps {
  allowedRoles: Array<"admin" | "employee">
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { token, user } = useAuthStore()
  const hasLoggedIn = token && user

  if (!hasLoggedIn) {
    return <Navigate to="/login" />
  }

  if (hasLoggedIn && !allowedRoles.includes(user.role)) {
    const targetPath = user.role === "admin" ? "/admin" : "/attendance"
    return <Navigate to={targetPath} replace />
  }

  return <Outlet />
}
