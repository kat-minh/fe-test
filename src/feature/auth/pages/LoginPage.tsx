import { Link } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { useForm } from "react-hook-form"
import { useLoginMutation } from "../hook/useAuth"
import { LoginSchema, LoginSchemaType } from "../schema"

export const LoginPage = () => {
  const loginMutation = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",

    resolver: zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (data: LoginSchemaType) => {
    loginMutation.mutate(data)
  }

  return (
    <>
      <CardHeader>
        <CardTitle>ĐĂNG NHẬP</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>

          <Input
            disabled={loginMutation.isPending}
            type="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <Label>Password</Label>

          <Input
            disabled={loginMutation.isPending}
            type="password"
            {...register("password")}
            className={errors.password ? "border-destructive" : ""}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </CardContent>
    </>
  )
}
