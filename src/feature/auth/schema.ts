import { z } from "zod"

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email is required" })
    .min(5, { message: "Email ít nhất 5 ký tự" })
    .max(100, { message: "Email không được quá 100 ký tự" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Password ít nhất 5 ký tự" })
    .max(100, { message: "Password không được quá 100 ký tự" }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
