import { useAuthStore } from "@/store/auth-store"
import { useNavigate } from "react-router-dom"

export const NeedAuth = () => {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const role = useAuthStore((state) => state.role)
  if (token) {
    if (role == "admin") {
      navigate("/admin")
    }
    if (role == "employee") {
      navigate("/attendance")
    }
  }
  navigate("/login")
}
