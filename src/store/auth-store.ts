import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User } from "./api/auth.api"

/**
 * Example Zustand store (skeleton).
 *
 * Demonstrates the pattern: state + actions in one slice, persisted to
 * localStorage. Replace with whatever global state your feature needs.
 */
interface AuthState {
  token: string | null
  user: User | null
  setToken: (token: string | null, user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token, user) => set({ token, user }),
      logout: () => set({ token: null }),
    }),
    { name: "auth-storage" },
  ),
)
