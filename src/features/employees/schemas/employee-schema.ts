import { z } from "zod"

export const employeeValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
})

export type EmployeeFormInputs = z.infer<typeof employeeValidationSchema>
