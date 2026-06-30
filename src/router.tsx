import { createBrowserRouter } from "react-router-dom"

import { HomePage } from "@/pages/home-page"
import RequiredAuth from "./guards/RequiredAuth"
import RequiredEmployee from "./guards/RequiredEmployee"
import RequiredAdmin from "./guards/ReuqiredAmin"
import Admin from "./pages/admin-page"
import Attendance from "./pages/attendance-page"
import EmployeeCreatePage from "./pages/employee-create-page"
import EmployeeDetail from "./pages/employee-detail"
import Login from "./pages/login-page"

/**
 * App router — React Router v7 data API (`createBrowserRouter`).
 *
 * Add your own routes to the array, e.g.:
 *
 *
 *   { path: "/users/:id", element: <UserDetailPage /> },
 *
 * Wrap protected pages in a layout/guard route with `children` when you need
 * auth, and use loaders if you want route-level data fetching.
 */
export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  {
    element: <RequiredAuth />,
    children: [
      {
        element: <RequiredEmployee />,
        children: [{ path: "/attendance", element: <Attendance /> }],
      },
      {
        element: <RequiredAdmin />,
        children: [
          { path: "/admin", element: <Admin /> },
          { path: "/admin/employees/create", element: <EmployeeCreatePage /> },
          { path: "/admin/employees/:id", element: <EmployeeDetail /> },
        ],
      },
    ],
  },
])
