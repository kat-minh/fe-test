import { useAuthStore } from "@/feature/auth/store"
import { RequireAuthProps, UserRole } from "@/types"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const role = useAuthStore((state) => state.role) as UserRole | null
  const location = useLocation()

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    if (role === "admin") return <Navigate to="/admin" replace />
    if (role === "employee") return <Navigate to="/attendance" replace />

    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default RequireAuth
