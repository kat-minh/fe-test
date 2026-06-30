import { Outlet, Link } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"
import { useLogout } from "@/features/auth/hooks/use-auth"
import { Button } from "../ui/button"

export function MainLayout() {
  const { token, user } = useAuthStore()
  const { mutate: handleLogout } = useLogout()
  const isAuthenticated = token && user

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="font-extrabold text-xl">Fe-test</div>
          <nav className="flex space-x-6 text-sm font-semibold">
            {isAuthenticated ? (
              <Button onClick={() => handleLogout()}>Logout</Button>
            ) : (
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
