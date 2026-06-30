import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/hooks/useAuth"
import { Label } from "@radix-ui/react-label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardContent } from "@/components/ui/card"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được trống!")
    .email("Email không đúng định dạng"),
  password: z.string().min(1, "Password không được để trống"),
})

type LoginFormValue = z.infer<typeof loginSchema>

export function LoginPage() {
  const loginMutation = useLogin()

  const { register, handleSubmit } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginFormValue) => {
    loginMutation.mutate(data, {})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input id="email" type="email" {...register("email")} />
        </div>

        <div>
          <Label htmlFor="password">Password:</Label>
          <Input id="password" type="password" {...register("password")} />
        </div>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full"
        >
          {loginMutation.isPending ? "Đang xử lý..." : "Đăng nhập"}
        </Button>
      </CardContent>
    </form>
  )
}
