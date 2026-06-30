import { Role } from "@/components/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Example Zustand store (skeleton).
 *
 * Demonstrates the pattern: state + actions in one slice, persisted to
 * localStorage. Replace with whatever global state your feature needs.
 */
interface AuthState {
  token: string | null
  role: Role | null
  setToken: (token: string | null, role: Role | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      setToken: (token, role) => set({ token, role }),
      logout: () => set({ token: null, role: null }),
    }),
    { name: "auth-storage" },
  ),
)
