import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

export const GuestGuard = () => {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const role = useAuthStore((state) => state.role)
  if (token) {
    if (role === "admin") {
      navigate("/admin")
    }
    if (role === "employee") {
      navigate("/attendance")
    }
  }
  return <Outlet />
}
