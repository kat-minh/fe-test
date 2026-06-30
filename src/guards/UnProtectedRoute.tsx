import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

function UnProtectedRoute() {
  const token = useAuthStore((s) => !!s.token)
  const role = useAuthStore((s) => s.user?.role)

  if (!token) {
    return <Outlet />
  }

  if (role === "employee") {
    return <Navigate to="/attendance" replace />
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />
  }
}

export default UnProtectedRoute
