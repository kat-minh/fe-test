import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useCreateEmployee from "../hooks/useCreateEmployee"
import { CreateEmployeeSchema, CreateEmployeeSchemaType } from "../type"

const CreateEmployeePage = () => {
  const navigate = useNavigate()
  const createMutation = useCreateEmployee()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateEmployeeSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      status: "active",
    },
  })

  const onSubmit = (data: CreateEmployeeSchemaType) => {
    createMutation.mutate({
      name: data.name,
      email: data.email,
      position: data.position,
      department: data.department,
      status: data.status,
    })
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/admin")}
      >
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                placeholder="Enter position"
                {...register("position")}
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="Enter department"
                {...register("department")}
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("status")}
              >
                <option value="active">Active</option>
                <option value="on_leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex gap-4 pt-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || createMutation.isPending}
              >
                {isSubmitting || createMutation.isPending
                  ? "Creating..."
                  : "Create"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateEmployeePage
