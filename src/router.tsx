import { createBrowserRouter } from "react-router-dom"

import HomePage from "@/pages/home-page"
import { GuestRoute, ProtectedRoute } from "./components/auth-guard"
import { LoginPage } from "./features/auth/login-page"
import { MainLayout } from "./components/common/main-layout"
import { EmployeeListPage } from "./features/employees/employee-list-page"
import { EmployeeCreatePage } from "./features/employees/employee-create-page"
import { EmployeeDetailPage } from "./features/employees/employee-detail-page"
import { AttendancePage } from "./features/attendance/attendance-page"

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/admin",
            element: <EmployeeListPage />,
          },
          {
            path: "/admin/employees/create",
            element: <EmployeeCreatePage />,
          },
          {
            path: "/admin/employees/:id",
            element: <EmployeeDetailPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["employee"]} />,
        children: [
          {
            path: "/attendance",
            element: <AttendancePage />,
          },
        ],
      },
    ],
  },
])
