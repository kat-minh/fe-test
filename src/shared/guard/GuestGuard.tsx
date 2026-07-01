import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

const GuestGuard = () => {
  const user = useAuthStore((state) => state.user)
  if (user?.role === "admin" || user?.role === "employee") {
    if (user?.role === "admin") return <Navigate to={"/admin"} replace />
    else return <Navigate to={"/attendance"} replace />
  }
  return <Outlet />
}

export default GuestGuard
