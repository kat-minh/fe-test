import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

const RoleGuard = ({ allowRole }: { allowRole: "admin" | "employee" }) => {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  if (!token) {
    return <Navigate to={"/login"} replace />
  }
  if (user?.role !== allowRole) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin" : "/attendance"}
        replace
      />
    )
  }
  return <Outlet />
}
export default RoleGuard
