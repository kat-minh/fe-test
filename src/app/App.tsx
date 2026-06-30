import { Toaster } from "sonner"
import { QueryProvider } from "./provider/QueryProvider"
import { RouterProvider } from "./provider/RouterProvider"

export function App() {
  return (
    <QueryProvider>
      <RouterProvider />
      <Toaster />
    </QueryProvider>
  )
}
