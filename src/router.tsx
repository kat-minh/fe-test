import { createBrowserRouter } from "react-router-dom"

import { HomePage } from "@/pages/home-page"
import LoginPage from "./pages/LoginPage"
import Attendance from "./pages/Attendance"
import { AuthGuard } from "./components/guards/Auth"
import AdminPage from "./pages/AdminPage"
import { GuestGuard } from "./components/guards/UnAuth"
import EmployeeDetailPage from "./pages/EmployeeDetailPage"
import EmployeeCreatePage from "./pages/EmployeeCreatePage"

/**
 * App router — React Router v7 data API (`createBrowserRouter`).
 *
 * Add your own routes to the array, e.g.:
 *   { path: "/login", element: <LoginPage /> },
 *   { path: "/users", element: <UsersPage /> },
 *   { path: "/users/:id", element: <UserDetailPage /> },
 *
 * Wrap protected pages in a layout/guard route with `children` when you need
 * auth, and use loaders if you want route-level data fetching.
 */
export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    element: <GuestGuard />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },

  {
    element: <AuthGuard allowedRole="employee" />,
    children: [{ path: "/attendance", element: <Attendance /> }],
  },

  {
    element: <AuthGuard allowedRole="admin" />,
    children: [
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/employees/create", element: <EmployeeCreatePage /> },
      { path: "/admin/employees/:id", element: <EmployeeDetailPage /> },
    ],
  },
])
