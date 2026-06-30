import { z } from "zod"

export const loginScheme = z.object({
  email: z.string().email().min(5, { message: "ngu" }),
  password: z.string(),
})

export type loginSchemeType = z.infer<typeof loginScheme>
