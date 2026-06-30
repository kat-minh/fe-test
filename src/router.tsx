import { createBrowserRouter } from "react-router-dom"

import { HomePage } from "@/pages/home-page"
import { LoginPage } from "./pages/login-page"
import { AttendancePage } from "./pages/attendance-page"
import { AdminPage } from "./pages/admin-page"

import { DetailPage } from "./pages/detail-page"
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
  { path: "/login", element: <LoginPage /> },
  { path: "/attendance", element: <AttendancePage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/employees/:id", element: <DetailPage /> },
  { path: "admin/employees/create", element: <CreateEmployee /> },

])
