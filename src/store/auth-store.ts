import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  token: string | null
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}
export interface AuthUser {
  id: string
  email: string
  name: string
  role: "admin" | "employee"
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: "auth-storage" },
  ),
)
