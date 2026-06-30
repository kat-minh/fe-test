import { createBrowserRouter } from "react-router-dom"

import AdminLayout from "./layouts/AdminLayout"
import ProtectedRoute from "./guards/ProtectedRoute"
import LoginPage from "./feature/auth/pages/LoginPage"
import UnProtectedRoute from "./guards/UnProtectedRoute"
import AttendancePage from "./feature/attendance/pages/AttendancePage"
import EmployeeCreatePage from "./feature/admin/pages/EmployeeCreatePage"
import Employee from "./feature/admin/pages/EmployeePage"
import HomePage from "./pages/HomePage"
import UserLayout from "./layouts/UserLayout"
import AdminPage from "./feature/admin/pages/AdminPage"

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
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <ProtectedRoute userRole={["employee"]} />,
        children: [{ path: "attendance", element: <AttendancePage /> }],
      },
      {
        element: <UnProtectedRoute />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
  {
    path: "admin",
    element: <ProtectedRoute userRole={["admin"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: "employees/create",
            element: <EmployeeCreatePage />,
          },
          {
            path: "employees/:id",
            element: <Employee />,
          },
        ],
      },
    ],
  },
])
