import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

interface allowRole {
  allowRole: "admin" | "employee"
}
const GuestGuard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  if (user?.role === "admin" || user?.role === "employee") {
    if (user?.role === "admin") return <Navigate to={"/admin"} replace />
    else return <Navigate to={"/attendance"} replace />
  }
  return <Outlet />
}

export default GuestGuard
