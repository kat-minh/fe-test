import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export function RequireAuth() {
  const isAuthed = useAuthStore((state) => !!state.token)
  const location = useLocation()

  if (!isAuthed) {
    return <Navigate to={"/login"} state={{ from: location }} replace />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
