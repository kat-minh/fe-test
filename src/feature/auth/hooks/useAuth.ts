import { useMutation } from "@tanstack/react-query"
import { authApi } from "../service"
import { AuthResponse } from "@/type"
import { LoginSchemaType } from "../rule"
import { useAuthStore } from "@/store/auth-store"

export const useLoginMutation = () => {
  const setToken = useAuthStore(s => s.setToken)

  return useMutation<AuthResponse, Error, LoginSchemaType>({
    mutationFn: (data) => authApi.login(data),

    onSuccess: (response) => {
      console.log(response);

      setToken(response.token, response.user);
    },

    onError: () => {
      console.log("Gọi ko đc");
    }
  })
}

export const useLogoutMutation = () => {
  const clearToken = useAuthStore(s => s.clearToken)

  return useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: () => {
      clearToken();
      console.log("Đã logout");
      window.location.replace("/");
    },

    onError: () => {
      console.log("Đã logout");
      window.location.replace("/");
    }
  })
}