import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateFormValues, createSchema } from "@/components/validation"
import { useCreateEmployeeMutation } from "@/components/hooks/useAuth"

export default function EmployeeCreatePage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormValues>({
    mode: "onTouched",
    resolver: zodResolver(createSchema),
  })
  const createMutation = useCreateEmployeeMutation()

  const onSubmit = (data: CreateFormValues) => {
    createMutation.mutate(data)
  }

  return (
    <div className="p-8">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => navigate("/admin")}
      >
        &larr; Quay lại
      </Button>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Tạo Employee mới</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Họ tên</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Chức vụ</Label>
              <Input {...register("position")} />
              {errors.position && (
                <p className="text-sm text-red-500">
                  {errors.position.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Deparment</Label>
              <Input {...register("department")} />
              {errors && (
                <p className="text-sm text-red-500">
                  {errors.department?.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Đang lưu..." : "Tạo mới"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
