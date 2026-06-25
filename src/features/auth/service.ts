import { api } from "@/lib/axios"
import { LoginRequest, LoginResponse } from "./types"


export const AuthLogin = () =>{
    const login = (credential: LoginRequest) : Promise<LoginResponse> => {
        return api.post("auth/login");
    }
}


