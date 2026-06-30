import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { CreateEmployeeSchema, CreateEmployeeSchemaType } from "../schema"
import { useCreateEmployeeMutation } from "../hook/useEmployee"
import { Button } from "@/shared/components/ui/button"

const CreateEmployee = () => {
  const createMutation = useCreateEmployeeMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEmployeeSchemaType>({
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: { status: "active" },
  })

  const onSubmit = (data: CreateEmployeeSchemaType) => {
    createMutation.mutate(data)
  }

  return (
    <>
      <h2>Tạo Nhân Viên Mới</h2>
      <Link to="/admin">
        <Button>Quay lại danh sách</Button>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Họ tên:</label>
          <input {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Số điện thoại:</label>
          <input {...register("phone")} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div>
          <label>Chức vụ:</label>
          <input {...register("position")} />
          {errors.position && <p>{errors.position.message}</p>}
        </div>

        <div>
          <label>Phòng ban:</label>
          <input {...register("department")} />
          {errors.department && <p>{errors.department.message}</p>}
        </div>

        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Đang lưu..." : "Lưu nhân viên"}
        </Button>
      </form>
    </>
  )
}

export default CreateEmployee
