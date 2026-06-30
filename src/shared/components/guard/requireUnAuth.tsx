import { useAuthStore } from "@/feature/auth/store"
import { UserRole } from "@/types"
import { Navigate, Outlet } from "react-router-dom"

const RequireUnAuth = () => {
  const isAuthed = useAuthStore((state) => !!state.accessToken)
  const role = useAuthStore((state) => state.role) as UserRole | null

  if (isAuthed) {
    if (role === "admin") return <Navigate to="/admin" replace />
    if (role === "employee") return <Navigate to="/attendance" replace />
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RequireUnAuth
