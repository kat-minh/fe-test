import { useCreateEmployee } from "@/hooks/useCreateEmployee"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const employeeSchema = z.object({
  name: z.string().min(1, { message: "Họ và tên không được để trống." }),
  email: z
    .string()
    .min(1, { message: "Email không được để trống." })
    .email({ message: "Email không đúng định dạng." }),
  phone: z.string().min(1, { message: "Số điện thoại không được để trống." }),
  position: z.string().min(1, { message: "Chức vụ không được để trống." }),
  department: z.string().min(1, { message: "Phòng ban không được để trống." }),
  status: z.enum(["active", "on_leave", "inactive"]).default("active"),
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

export function CreateEmployeePage() {
  const navigate = useNavigate()
  const createEmployeeMutation = useCreateEmployee()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      status: "active",
    },
  })

  const onSubmit = (data: EmployeeFormValues) => {
    createEmployeeMutation.mutate(data, {
      onError: (err: any) => {
        const errorsMap = err?.response?.data?.errors
        if (errorsMap) {
          Object.keys(errorsMap).forEach((key) => {
            setError(key as any, {
              type: "server",
              message: errorsMap[key],
            })
          })
        }
      },
    })
  }

  const serverError = createEmployeeMutation.error as any
  const generalErrorMessage =
    serverError?.response?.data?.message && !serverError?.response?.data?.errors
      ? serverError.response.data.message
      : null

  return (
    <div className="max-w-md mx-auto my-8 p-4">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          disabled={createEmployeeMutation.isPending}
          className="cursor-pointer"
        >
          &larr; Quay lại danh sách
        </button>
      </div>

      <div>
        <h2 className="font-bold mb-2">Tạo Mới Nhân Viên</h2>

        {generalErrorMessage && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded mb-4 text-center">
            {generalErrorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-semibold text-sm">
              Họ và tên
            </label>
            <input
              id="name"
              {...register("name")}
              disabled={createEmployeeMutation.isPending}
              className={`p-2 border rounded text-sm ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              disabled={createEmployeeMutation.isPending}
              className={`p-2 border rounded text-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="font-semibold text-sm">
              Số điện thoại
            </label>
            <input
              id="phone"
              {...register("phone")}
              disabled={createEmployeeMutation.isPending}
              className={`p-2 border rounded text-sm ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="position" className="font-semibold text-sm">
              Chức vụ
            </label>
            <input
              id="position"
              {...register("position")}
              disabled={createEmployeeMutation.isPending}
              className={`p-2 border rounded text-sm ${errors.position ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.position && (
              <span className="text-red-500 text-xs">
                {errors.position.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="department" className="font-semibold text-sm">
              Phòng ban
            </label>
            <input
              id="department"
              {...register("department")}
              disabled={createEmployeeMutation.isPending}
              className={`p-2 border rounded text-sm ${errors.department ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.department && (
              <span className="text-red-500 text-xs">
                {errors.department.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="status" className="font-semibold text-sm">
              Trạng thái
            </label>
            <select
              id="status"
              {...register("status")}
              disabled={createEmployeeMutation.isPending}
              className="p-2 border border-gray-300 rounded text-sm bg-white"
            >
              <option value="active">Hoạt động</option>
              <option value="on_leave">Nghỉ phép</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-xs">
                {errors.status.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              disabled={createEmployeeMutation.isPending}
              className="px-4 py-2 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={createEmployeeMutation.isPending}
              className="px-4 py-2 bg-black text-white rounded text-sm cursor-pointer hover:bg-gray-800 disabled:opacity-50"
            >
              {createEmployeeMutation.isPending ? "Đang lưu..." : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
