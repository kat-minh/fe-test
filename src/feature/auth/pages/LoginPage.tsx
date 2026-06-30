import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginSchemaType } from "../rule"
import { useLoginMutation } from "../hooks/useAuth"

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLogin = useLoginMutation()
  const onSubmit = (data: LoginSchemaType) => {
    handleLogin.mutate(data)
  }

  return (
    <>
      <div>Login Page</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}

export default LoginPage
