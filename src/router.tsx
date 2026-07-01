import { createBrowserRouter } from "react-router-dom"

import { HomePage } from "@/pages/home-page"
import MainLayout from "./shared/layouts/MainLayout"
import LoginPage from "./features/auth/pages/LoginPage"
import GuestGuard from "./shared/guard/GuestGuard"
import AdminPage from "./features/admin/pages/AdminPage"
import RoleGuard from "./shared/guard/RoleGuard"
import CreateEmployeePage from "./features/admin/pages/CreateEmployeePage"
import EmployeeDetailPage from "./features/admin/pages/EmployeeDetailPage"
import Attendance from "./features/Attendance/pages/Attendance"

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
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <GuestGuard />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
      {
        element: <RoleGuard allowRole="admin" />,
        children: [
          { path: "admin", element: <AdminPage /> },
          { path: "admin/employees/create", element: <CreateEmployeePage /> },
          { path: "admin/employees/:id", element: <EmployeeDetailPage /> },
        ],
      },
      {
        element: <RoleGuard allowRole="employee" />,
        children: [{ path: "attendance", element: <Attendance /> }],
      },
    ],
  },
])
