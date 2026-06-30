import z from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(5, { message: "Email must be at least 5 letters" }),
  password: z
    .string()
    .min(6, { message: "password at least 6 letters" })
    .max(256, { message: "password is maximum at 256 letters " }),
})
export type LoginSchemaType = z.infer<typeof loginSchema>
