import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/feature/auth/hooks/useAuth"
import { useAuthStore } from "@/store/auth-store"
import { NavLink, Outlet } from "react-router-dom"

function UserLayout() {
  const token = useAuthStore((s) => s.token)

  const handleLogout = useLogoutMutation()

  const logout = () => {
    handleLogout.mutate()
  }
  return (
    <>
      <div>UserLayout</div>

      <div className="flex gap-2">
        <NavLink to="/" replace>
          <Button>Home</Button>
        </NavLink>
        {token ? (
          <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <NavLink to="/login" replace>
            <Button>Login</Button>
          </NavLink>
        )}
        <NavLink to="/attendance" replace>
          <Button>Attendance</Button>
        </NavLink>
      </div>

      <Outlet />
    </>
  )
}

export default UserLayout
