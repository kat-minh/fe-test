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

import { Button } from "@/components/ui/button"
import { data, Form } from "react-router-dom"
import { useLogoutMutation } from "@/components/hooks/useAuth"

export default function Attendance() {
  const useLogout = useLogoutMutation()
  const onSubmit = () => {
    console.log()
    useLogout.mutate()
  }
  return (
    <div>
      <Card>
        <CardHeader>logout</CardHeader>
        <CardContent>
          <Form onSubmit={onSubmit}>
            <Button type="submit">dang xuat</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
