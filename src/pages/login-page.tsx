import { useLoginMutation } from "@/features/auth/hooks/use-login"
import { LoginRequest } from "@/features/auth/types"
import { LoginSchema, LoginValidation } from "@/features/auth/validation"
import { useForm } from "react-hook-form"
import {zodResolver} from"@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export function LoginPage(){

    const navigate = useNavigate()

    const loginMutation = useLoginMutation()

    const onSubmit = (data: LoginRequest) => {
        loginMutation.mutate(data)
    }

    const{
        register: login,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<LoginValidation>({
        mode: "onTouched",
        resolver: zodResolver(LoginSchema)
    })

    return(
        <div className="border-2 h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-75 h-45 flex flex-col justify-between">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" {...login("email")}/>
                    {(errors.email && <p className="text-red-600">Required</p>)}
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" {...login("password")}/>
                    {(errors.email && <p className="text-red-600">Required</p>)}
                </div>

                <Button type="submit">Đăng nhập</Button>
            </form>
        </div>
    )
}