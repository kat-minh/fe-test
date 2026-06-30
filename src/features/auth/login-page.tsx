import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useLogin } from "./hooks/use-auth"
import { LoginFormFields, loginSchema } from "./schemas/auth-schema"

export function LoginPage() {
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "admin123",
    },
  })

  const onSubmit = (data: LoginFormFields) => {
    loginMutation.mutate(data)
  }

  return (
    <div className="flex h-screen items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            {loginMutation.isError && (
              <p className="text-xs text-destructive text-center">
                {(loginMutation.error as any)?.response?.data?.message ||
                  "Invalid email or password"}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
