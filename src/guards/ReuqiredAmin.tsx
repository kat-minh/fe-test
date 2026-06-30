import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

export default function RequiredAdmin() {
  const role = useAuthStore.getState().role
  if (role != "admin") {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
