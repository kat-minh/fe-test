import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

export default function RequiredEmployee() {
  const role = useAuthStore.getState().role
  if (role != "employee") {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
