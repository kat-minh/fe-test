import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { router } from "@/router"
import { QueryProvider } from "@/providers/query-provider"
import "./index.css"
import { Toaster } from "sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Toaster position="top-right" richColors/>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
)
