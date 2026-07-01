import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useUserLogin } from "./hooks/use-auth"
import { LoginFormInputs, loginValidationSchema } from "./schemas/auth-schema"

export function LoginPage() {
  const authMutation = useUserLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onTouched",
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "admin123",
    },
  })

  const handleLoginSubmit = (formData: LoginFormInputs) => {
    authMutation.mutate(formData)
  }

  return (
    <div className="flex h-screen items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-4">
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
              {authMutation.isError && (
                <p className="text-xs text-destructive text-center">
                  {(authMutation.error as any)?.response?.data?.message ||
                    "Invalid email or password"}
                </p>
              )}
              <div className="w-full">
                <Button
                  type="submit"
                  disabled={authMutation.isPending}
                >
                  {authMutation.isPending ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
