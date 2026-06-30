import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

interface Props {
  allowedRoles: string[]
}

export function RequireRole({ allowedRoles }: Props) {
  const { user } = useAuthStore()
  if (!user) {
    return <Navigate to={"/login"} replace />
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to={"/admin"} replace />
    }
    if (user.role === "employee") {
      return <Navigate to={"/attendance"} replace />
    }
  }
  return <Outlet />
}
