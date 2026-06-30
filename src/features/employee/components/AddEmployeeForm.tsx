import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAddEmployee } from "../hooks/use-add-employee"
import { EmployeeRequest } from "../types"
import { addEmployeeSchema, AddEmployeeType } from "../validations"

export default function AddEmployeeForm() {
  const addMutation = useAddEmployee()
  const {
    register: employee,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEmployeeType>({
    mode: "onTouched",
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      department: "",
      status: "",
    },
  })

  const onSubmit = (body: EmployeeRequest) => {
    addMutation.mutate(body)
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Employee Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">name</label>
            <Input
              type="name"
              id="name"
              placeholder="enter name......"
              {...employee("name")}
            />

            <label htmlFor="email">email</label>
            <Input
              type="email"
              id="email"
              placeholder="enter email......"
              {...employee("email")}
            />

            <label htmlFor="position">position</label>
            <Input
              type="position"
              id="position"
              placeholder="enter position......"
              {...employee("position")}
            />

            <label htmlFor="department">department</label>
            <Input
              type="department"
              id="department"
              placeholder="enter department......"
              {...employee("department")}
            />

            <label htmlFor="status">status</label>
            <Input
              type="status"
              id="status"
              placeholder="enter status......"
              {...employee("status")}
            />

            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
