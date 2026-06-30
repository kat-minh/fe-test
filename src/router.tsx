import { createBrowserRouter } from "react-router-dom"

import { HomePage } from "@/pages/home-page"
import MainLayout from "./shared/layouts/MainLayout"
import LoginPage from "./features/auth/pages/LoginPage"
import GuestGuard from "./shared/guard/GuestGuard"
import GuardAuth from "./shared/guard/GuardAuth"
import AdminPage from "./features/admin/pages/AdminPage"

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
        element: <GuardAuth />,
        children: [{ path: "admin", element: <AdminPage /> }],
      },
    ],
  },
])
