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
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    { name: "auth-storage" },
  ),
)
