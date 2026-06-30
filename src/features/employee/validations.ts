import z from "zod"

export const addEmployeeSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Must be more than 5 letters" })
    .max(128, { message: "Must be lower than 128 letters" }),
  email: z
    .string()
    .email()
    .min(5, { message: "Must be more than 5 letters" })
    .max(128, { message: "Must be lower than 128 letters" }),
  position: z
    .string()
    .min(5, { message: "Must be more than 5 letters" })
    .max(128, { message: "Must be lower than 128 letters" }),
  department: z
    .string()
    .min(5, { message: "Must be more than 5 letters" })
    .max(128, { message: "Must be lower than 128 letters" }),
  status: z
    .string()
    .min(5, { message: "Must be more than 5 letters" })
    .max(128, { message: "Must be lower than 128 letters" }),
})
export type AddEmployeeType = z.infer<typeof addEmployeeSchema>
