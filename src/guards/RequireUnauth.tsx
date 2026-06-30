import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

export function RequireUnauth() {
  const { user } = useAuthStore()
  const isAuthed = useAuthStore((state) => !!state.token)

  if (user?.role === "admin") {
    return <Navigate to={"/admin"} replace />
  }

  if (user?.role === "employee") {
    return <Navigate to={"/attendance"} replace />
  }

  if (isAuthed) {
    return <Navigate to={"/"} replace />
  }

  return <Outlet />
}
