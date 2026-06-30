import { useAuthStore } from "@/store/auth-store";
import { Outlet } from "react-router-dom";

export const GuestRouter = () =>{
    const token = useAuthStore.getState().token
    if(!token){
        <Outlet/>
    }
}