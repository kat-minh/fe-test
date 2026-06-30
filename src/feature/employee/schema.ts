// src/feature/employee/schema.ts
import { z } from "zod"

export const CreateEmployeeSchema = z.object({
  name: z.string().min(1, "Họ tên không được để trống"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không đúng định dạng"),
  phone: z.string().min(1, "Số điện thoại kh được để trống"),
  position: z.string().min(1, "Chức vụ không được để trống"),
  department: z.string().min(1, "Phòng ban không được để trống"),
  status: z.string().default("active"),
})

export type CreateEmployeeSchemaType = z.infer<typeof CreateEmployeeSchema>
