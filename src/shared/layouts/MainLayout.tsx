import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import useLogout from "@/features/auth/hooks/useLogout"
import { useAuthStore } from "@/store/auth-store"
import { Link, Outlet, useNavigate } from "react-router-dom"

const MainLayout = () => {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <>
      <div className="flex justify-between p-5">
        <CardContent className="">
          <Link to={"/"}>CODELATBUG</Link>
        </CardContent>
        <CardContent>
          <Link to={"/"} className="px-5">
            Home
          </Link>
          {token && user?.role === "admin" && (
            <Link to={"/admin"} className="px-5">
              List
            </Link>
          )}

          {token && user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </CardContent>
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout
