import { z } from "zod"

export const loginSchema = z
  .object({
    email: z
      .string({ message: "Email ko đc để trống" })
      .email({ message: "Email sai định dạng" }),
    password: z
      .string()
      .min(1, { message: "Password ko đc để trống" })
  })

export type LoginSchemaType = z.infer<typeof loginSchema>