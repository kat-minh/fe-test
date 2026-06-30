import { createBrowserRouter } from "react-router-dom"

import { AdminPage } from "@/pages/admin-page"
import { HomePage } from "@/pages/home-page"
import {LoginPage} from "@/pages/login-page"
import { AttendancePage } from "@/pages/attendance-page"
// import { UsersPage } from "./pages/user-page"
import { EmployeeDetail } from "./pages/employee-detail"
import { CreateEmployee } from "./pages/create-employee"

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
  { path: "/login", element: <LoginPage/> },
  { path: "/attendance", element: <AttendancePage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/admin/employees/create", element: <CreateEmployee /> },
  { path: "/admin/employees/:id", element: <EmployeeDetail/>},
  // { path: "/users", element: <UsersPage /> },
  { path: "/employees/:id", element: <EmployeeDetail/>},
  { path: "/employees/", element: <CreateEmployee /> },
])
