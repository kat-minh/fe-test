import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useAddEmployee } from "./hooks/use-employees"
import { EmployeeFormInputs, employeeValidationSchema } from "./schemas/employee-schema"

export function EmployeeCreatePage() {
  const addEmployeeMutation = useAddEmployee()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormInputs>({
    mode: "onTouched",
    resolver: zodResolver(employeeValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      department: "",
    },
  })

  const handleAddEmployeeSubmit = (formData: EmployeeFormInputs) => {
    addEmployeeMutation.mutate(formData)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleAddEmployeeSubmit)} className="space-y-4">
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
                  disabled={addEmployeeMutation.isPending}
                >
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={addEmployeeMutation.isPending}>
                {addEmployeeMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
