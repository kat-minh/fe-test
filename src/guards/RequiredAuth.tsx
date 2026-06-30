import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

export default function RequiredAuth() {
  const token = useAuthStore.getState().token
  if (!token) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
