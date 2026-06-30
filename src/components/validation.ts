import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(1, { message: "Mật khẩu không được để trống" }),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const createSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  position: z.string().min(1, { message: "Chức vụ không được để trống" }),
  department: z.string().min(1, { message: "Phòng ban không được để trống" }),
  // Nếu status chỉ có 1 vài giá trị cố định, bạn có thể dùng z.enum(["active", "inactive", ...])
  status: z.string().min(1, { message: "Trạng thái không được để trống" }),
})

export type CreateFormValues = z.infer<typeof createSchema>
