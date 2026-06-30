import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useLogout from "@/features/auth/hooks/useLogout"
import { useAuthStore } from "@/store/auth-store"
import { Link, Outlet } from "react-router-dom"

const MainLayout = () => {
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
          {token && user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </CardContent>
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout
