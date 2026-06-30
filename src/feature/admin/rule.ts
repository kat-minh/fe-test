import { z } from "zod"
export const creatEmployeeSchema = z
  .object({
    name: z
      .string({ message: "Tên ko để trống" }),
    email: z
      .string({ message: "Email ko đc để trống" })
      .email({ message: "Email sai định dạng" }),
    position: z
      .string()
      .min(1, { message: "Password ko đc để trống" }),
    department: z
      .string()
      .min(1, { message: "Password ko đc để trống" }),
    status: z
      .string()
      .min(1, { message: "Password ko đc để trống" })
  })

export type CreateEmployeeSchemaType = z.infer<typeof creatEmployeeSchema>

