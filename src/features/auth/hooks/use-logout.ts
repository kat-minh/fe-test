import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"

export const useLogoutMutation = () => {

    const navigate = useNavigate()
    const clearToken = useAuthStore(state => state.logout)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            clearToken()
            navigate("/login")
            queryClient.removeQueries()
        }
    })
}