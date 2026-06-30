import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
  CardAction,
} from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { useLoginMutation } from "../hooks/useAuth"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { data, Form } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormValues, loginSchema } from "../validation"
import { AuthResquest } from "../types"

export function LoginForma() {
  const useLogin = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: AuthResquest) => {
    useLogin.mutate(data)
  }
  return (
    <div>
      <Card>
        <CardContent>
          <CardHeader>login</CardHeader>
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={useLogin.isPending}
            >
              {useLogin.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
