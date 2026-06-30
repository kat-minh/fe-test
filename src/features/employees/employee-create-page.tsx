import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useCreateEmployee } from "./hooks/use-employees"
import { EmployeeFormFields, employeeSchema } from "./schemas/employee-schema"

export function EmployeeCreatePage() {
  const createMutation = useCreateEmployee()

  const {
    register,
    handleSubmit: handleCreate,
    formState: { errors },
  } = useForm<EmployeeFormFields>({
    mode: "onTouched",
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      department: "",
    },
  })

  const onCreate = (data: EmployeeFormFields) => {
    createMutation.mutate(data)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-sm border">
        <CardHeader className="bg-muted/10 border-b pb-4">
          <CardTitle className="text-xl font-bold">Create Employee</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleCreate(onCreate)} className="space-y-4">
            <div className="space-y-1">
              <Input placeholder="Full Name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input placeholder="Position" {...register("position")} />
              {errors.position && (
                <p className="text-xs text-destructive">
                  {errors.position.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input placeholder="Department" {...register("department")} />
              {errors.department && (
                <p className="text-xs text-destructive">
                  {errors.department.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Link to="/admin">
                <Button
                  type="button"
                  variant="outline"
                  disabled={createMutation.isPending}
                >
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
