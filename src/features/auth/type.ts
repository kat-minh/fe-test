import { z } from "zod"
export const LoginSchema = z.object({
  email: z
    .string()
    .email("Enter email please !")
    .min(1, "Please, enter0 your email !"),
  password: z.string().min(1, "Please, enter your password !"),
})
export type LoginSchemaType = z.infer<typeof LoginSchema>
