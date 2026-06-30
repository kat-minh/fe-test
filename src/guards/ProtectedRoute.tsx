import { useAuthStore } from "@/store/auth-store"
import { Role } from "@/type"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute({ userRole }: { userRole: Role[] }) {
  const token = useAuthStore((s) => s.token)
  const role = useAuthStore((s) => s.user?.role)

  if (!token || !role) {
    return <Navigate to="/login" replace />
  }

  if (userRole.includes(role)) {
    console.log("hello")

    return <Outlet />
  }

  if (role === "employee") {
    return <Navigate to="/attendance" replace />
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />
  }
}

export default ProtectedRoute
