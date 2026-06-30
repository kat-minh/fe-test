import { z } from "zod"

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
})

export type EmployeeFormFields = z.infer<typeof employeeSchema>
