import AdminPage from "@/feature/auth/pages/AdminPage"
import EmployeePage from "@/feature/auth/pages/EmployeePage"
import HomePage from "@/feature/auth/pages/HomePage"
import { LoginPage } from "@/feature/auth/pages/LoginPage"
import CreateEmployee from "@/feature/employee/pages/CreateEmployee"
import DetailedEmployee from "@/feature/employee/pages/DetailedEmployee"
import RequireAuth from "@/shared/components/guard/requireAuth"
import RequireUnAuth from "@/shared/components/guard/requireUnAuth"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <RequireUnAuth />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },

  {
    element: <RequireAuth allowedRoles={["admin"]} />,
    children: [
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/employees/create", element: <CreateEmployee /> },
      { path: "/admin/employees/:id", element: <DetailedEmployee /> },
    ],
  },
  {
    element: <RequireAuth allowedRoles={["employee"]} />,
    children: [{ path: "/attendance", element: <EmployeePage /> }],
  },
])
