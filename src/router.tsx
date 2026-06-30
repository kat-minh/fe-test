import { createBrowserRouter } from "react-router-dom"

import { HomePage } from "@/pages/home-page"
import { LoginPage } from "./pages/login-page"
import { RequireAuth } from "./guards/RequireAuth"
import { RequireUnauth } from "./guards/RequireUnauth"
import { AttendancePage } from "./pages/attendance-page"
import { RequireRole } from "./guards/RequireRole"
import { AdminPage } from "./pages/admin-page"
import { MainLayout } from "./layouts/MainLayout"
import { CreateEmployeePage } from "./pages/create-employee"
import { EmployeeDetailPage } from "./pages/employee-detail-page"

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
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <RequireRole allowedRoles={["employee"]} />,
            children: [{ path: "/attendance", element: <AttendancePage /> }],
          },
          {
            element: <RequireRole allowedRoles={["admin"]} />,
            children: [
              { path: "/admin", element: <AdminPage /> },
              {
                path: "/admin/employees/create",
                element: <CreateEmployeePage />,
              },
              { path: "/admin/employees/:id", element: <EmployeeDetailPage /> },
              {
                path: "/admin/employees/:id/edit",
                element: <CreateEmployeePage />,
              },
            ],
          },
        ],
      },
      {
        element: <RequireUnauth />,
        children: [{ path: "/login", element: <LoginPage /> }],
      },
    ],
  },
])
