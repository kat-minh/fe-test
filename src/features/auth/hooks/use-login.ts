import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService } from "../services"
import { LoginRequest } from "../types"

export const useLoginMutation = () => {
    const navigate = useNavigate()
    const setTokens = useAuthStore((state) => state.setToken)

    return useMutation({
        mutationFn: (body: LoginRequest) => authService.login(body),
        onSuccess: (state) => {
            setTokens(state.token)
            navigate(state.user.role == "admin" ? "/admin" : "/attendance")
        }
    })
}