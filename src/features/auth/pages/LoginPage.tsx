import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useLogin from "../hooks/useLogin"
import { LoginSchema, LoginSchemaType } from "../type"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
const LoginPage = () => {
  const loginMutaion = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  })
  const onSubmit = (data: LoginSchemaType) => {
    loginMutaion.mutate(data)
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-md">
        <CardTitle className="text-center">Sign in</CardTitle>
        <CardDescription className="text-center">
          Sign in to continue.
        </CardDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="py-2">
            <Label htmlFor="email" className="py-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            )}
          </CardContent>
          <CardContent className="py-2">
            <Label htmlFor="password" className="py-2">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="admin123"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            )}
          </CardContent>
          <CardContent className="py-2">
            <Button
              className="w-full"
              type="submit"
              disabled={isSubmitting || loginMutaion.isPending}
            >
              {isSubmitting || loginMutaion.isPending
                ? "Signing..."
                : "Sign in"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
