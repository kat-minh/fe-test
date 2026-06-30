import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/feature/auth/hooks/useAuth"
import { NavLink, Outlet } from "react-router-dom"

function AdminLayout() {
  const handleLogout = useLogoutMutation()

  const logout = () => {
    handleLogout.mutate()
  }
  return (
    <>
      <div>AdminLayout</div>

      <div className="flex gap-2">
        <NavLink to="/admin" replace>
          <Button>Home</Button>
        </NavLink>

        <Button onClick={() => logout()}>Logout</Button>

        <NavLink to="employees/create" replace>
          <Button>Create</Button>
        </NavLink>
      </div>

      <Outlet />
    </>
  )
}

export default AdminLayout
