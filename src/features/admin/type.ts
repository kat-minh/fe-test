import { z } from "zod"

export const CreateEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(/^\d*$/, "Phone must contain only digits")
    .optional()
    .or(z.literal("")),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  status: z.enum(["active", "on_leave", "inactive"]).optional(),
})

export type CreateEmployeeSchemaType = z.infer<typeof CreateEmployeeSchema>
