import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LoginFormValues, loginSchema } from "@/components/validation"
import { useLoginMutation } from "@/components/hooks/useAuth"
import { LoginForma } from "@/components/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription>Nhập thông tin tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForma />
        </CardContent>
      </Card>
    </div>
  )
}
