import { User } from "@/features/auth/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"
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
      logout: () => set({ token: null, user: null }),
    }),
    { name: "auth-storage" },
  ),
)
