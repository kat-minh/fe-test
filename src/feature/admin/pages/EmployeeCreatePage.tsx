import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateEmployeeSchemaType, creatEmployeeSchema } from "../rule"
import { Button } from "@/components/ui/button"
function EmployeeCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEmployeeSchemaType>({
    resolver: zodResolver(creatEmployeeSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      position: "",
      department: "",
      status: "",
    },
  })

  const onSubmit = () => {
    console.log("Tao thnh cong")
  }
  return (
    <>
      <div>EmployeeCreatePage</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="name" placeholder="name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          type="text"
          placeholder="position"
          {...register("position")}
        />
        {errors.position && <p>{errors.position.message}</p>}

        <Label htmlFor="department">Department</Label>
        <Input
          id="department"
          type="text"
          placeholder="department"
          {...register("department")}
        />
        {errors.department && <p>{errors.department.message}</p>}

        <Label htmlFor="status">Status</Label>
        <Input
          id="status"
          type="text"
          placeholder="position"
          {...register("status")}
        />
        {errors.status && <p>{errors.status.message}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}

export default EmployeeCreatePage
