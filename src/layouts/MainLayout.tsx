import { useLogout } from "@/hooks/useAuth"
import { useAuthStore } from "@/store/auth-store"
import { Outlet, Link } from "react-router-dom"

export function MainLayout() {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h1 className="text-lg font-bold">Logo</h1>
        </div>
        {user?.role === "admin" && (
          <div className="flex gap-2">
            <Link to="/admin">
              <button className="px-3 py-1.5 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-100">
                Danh sách nhân viên
              </button>
            </Link>
            <Link to="/admin/employees/create">
              <button className="px-3 py-1.5 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-100">
                Tạo nhân viên
              </button>
            </Link>
          </div>
        )}
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-100"
            >
              {logoutMutation.isPending ? "Đang đăng xuất..." : "Đăng xuất"}
            </button>
          ) : (
            <></>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
