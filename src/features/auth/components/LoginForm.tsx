import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/use-login"
import { LoginRequest } from "../types"
import { loginSchema, LoginSchemaType } from "../validation"
export default function LoginForm() {
  const loginMutation = useLogin()
  const {
    register: login,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (body: LoginRequest) => {
    loginMutation.mutate(body)
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">email</label>
            <Input
              type="email"
              id="email"
              placeholder="enter email......"
              {...login("email")}
            />
            <label htmlFor="password">password</label>
            <Input
              type="password"
              id="password"
              placeholder="enter password......"
              {...login("password")}
            />

            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
