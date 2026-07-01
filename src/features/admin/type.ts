import z from "zod"

export const CreateEmployeeSchema = z.object({
  name: z.string().min(1, "Name is not empty !"),
  email: z.string().email("Email invalid !"),
  position: z.string().min(1, "Position is not empty !"),
  department: z.string().min(1, "Department is not empty !"),
  phone: z.string().optional(),
})

export type CreateEmployeeSchemaType = z.infer<typeof CreateEmployeeSchema>
