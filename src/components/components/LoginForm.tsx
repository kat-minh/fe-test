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
import { loginScheme, loginSchemeType } from "../validation"
import { AuthResquest } from "../types"
import { Button } from "../ui/button"
import { data, Form } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"

export function LoginForma() {
  const useLogin = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemeType>({
    mode: "onTouched",
    resolver: zodResolver(loginScheme),
  })

  const onSubmit = (data: AuthResquest) => {
    console.log(data)
    useLogin.mutate(data)
  }
  return (
    <div>
      <Card>
        <CardHeader>login</CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label id="email">
              <Input type="email" {...register("email")} />
            </Label>
            <Label id="password">
              <Input type="password" {...register("password")} />
            </Label>
            <Button type="submit">dang ky</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
