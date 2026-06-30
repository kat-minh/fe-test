import { useAuthStore } from "@/store/auth-store"
import { useNavigate } from "react-router-dom"

export const UnAuth = () => {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const role = useAuthStore((state) => state.role)
}
